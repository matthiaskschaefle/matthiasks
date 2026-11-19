import { useRef } from "react";
import useAutoplayInView from "../lib/useAutoplayInView.js";

/**
 * A bare looping UI clip that plays while on screen (see useAutoplayInView),
 * with the same always-present pause/play toggle as VideoFigure. For layouts
 * that already draw their own frame around the video.
 */
export default function LoopVideo({ src, poster, label, style }) {
  const videoRef = useRef(null);
  const { playing, blocked, reduceMotion, toggle, bind } = useAutoplayInView(videoRef);
  const waitingForReader = !playing && (reduceMotion || blocked);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        preload="none"
        muted
        loop
        playsInline
        aria-label={label}
        style={style}
        {...bind}
      />
      <button
        type="button"
        className={waitingForReader ? "ms-video__play" : "ms-video__toggle"}
        aria-label={playing ? `Pause video: ${label}` : `Play video: ${label}`}
        aria-pressed={playing}
        onClick={toggle}
      >
        {playing ? (
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M3 2h3v10H3zM8 2h3v10H8z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M5 3.5v11l9-5.5-9-5.5z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
