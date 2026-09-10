import { useEffect, useRef, useState } from "react";

/**
 * A muted video that plays exactly once, the first time it is scrolled into
 * view, and then holds on its last frame. Built for case-study media, where a
 * looping clip would compete with the copy for attention.
 *
 * Without controls nothing is fetched until the element reaches the viewport:
 * preload is "none" and the <source> elements are only mounted once we decide
 * to play. Until then the poster carries the frame. With controls the sources
 * are mounted up front so the player is usable before the scroll trigger, but
 * preload="none" still keeps the bytes on the shelf until someone presses play.
 *
 * Degrades in three directions:
 *  - prefers-reduced-motion: never autoplays. A decorative clip collapses to
 *    a still (reducedMotion="still"); a film the reader is meant to watch
 *    keeps its player (reducedMotion="player") so the content stays reachable
 *  - no IntersectionObserver: never autoplays, keeps the poster
 *  - decode or network failure: falls back to the poster, silently
 *
 * props:
 *  - sources: [{ src, type }] in preference order (WebM before MP4)
 *  - poster: frame shown before playback
 *  - endFrame: still used by reducedMotion="still" (defaults to poster)
 *  - alt: description of the footage, for the still and for the accessible
 *    name of the video element
 *  - threshold: visible fraction that triggers playback (default 0.5). Values
 *    near 1 are clamped when the element is taller than the viewport, which
 *    would otherwise make the trigger unreachable
 *  - controls: show the native player chrome (default false)
 *  - reducedMotion: "still" | "player" (default "still")
 *  - tracks: [{ src, srcLang, label, kind }] caption tracks, never default-on
 *  - requireScroll: wait for the reader's first scroll before playing, even if
 *    the element is already on screen at load (default false)
 */
export default function PlayOnceVideo({
  sources = [],
  poster,
  endFrame,
  alt,
  threshold = 0.5,
  controls = false,
  reducedMotion = "still",
  tracks = [],
  requireScroll = false,
  className,
  ...rest
}) {
  const wrapRef = useRef(null);
  const videoRef = useRef(null);
  // Once true it never goes back: this is what makes the clip play a single
  // time per page load, even after the section leaves and re-enters view.
  const [hasPlayed, setHasPlayed] = useState(false);
  const [inView, setInView] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(!requireScroll);
  const [failed, setFailed] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // The reader's first scroll. Without this a video that is already on screen
  // at load starts on its own before anyone has done anything, which reads as
  // the page playing at you rather than responding to you.
  useEffect(() => {
    if (hasScrolled) return undefined;
    const onScroll = () => setHasScrolled(true);
    window.addEventListener("scroll", onScroll, { passive: true, once: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasScrolled]);

  // Both conditions hold, in either order: the element reached the viewport
  // and the reader has scrolled at least once. Both latch, so this only ever
  // goes false to true.
  const armed = inView && hasScrolled;

  useEffect(() => {
    if (reduceMotion || hasPlayed || failed || armed) return undefined;
    const node = wrapRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return undefined;

    // A threshold of 1 asks for the whole element to be inside the viewport.
    // On a short window a 16:9 film never gets there, and the video would sit
    // on its poster forever, so back off to what can actually be reached.
    const visible = node.getBoundingClientRect().height / window.innerHeight;
    const effective = visible > 0.9 ? Math.min(threshold, 0.6) : threshold;

    const observer = new IntersectionObserver(
      (entries) => {
        // Latches on: scrolling back past the element must not tear the
        // player down and restart the whole dance.
        if (entries.some((entry) => entry.isIntersecting)) setInView(true);
      },
      { threshold: effective },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduceMotion, hasPlayed, failed, armed, threshold]);

  // Playback is kicked off from onLoadedData rather than here: calling play()
  // straight after load() races the load itself and rejects with AbortError,
  // which is not a failure and must not swap in the fallback image.
  useEffect(() => {
    if (!armed) return;
    videoRef.current?.load();
  }, [armed]);

  const startPlayback = () => {
    if (!armed) return;
    const attempt = videoRef.current?.play();
    // A rejection here is usually a blocked autoplay policy, not a broken
    // file. The poster stays up and the layout holds either way.
    if (attempt && typeof attempt.catch === "function") {
      attempt.catch(() => {});
    }
  };

  const collapseToStill = failed || (reduceMotion && reducedMotion === "still");

  if (collapseToStill) {
    return (
      <div ref={wrapRef} className={className} {...rest}>
        <img
          className="play-once-media"
          src={failed ? poster : endFrame || poster}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      </div>
    );
  }

  // With controls the player has to work before the scroll trigger fires, so
  // the sources go in immediately; preload="none" is what keeps it cheap.
  const mountSources = controls || armed;

  return (
    <div ref={wrapRef} className={className} {...rest}>
      <video
        ref={videoRef}
        className="play-once-media"
        poster={poster}
        preload="none"
        muted
        playsInline
        controls={controls}
        disablePictureInPicture={!controls}
        aria-label={alt}
        onLoadedData={startPlayback}
        onEnded={() => setHasPlayed(true)}
        onError={() => setFailed(true)}
      >
        {mountSources
          ? sources.map((source) => (
              <source key={source.src} src={source.src} type={source.type} />
            ))
          : null}
        {tracks.map((track) => (
          <track
            key={track.src}
            kind={track.kind || "captions"}
            srcLang={track.srcLang}
            label={track.label}
            src={track.src}
          />
        ))}
      </video>
      {!armed && !controls ? (
        <span className="play-once-hint" aria-hidden="true">
          <svg viewBox="0 0 12 14" width="9" height="11" focusable="false">
            <path d="M0 0 L12 7 L0 14 Z" fill="currentColor" />
          </svg>
          video
        </span>
      ) : null}
    </div>
  );
}
