import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Scroll-linked depth for large in-flow images: the image drifts slower
 * than the page inside a masked frame (editorial parallax).
 *
 * Falls back to a plain static image on small screens and under
 * prefers-reduced-motion.
 *
 * props:
 *  - src, alt: the image
 *  - shift: max drift in % of image height (default 7)
 *  - className: applied to the masking wrapper (keep border-radius here)
 *  - imgClassName / imgProps: forwarded to the <img>
 */
export default function ParallaxImage({
  src,
  alt,
  shift = 7,
  className,
  style,
  imgClassName,
  ...imgProps
}) {
  const ref = useRef(null);
  const [isStatic, setIsStatic] = useState(true);

  useEffect(() => {
    const check = () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      setIsStatic(reduce || window.innerWidth < 900);
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${shift}%`, `${shift}%`]);

  // Overscale so the drifting image never exposes the mask edges.
  const cover = 1 + (shift * 2.2) / 100;

  if (isStatic) {
    return (
      <div className={className} style={{ overflow: "hidden", ...style }}>
        <img
          src={src}
          alt={alt}
          className={imgClassName}
          style={{ width: "100%", display: "block" }}
          {...imgProps}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ overflow: "hidden", ...style }}>
      <motion.img
        src={src}
        alt={alt}
        className={imgClassName}
        style={{ width: "100%", display: "block", y, scale: cover }}
        {...imgProps}
      />
    </div>
  );
}
