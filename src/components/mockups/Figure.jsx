import { motion } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  useReducedMotion as getReducedMotion,
  viewport as motionViewport,
} from "@/lib/animations";
import Frame from "./Frame.jsx";
import { useLightbox } from "./lightbox-context.js";
import { getImageDims } from "./imageDims.js";

function ZoomTrigger({ src, alt, captionText, children }) {
  const { open } = useLightbox();
  return (
    <button
      type="button"
      className="ms-figure__zoom"
      aria-label={`Enlarge: ${alt}`}
      onClick={() => open({ src, alt, caption: captionText })}
    >
      {children}
    </button>
  );
}

/**
 * Figure — editorial media unit: <figure>/<figcaption>, real dims from the
 * manifest, aspect-ratio reserved on the media wrapper (CLS-safe), optional
 * zoom into the shared Lightbox, optional Frame containment shortcut.
 *
 * caption = { kicker?: string, text: string } — caption ≠ alt: alt describes
 * the image, caption gives case context.
 * eager   — hero only: loading="eager" fetchpriority="high".
 * variants — override the one-shot entrance (default fadeUp; fade under RM).
 */
export default function Figure({
  src,
  alt,
  caption,
  zoom = false,
  eager = false,
  frame = "none",
  variants,
  className = "",
}) {
  const prefersReducedMotion = getReducedMotion();
  const dims = getImageDims(src, "Figure");

  const img = (
    <img
      className="ms-figure__img"
      src={src}
      alt={alt}
      width={dims?.width}
      height={dims?.height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      {...(eager ? { fetchPriority: "high" } : {})}
      draggable={false}
    />
  );

  const media = (
    <div
      className="ms-figure__media"
      style={dims ? { aspectRatio: `${dims.width} / ${dims.height}` } : undefined}
    >
      {zoom ? (
        <ZoomTrigger src={src} alt={alt} captionText={caption?.text}>
          {img}
        </ZoomTrigger>
      ) : (
        img
      )}
    </div>
  );

  const captionNode = caption ? (
    <figcaption className="ms-figure__caption">
      {caption.kicker && (
        <span className="ms-figure__kicker">{caption.kicker}</span>
      )}
      <span className="ms-figure__text">{caption.text}</span>
    </figcaption>
  ) : null;

  // With a Frame shortcut, the Frame already runs the one-shot reveal — the
  // figure stays static so entrances don't stack.
  if (frame !== "none") {
    return (
      <figure className={`ms-figure ${className}`.trim()}>
        <Frame variant={frame}>{media}</Frame>
        {captionNode}
      </figure>
    );
  }

  return (
    <motion.figure
      className={`ms-figure ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={variants ?? (prefersReducedMotion ? fadeIn : fadeUp)}
    >
      {media}
      {captionNode}
    </motion.figure>
  );
}
