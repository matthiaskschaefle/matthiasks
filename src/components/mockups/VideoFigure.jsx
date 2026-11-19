import { useRef } from "react";
import useAutoplayInView from "../../lib/useAutoplayInView.js";

/**
 * VideoFigure: a recording of a UI flow that plays on its own, muted and
 * looping, while it is on screen, and pauses when it leaves.
 *
 * A pause/play toggle is always present (WCAG 2.2.2: the reader can stop the
 * motion). The large play button only shows when the clip will not start by
 * itself: reduced motion, or a browser that blocked autoplay.
 *
 * `ratio` (e.g. "9 / 19.5") reserves the box: zero CLS.
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
  const { playing, blocked, reduceMotion, toggle, bind } = useAutoplayInView(videoRef);
  const waitingForReader = !playing && (reduceMotion || blocked);

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
          {...bind}
        />
        {waitingForReader ? (
          <button
            type="button"
            className="ms-video__play"
            aria-label={`Play video: ${label}`}
            onClick={toggle}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
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
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M4 2v10l8-5-8-5z" fill="currentColor" />
              </svg>
            )}
          </button>
        )}
      </div>
      {caption && (
        <figcaption className="ms-figure__caption">
          {caption.kicker && <span className="ms-figure__kicker">{caption.kicker}</span>}
          <span className="ms-figure__text">{caption.text}</span>
        </figcaption>
      )}
    </figure>
  );
}
