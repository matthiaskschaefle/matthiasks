import { motion } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  useReducedMotion as getReducedMotion,
  viewport as motionViewport,
} from "@/lib/animations";
import Frame from "./Frame.jsx";
import { getImageDims } from "./imageDims.js";

function Screen({ shot }) {
  const dims = getImageDims(shot.src, "BeforeAfter");
  return (
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
              <Screen shot={before} />
            </Frame>
          </div>
          <div className="ms-ba__cell">
            <p className="ms-ba__label ms-ba__label--after">After</p>
            <Frame variant="phone" reveal={false}>
              <Screen shot={after} />
            </Frame>
          </div>
        </div>
        <figcaption className="ms-ba__text">
          <h3 className="ms-ba__title">{title}</h3>
          <p className="ms-ba__desc">{description}</p>
          {caption && <p className="ms-ba__caption">{caption}</p>}
        </figcaption>
      </div>
    </motion.figure>
  );
}
