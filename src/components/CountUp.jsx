import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { EASE } from "@/lib/animations";

/**
 * Counts a single number up from 0 when it scrolls into view.
 * The accessible name is always the final prefix + value + suffix.
 * Only the visual animation is hidden from assistive tech.
 *
 * Only use for single values ("98", "2"). Ranges ("80-130") must stay
 * static: intermediate frames would read as a different, wrong metric.
 *
 * props:
 *  - value: final number (integer)
 *  - prefix / suffix: rendered around the number, never animated
 *  - duration: seconds (default 1.4)
 */
export default function CountUp({ value, prefix = "", suffix = "", duration = 1.4 }) {
  const ref = useRef(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.01, margin: "80px 0px" });
  const count = useMotionValue(value);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const label = `${prefix}${value}${suffix}`;

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    count.set(0);
    const controls = animate(count, value, {
      duration,
      ease: EASE.out,
    });
    return () => {
      controls.stop();
    };
  }, [inView, reduceMotion, value, duration, count]);

  return (
    <span ref={ref} className="count-up">
      <style>{`
        .count-up {
          position: relative;
          display: inline;
        }
        .count-up-sr {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          clip-path: inset(50%);
          white-space: nowrap;
          border: 0;
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0;
          line-height: 1;
          color: inherit;
        }
        .count-up-visual {
          display: inline;
        }
      `}</style>
      <span className="count-up-sr">{label}</span>
      <span className="count-up-visual" aria-hidden="true">
        {prefix}
        <motion.span>{rounded}</motion.span>
        {suffix}
      </span>
    </span>
  );
}
