import { motion } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  useReducedMotion as getReducedMotion,
  viewport as motionViewport,
} from "@/lib/animations";
import Frame from "./Frame.jsx";
import { getImageDims } from "./imageDims.js";
import { useLightbox } from "./lightbox-context.js";

function splitObservationDecision(text) {
  const match = String(text).match(
    /^Observation:\s*([\s\S]+?)\s*Decision:\s*([\s\S]+?)(?:\s*Evidence:\s*([\s\S]+))?$/,
  );
  if (!match) return null;
  return {
    observation: match[1].trim(),
    decision: match[2].trim(),
    evidence: match[3]?.trim() || null,
  };
}

function Description({ text }) {
  const parts = splitObservationDecision(text);
  if (!parts) {
    return <p className="ms-ba__desc">{text}</p>;
  }

  return (
    <div className="ms-ba__desc">
      <p className="ms-ba__fact">
        <span className="ms-ba__fact-label">Observation</span>
        {parts.observation}
      </p>
      <p className="ms-ba__fact">
        <span className="ms-ba__fact-label">Decision</span>
        {parts.decision}
      </p>
      {parts.evidence && (
        <p className="ms-ba__fact">
          <span className="ms-ba__fact-label">Evidence</span>
          {parts.evidence}
        </p>
      )}
    </div>
  );
}

function Screen({ shot, zoom }) {
  const dims = getImageDims(shot.src, "BeforeAfter");
  const { open } = useLightbox();
  const img = (
    <img
      className="ms-ba__img"
      src={shot.src}
      alt={shot.alt}
      width={dims?.width}
      height={dims?.height}
      loading="lazy"
      decoding="async"
      draggable={false}
      style={dims ? { aspectRatio: `${dims.width} / ${dims.height}` } : undefined}
    />
  );

  if (!zoom) return img;

  return (
    <button
      type="button"
      className="ms-figure__zoom"
      aria-label={`Enlarge: ${shot.alt}`}
      onClick={() => open({ src: shot.src, alt: shot.alt })}
    >
      {img}
    </button>
  );
}

/**
 * BeforeAfter: static side-by-side pair (replaces the scroll-linked
 * UIChangesPairAnnotated + gradient MockupBadge).
 *
 * Layout: 54% media / text grid, screens side by side with 14px gap, aligned
 * by top (different heights are accepted: no ratio hacks, no ResizeObserver).
 * Stacks below 900px. Entry is a single one-shot fadeUp; ZERO scroll-linked
 * motion. Screens sit in hairline phone frames (drop-shadows are gone).
 *
 * before/after = { src, alt }: alts follow the "Before: …" / "After: …"
 * pattern. The whole pair is one <figure>; the text column is its
 * <figcaption> (title + description keep parity if images fail).
 */
export default function BeforeAfter({
  before,
  after,
  title,
  description,
  caption,
  focus,
  zoom = false,
  className = "",
}) {
  const prefersReducedMotion = getReducedMotion();

  return (
    <motion.figure
      className={`ms-ba ${focus ? `ms-ba--focus-${focus}` : ""} ${className}`.trim()}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={prefersReducedMotion ? fadeIn : fadeUp}
    >
      <div className="ms-ba__grid">
        <div className="ms-ba__media">
          <div className="ms-ba__cell">
            <p className="ms-ba__label">Before</p>
            <Frame variant="phone" reveal={false}>
              <Screen shot={before} zoom={zoom} />
            </Frame>
          </div>
          <div className="ms-ba__cell">
            <p className="ms-ba__label ms-ba__label--after">After</p>
            <Frame variant="phone" reveal={false}>
              <Screen shot={after} zoom={zoom} />
            </Frame>
          </div>
        </div>
        <figcaption className="ms-ba__text">
          <h3 className="ms-ba__title">{title}</h3>
          <Description text={description} />
          {caption && <p className="ms-ba__caption">{caption}</p>}
        </figcaption>
      </div>
    </motion.figure>
  );
}
