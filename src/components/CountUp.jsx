import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { EASE } from "@/lib/animations";

/**
 * Counts a single number up from 0 when it scrolls into view.
 * Renders the final value immediately under prefers-reduced-motion.
 * Screen readers always get the final value from a visually hidden
 * span; the animated number is aria-hidden.
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
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const controls = animate(reduce ? value : 0, value, {
      duration: reduce ? 0 : duration,
      ease: EASE.out,
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, duration]);

  return (
    <span ref={ref}>
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)", whiteSpace: "nowrap" }}>
        {prefix}
        {value}
        {suffix}
      </span>
      <span aria-hidden="true">
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
