import { motion } from "framer-motion";
import { tiltIn, useReducedMotion as getReducedMotion, viewport as motionViewport } from "@/lib/animations";

/**
 * Frame: single containment grammar for mockups.
 *
 * variant="browser"  Chrome bar with 3 dots; the ONLY shadow allowed in the
 *                    system (CSS identical to the legacy .browser-frame).
 * variant="phone"    Hairline + 28px radius, no shadow, no notch.
 * variant="stage"    Flat tint panel (--ink-100), 16px radius, no gradient.
 *
 * The frame never touches its children: percentage-calibrated hotspot
 * coordinates inside keep pointing at the same box.
 *
 * `reveal={false}` skips the built-in one-shot tiltIn entrance (use when a
 * parent component already runs its own whileInView reveal, e.g. BeforeAfter).
 */
export default function Frame({
  variant = "stage",
  label,
  className = "",
  reveal = true,
  children,
}) {
  const prefersReducedMotion = getReducedMotion();
  const classes = ["ms-frame", `ms-frame--${variant}`, className]
    .filter(Boolean)
    .join(" ");
  const a11y = label ? { role: "group", "aria-label": label } : {};

  const content = (
    <>
      {variant === "browser" && (
        <div className="ms-frame__bar" aria-hidden="true">
          <span className="ms-frame__dot" />
          <span className="ms-frame__dot" />
          <span className="ms-frame__dot" />
        </div>
      )}
      <div className="ms-frame__body">{children}</div>
    </>
  );

  if (!reveal) {
    return (
      <div className={classes} {...a11y}>
        {content}
      </div>
    );
  }

  return (
    <motion.div
      className={classes}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={tiltIn(0, prefersReducedMotion)}
      {...a11y}
    >
      {content}
    </motion.div>
  );
}
