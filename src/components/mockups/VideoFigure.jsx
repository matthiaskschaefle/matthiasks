import { useRef, useState } from "react";

/**
 * VideoFigure — UI flow video under the user's control (click-to-play).
 *
 * Default state: poster + 44px+ play button, preload="none" (nothing loads
 * until the gesture). After the gesture the video plays muted/loop/
 * playsInline with a PERMANENT pause/play toggle (WCAG 2.2.2 — the user can
 * always stop the motion). No autoplay, no audio track (no captions needed);
 * `label` describes the flow for assistive tech.
 *
 * `ratio` (e.g. "9 / 19.5") reserves the box — zero CLS. RM users get the
 * same click-to-play poster (no motion until requested).
 */
export default function VideoFigure({
  src,
  poster,
  label,
  ratio = "9 / 19.5",
  caption,
  className = "",
}) {
  const videoRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);

  const start = () => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    video.play();
  };

  const toggle = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  return (
    <figure className={`ms-video ${className}`.trim()}>
      <div className="ms-video__frame" style={{ aspectRatio: ratio }}>
        <video
          ref={videoRef}
          className="ms-video__video"
          src={src}
          poster={poster}
          preload="none"
          muted
          loop
          playsInline
          aria-label={label}
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
        {!started ? (
          <button
            type="button"
            className="ms-video__play"
            aria-label={`Play video: ${label}`}
            onClick={start}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
              aria-hidden="true"
            >
              <path d="M5 3.5v11l9-5.5-9-5.5z" fill="currentColor" />
            </svg>
          </button>
        ) : (
          <button
            type="button"
            className="ms-video__toggle"
            aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
            aria-pressed={playing}
            onClick={toggle}
          >
            {playing ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                aria-hidden="true"
              >
                <path d="M4 2v10l8-5-8-5z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="ms-figure__caption">
          {caption.kicker && (
            <span className="ms-figure__kicker">{caption.kicker}</span>
          )}
          <span className="ms-figure__text">{caption.text}</span>
        </figcaption>
      )}
    </figure>
  );
}
