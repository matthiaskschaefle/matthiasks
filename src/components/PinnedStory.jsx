import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { DURATION, EASE } from "@/lib/animations";
import { getImageDims } from "./mockups/imageDims.js";

/**
 * Pinned scroll-linked narrative (addy.md pattern).
 * The media column stays pinned while each scroll step advances the story
 * (context -> research -> insight -> solution).
 *
 * Falls back to a simple stacked layout on small screens and when the
 * user prefers reduced motion.
 *
 * props:
 *  - eyebrow: small mono label above the whole block (optional)
 *  - steps: [{ id, label, title, body, img, alt }]
 */
export default function PinnedStory({ steps }) {
  const trackRef = useRef(null);
  const [index, setIndex] = useState(0);
  const [isStatic, setIsStatic] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.matchMedia("(max-width: 899.98px), (prefers-reduced-motion: reduce)").matches;
  });
  // One viewport establishes the sticky scene; each extra chapter adds a
  // short beat. A four-step story takes 160vh, roughly two mouse-wheel beats
  // in the current desktop preview instead of the previous five.
  const trackHeight = Math.max(120, 100 + (steps.length - 1) * 20);

  useEffect(() => {
    const check = () => {
      const stacked = window.matchMedia("(max-width: 899.98px), (prefers-reduced-motion: reduce)").matches;
      setIsStatic(stacked);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(steps.length - 1, Math.floor(v * steps.length));
    setIndex(i);
  });

  if (isStatic) {
    return (
      <section className="pinned-story pinned-story--static" aria-label="Case story">
        {steps.map((step) => (
          <div className="pinned-story-step" key={step.id}>
            <div className="pinned-story-media">
              <img
                src={step.img}
                alt={step.alt}
                loading="lazy"
                decoding="async"
                width={getImageDims(step.img, "PinnedStory")?.width}
                height={getImageDims(step.img, "PinnedStory")?.height}
              />
            </div>
            <div>
              <span className="pinned-story-step-label">{step.label}</span>
              <h3 className="pinned-story-title">{step.title}</h3>
              <p className="pinned-story-body">{step.body}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }

  const step = steps[index];

  return (
    <section className="pinned-story" aria-label="Case story">
      <div
        className="pinned-story-track"
        ref={trackRef}
        style={{ height: `${trackHeight}vh` }}
      >
        <div className="pinned-story-viewport">
          <div className="pinned-story-grid">
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: DURATION.fast, ease: EASE.out }}
                >
                  <span className="pinned-story-step-label">{step.label}</span>
                  <h3 className="pinned-story-title">{step.title}</h3>
                  <p className="pinned-story-body">{step.body}</p>
                </motion.div>
              </AnimatePresence>
              <div className="pinned-story-progress" aria-hidden="true">
                {steps.map((s, i) => (
                  <span key={s.id} className={i === index ? "is-active" : undefined} />
                ))}
              </div>
            </div>
            <div className="pinned-story-media">
              <AnimatePresence mode="wait">
                <motion.img
                  key={step.id}
                  src={step.img}
                  alt={step.alt}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.985 }}
                  transition={{ duration: DURATION.fast, ease: EASE.out }}
                  loading="eager"
                  decoding="async"
                  width={getImageDims(step.img, "PinnedStory")?.width}
                  height={getImageDims(step.img, "PinnedStory")?.height}
                />
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
