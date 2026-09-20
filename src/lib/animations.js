// Base motion tokens
export const DURATION = {
  fast: 0.25,
  base: 0.4,
  slow: 0.6,
  float: 3.0,
};

export const EASE = {
  out: [0.2, 0, 0, 1],
  in: [0.4, 0, 1, 1],
  inOut: [0.4, 0, 0.2, 1],
};

export const STAGGER = {
  fast: 0.08,
  base: 0.1,
  slow: 0.15,
};

export const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE.out },
  },
};

export const fadeUpImmediate = (i = 0, reducedMotion = false) => ({
  initial: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 12 },
  animate: reducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 },
  transition: {
    duration: reducedMotion ? 0.1 : DURATION.base,
    ease: EASE.out,
    delay: reducedMotion ? 0 : i * STAGGER.base,
  },
});

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const fadeScale = {
  hidden: { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
};

export const floatLoop = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: DURATION.float,
      ease: EASE.inOut,
      repeat: Infinity,
      repeatType: "loop",
    },
  },
};

// Section choreography: the section itself fades in while any motion
// children (label, cards, bars) run their own staggered reveals.
// Plain children just ride the section fade; motion children only need
// a `variants` prop, visibility propagates from the parent.
export const sectionStagger = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE.out, staggerChildren: 0.12, delayChildren: 0.05 },
  },
};

// Nested stagger for card grids inside a section.
export const gridStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: STAGGER.fast } },
};

// Mono section label slides in from the left ahead of the body copy.
export const labelReveal = {
  hidden: { opacity: 0, x: -18 },
  visible: { opacity: 1, x: 0, transition: { duration: DURATION.base, ease: EASE.out } },
};

// Mockup entrance: rises with an exaggerated tilt and settles on `rotate`
// (pass 0 for a straight landing). Pass reducedMotion to collapse to a fade.
export const tiltIn = (rotate = 0, reducedMotion = false) => ({
  hidden: reducedMotion ? { opacity: 0 } : { opacity: 0, y: 36, rotate: rotate * 2.5, scale: 0.97 },
  visible: {
    opacity: 1,
    ...(reducedMotion ? {} : { y: 0, rotate, scale: 1 }),
    transition: { duration: DURATION.slow, ease: EASE.out },
  },
});

// Horizontal bar that grows from the left once visible (KPI meters).
export const barGrow = (reducedMotion = false) => ({
  hidden: reducedMotion ? {} : { scaleX: 0 },
  visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE.out, delay: 0.15 } },
});

// Fix for the scroll-reveal bug on case pages: whole <motion.section> blocks
// can be taller than the viewport, so a 10% visibility threshold was never
// reached and sections stayed stuck at opacity 0 on initial load.
// "some" fires as soon as any part of the element enters the viewport.
export const viewport = { once: true, amount: "some", margin: "0px 0px 20% 0px" };

export const useReducedMotion = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
