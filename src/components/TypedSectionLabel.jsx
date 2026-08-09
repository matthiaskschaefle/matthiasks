import { motion } from "framer-motion";
import { fadeIn, viewport as motionViewport } from "@/lib/animations";

const typedLabelV = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.09 },
  },
};

const typedMultilineLabelV = {
  hidden: { opacity: 1 },
  visible: { opacity: 1 },
};

const typedCharacterV = {
  hidden: { opacity: 0, y: 2 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.04 },
  },
};

const typedMultilineCharacterV = {
  hidden: { opacity: 0, y: 2 },
  visible: (characterIndex = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: characterIndex * 0.09,
      duration: 0.04,
    },
  }),
};

const typedCaretV = {
  hidden: { opacity: 0 },
  visible: (characterCount = 0) => ({
    opacity: [0, 1, 1, 0, 1, 0],
    transition: {
      delay: characterCount * 0.09 + 0.08,
      duration: 1.05,
      times: [0, 0.08, 0.38, 0.5, 0.78, 1],
    },
  }),
};

export default function TypedSectionLabel({
  children,
  className = "case-section-label",
  id,
  lineBreakAfter,
  prefersReducedMotion,
  standalone = false,
}) {
  const label = String(children);
  const breakIndex = lineBreakAfter
    ? label.indexOf(lineBreakAfter) + lineBreakAfter.length
    : -1;
  const hasLineBreak = breakIndex > 0 && breakIndex < label.length;
  const visualLines = hasLineBreak
    ? [label.slice(0, breakIndex), label.slice(breakIndex).trimStart()]
    : [label];
  const staticClassName = `${className}${hasLineBreak ? " case-section-label--multiline" : ""}`;
  const typedClassName = `${className} case-section-label--typed${hasLineBreak ? " case-section-label--multiline" : ""}`;
  const standaloneMotionProps = standalone
    ? {
        initial: "hidden",
        whileInView: "visible",
        viewport: motionViewport,
      }
    : {};

  if (prefersReducedMotion) {
    return (
      <motion.h2
        className={staticClassName}
        id={id}
        variants={fadeIn}
        {...standaloneMotionProps}
      >
        {visualLines.map((line) => (
          <span className="case-section-label-line" key={line}>{line}</span>
        ))}
      </motion.h2>
    );
  }

  if (hasLineBreak) {
    return (
      <motion.h2
        className={typedClassName}
        id={id}
        variants={typedMultilineLabelV}
        aria-label={label}
        {...standaloneMotionProps}
      >
        <span className="case-section-label-text case-section-label-text--multiline" aria-hidden="true">
          {visualLines.map((line, lineIndex) => {
            const characterOffset = lineIndex === 0 ? 0 : breakIndex + 1;
            const isLastLine = lineIndex === visualLines.length - 1;

            return (
              <span className="case-section-label-line" key={line}>
                {[...line].map((character, index) => (
                  <motion.span
                    className="case-section-label-character"
                    variants={typedMultilineCharacterV}
                    custom={characterOffset + index}
                    key={`${label}-${characterOffset + index}`}
                  >
                    {character === " " ? "\u00A0" : character}
                  </motion.span>
                ))}
                {isLastLine && (
                  <motion.span
                    className="case-section-label-caret"
                    variants={typedCaretV}
                    custom={label.length}
                  />
                )}
              </span>
            );
          })}
        </span>
      </motion.h2>
    );
  }

  return (
    <motion.h2
      className={typedClassName}
      id={id}
      variants={typedLabelV}
      aria-label={label}
      {...standaloneMotionProps}
    >
      <span className="case-section-label-text" aria-hidden="true">
        {[...label].map((character, index) => (
          <motion.span
            className="case-section-label-character"
            variants={typedCharacterV}
            key={`${label}-${index}`}
          >
            {character === " " ? "\u00A0" : character}
          </motion.span>
        ))}
      </span>
      <motion.span
        className="case-section-label-caret"
        variants={typedCaretV}
        custom={label.length}
        aria-hidden="true"
      />
    </motion.h2>
  );
}
