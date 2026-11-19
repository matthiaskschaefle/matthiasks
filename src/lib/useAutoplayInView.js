import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Plays a muted, looping UI clip while it is on screen and pauses it when it
 * leaves, so a recording of the product reads like the product moving rather
 * than a file waiting for a click.
 *
 * - The reader can always stop it: `toggle` pauses for good (WCAG 2.2.2), and
 *   a paused clip is not restarted by scrolling back.
 * - prefers-reduced-motion: nothing starts on its own; `toggle` still plays.
 * - A blocked autoplay (iOS Low Power Mode, data saver) leaves the poster up,
 *   reports `blocked`, and retries on the reader's next tap anywhere, since a
 *   tap is the gesture those browsers wait for.
 */
export default function useAutoplayInView(videoRef, { threshold = 0.4 } = {}) {
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(true);
  const stoppedByReader = useRef(false);
  const inView = useRef(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduceMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const tryPlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.preload === "none") video.preload = "auto";
    const attempt = video.play();
    if (attempt && typeof attempt.catch === "function") {
      attempt.then(() => setBlocked(false)).catch(() => setBlocked(true));
    }
  }, [videoRef]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || reduceMotion || typeof IntersectionObserver === "undefined") return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (stoppedByReader.current) return;
        if (entry.isIntersecting) tryPlay();
        else video.pause();
      },
      { threshold },
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [videoRef, reduceMotion, threshold, tryPlay]);

  // Blocked: the next tap anywhere on the page is allowed to start playback.
  useEffect(() => {
    if (!blocked) return undefined;
    const retry = () => {
      if (inView.current && !stoppedByReader.current) tryPlay();
    };
    document.addEventListener("touchend", retry, { passive: true });
    document.addEventListener("click", retry);
    return () => {
      document.removeEventListener("touchend", retry);
      document.removeEventListener("click", retry);
    };
  }, [blocked, tryPlay]);

  const toggle = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      stoppedByReader.current = false;
      tryPlay();
    } else {
      stoppedByReader.current = true;
      video.pause();
    }
  }, [videoRef, tryPlay]);

  const bind = {
    onPlay: () => setPlaying(true),
    onPause: () => setPlaying(false),
  };

  return { playing, blocked, reduceMotion, toggle, bind };
}
