import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useReducedMotion as getReducedMotion } from "@/lib/animations";

/**
 * Hotspot: accessible annotation system (popover + numbered list hybrid).
 *
 * HotspotMap: dots overlaid on a mockup. MUST be a direct child of the same
 * positioned (relative) container that wraps the mockup image: the popover
 * collision logic measures against `layerRef.current.parentElement`, keeping
 * the exact geometry of the legacy SmartCard (wrapper: absolute, left/top %,
 * translate(-50%, -50%)). Interactive element is a native <button>; the
 * 28x28 visual grows to a >=44x44 hit area via ::before.
 *
 * HotspotList: numbered parity list, ALWAYS rendered (all breakpoints) so
 * screen readers/keyboard/mobile get 100% of the content without the popover.
 * Dot aria-describedby points at the matching list item (always in the DOM).
 *
 * Interaction: pointer:fine hover = preview; click/Enter/Space = pin (toggle);
 * second click, blur or Esc = close. WCAG 1.4.13 (dismissible/hoverable/
 * persistent) and 2.5.8 (target size) honored.
 */

function isFinePointer() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(pointer: fine)").matches
  );
}

function HotspotCard({ bullet, popoverId, layerRef }) {
  const cardRef = useRef(null);
  const [side, setSide] = useState("right");
  const prefersReducedMotion = getReducedMotion();

  // Legacy SmartCard collision: flip left/right based on the dot's center
  // relative to the container (the map layer's parent). Geometry unchanged.
  useEffect(() => {
    if (!cardRef.current) return undefined;
    const container = layerRef.current?.parentElement?.getBoundingClientRect();
    const dot = cardRef.current.parentElement?.getBoundingClientRect();
    if (!container || !dot) return undefined;

    const dotCenter = dot.left - container.left + dot.width / 2;
    const frame = requestAnimationFrame(() => {
      setSide(dotCenter < container.width / 2 ? "right" : "left");
    });
    return () => cancelAnimationFrame(frame);
  }, [layerRef]);

  return (
    <motion.div
      ref={cardRef}
      id={popoverId}
      role="note"
      className={`ms-hotspot-popover ms-hotspot-popover--${side}${
        bullet.placement ? ` ms-hotspot-popover--${bullet.placement}` : ""
      }`}
      initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
      animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 4 }}
      transition={{ duration: 0.18, ease: "easeOut" }}
    >
      <span className="ms-hotspot-popover__arrow" aria-hidden="true" />
      <div className="ms-hotspot-popover__card">
        <h3 className="ms-hotspot-popover__title">{bullet.title}</h3>
        <p className="ms-hotspot-popover__desc">{bullet.description}</p>
      </div>
    </motion.div>
  );
}

export function HotspotMap({ bullets, mapId, className = "" }) {
  const [pinnedId, setPinnedId] = useState(null);
  const [hoverId, setHoverId] = useState(null);
  const layerRef = useRef(null);

  const activeId = pinnedId ?? hoverId;

  // Esc dismisses pinned AND hover-previewed content (WCAG 1.4.13) even when
  // focus is elsewhere on the page.
  useEffect(() => {
    if (activeId === null) return undefined;
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        setPinnedId(null);
        setHoverId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeId]);

  return (
    <div ref={layerRef} className={`ms-hotspot-map ${className}`.trim()}>
      {bullets.map((bullet, index) => {
        const isActive = activeId === bullet.id;
        const baseId = `hotspot-${mapId}-${bullet.id}`;
        return (
          <div
            key={bullet.id}
            className="absolute"
            style={{
              left: bullet.x,
              top: bullet.y,
              transform: "translate(-50%, -50%)",
              zIndex: isActive ? 50 : 10,
            }}
            onMouseEnter={() => {
              if (isFinePointer()) setHoverId(bullet.id);
            }}
            onMouseLeave={() => {
              if (isFinePointer()) setHoverId(null);
            }}
          >
            <button
              type="button"
              className={`ms-hotspot-dot${isActive ? " is-active" : ""}`}
              aria-label={`${index + 1}. ${bullet.title}`}
              aria-expanded={isActive}
              aria-controls={`${baseId}-popover`}
              aria-describedby={`${baseId}-item`}
              onClick={() =>
                setPinnedId((current) =>
                  current === bullet.id ? null : bullet.id
                )
              }
              onBlur={() => {
                if (pinnedId === bullet.id) setPinnedId(null);
              }}
            >
              <motion.span
                className="ms-hotspot-dot__visual"
                aria-hidden="true"
                animate={{ scale: isActive ? 1.1 : 1 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                {bullet.id}
              </motion.span>
            </button>
            <AnimatePresence>
              {isActive && (
                <HotspotCard
                  bullet={bullet}
                  popoverId={`${baseId}-popover`}
                  layerRef={layerRef}
                />
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export function HotspotList({ bullets, mapId, className = "" }) {
  return (
    <ol className={`ms-hotspot-list ${className}`.trim()}>
      {bullets.map((bullet) => (
        <li
          key={bullet.id}
          id={`hotspot-${mapId}-${bullet.id}-item`}
          className="ms-hotspot-list__item"
        >
          <span className="ms-hotspot-list__number" aria-hidden="true">
            {bullet.id}
          </span>
          <span className="ms-hotspot-list__content">
            <span className="ms-hotspot-list__title">{bullet.title}</span>
            <span className="ms-hotspot-list__desc">{bullet.description}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
