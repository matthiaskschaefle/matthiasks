import { motion } from "framer-motion";
import { fadeIn, viewport as motionViewport } from "@/lib/animations";

// Section label: one quiet fade when the section enters the view.
// It used to type itself letter by letter with a blinking caret on every
// section of every page. That turned a label into a page-wide tic, so the
// typing is gone and the label simply appears with its section.
export default function TypedSectionLabel({
  children,
  className = "case-section-label",
  id,
  lineBreakAfter,
  standalone = false,
}) {
  const label = String(children);
  const breakIndex = lineBreakAfter ? label.indexOf(lineBreakAfter) + lineBreakAfter.length : -1;
  const hasLineBreak = breakIndex > 0 && breakIndex < label.length;
  const visualLines = hasLineBreak
    ? [label.slice(0, breakIndex), label.slice(breakIndex).trimStart()]
    : [label];
  const standaloneMotionProps = standalone
    ? { initial: "hidden", whileInView: "visible", viewport: motionViewport }
    : {};

  return (
    <motion.h2
      className={`${className} case-section-label--typed${hasLineBreak ? " case-section-label--multiline" : ""}`}
      id={id}
      variants={fadeIn}
      {...standaloneMotionProps}
    >
      <span
        className={`case-section-label-text${hasLineBreak ? " case-section-label-text--multiline" : ""}`}
      >
        {visualLines.map((line) => (
          <span className="case-section-label-line" key={line}>
            {line}
          </span>
        ))}
      </span>
    </motion.h2>
  );
}
