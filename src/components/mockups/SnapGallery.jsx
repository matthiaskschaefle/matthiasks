import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  fadeIn,
  fadeUp,
  useReducedMotion as getReducedMotion,
  viewport as motionViewport,
} from "@/lib/animations";
import { getImageDims } from "./imageDims.js";

function SnapItem({ item }) {
  const dims = getImageDims(item.src, "SnapGallery");
  const usesSprite = Number.isInteger(item.spriteIndex) && item.spriteTotal > 0;
  // A sprite item exposes one accessible screen from a shared high-resolution strip.
  return (
    <li className="ms-snap__item">
      {usesSprite ? (
        <span
          className="ms-snap__sprite"
          style={{
            "--ms-snap-sprite-width": `${item.spriteTotal * 100}%`,
            "--ms-snap-sprite-offset": `${item.spriteIndex * -100}%`,
          }}
        >
          <img
            className="ms-snap__sprite-img"
            src={item.src}
            alt={item.alt}
            width={dims?.width}
            height={dims?.height}
            loading="lazy"
            decoding="async"
            draggable={false}
          />
        </span>
      ) : (
        <img
          className="ms-snap__img"
          src={item.src}
          alt={item.alt}
          width={dims?.width}
          height={dims?.height}
          loading="lazy"
          decoding="async"
          draggable={false}
        />
      )}
      {item.caption && <span className="ms-snap__caption">{item.caption}</span>}
    </li>
  );
}

/**
 * SnapGallery — manual scroll-snap strip (replaces the auto-scrolling
 * MobileVersionCarousel). Native scroll + scroll-snap + prev/next buttons +
 * mono index + hairline progress. Zero rAF, zero auto-scroll, zero repeated
 * sets: every screen appears exactly once, with a real alt.
 *
 * items = [{ src, alt, caption? }] — dims come from the manifest.
 * label — accessible name, e.g. "Mobile screens".
 *
 * Keyboard: the scroll viewport is a focusable region (native arrow-key
 * scrolling); buttons are 44px hairline controls with aria-disabled at the
 * extremes. A polite live region announces "Screen X of Y" (debounced).
 */
export default function SnapGallery({ items, label, className = "" }) {
  const prefersReducedMotion = getReducedMotion();
  const viewportRef = useRef(null);
  const viewportId = useId();
  const [index, setIndex] = useState(0);
  const [announced, setAnnounced] = useState(0);
  const total = items.length;

  const handleScroll = useCallback((event) => {
    const viewportEl = event.currentTarget;
    const firstItem = viewportEl.querySelector(".ms-snap__item");
    const track = viewportEl.querySelector(".ms-snap__track");
    if (!firstItem || !track) return;

    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    const step = firstItem.getBoundingClientRect().width + gap;
    if (step <= 0) return;

    const nextIndex = Math.min(
      total - 1,
      Math.max(0, Math.round(viewportEl.scrollLeft / step)),
    );
    setIndex(nextIndex);
  }, [total]);

  // Debounce the live-region announcement (~150ms) so fast scrolls don't flood.
  useEffect(() => {
    if (index === announced) return undefined;
    const timer = setTimeout(() => setAnnounced(index), 150);
    return () => clearTimeout(timer);
  }, [index, announced]);

  const scrollByItem = (direction) => {
    const viewportEl = viewportRef.current;
    if (!viewportEl) return;
    const firstItem = viewportEl.querySelector(".ms-snap__item");
    if (!firstItem) return;
    const track = viewportEl.querySelector(".ms-snap__track");
    const gap = track
      ? parseFloat(window.getComputedStyle(track).gap) || 0
      : 0;
    const step = firstItem.getBoundingClientRect().width + gap;
    viewportEl.scrollBy({
      left: direction * step,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  const atStart = index <= 0;
  const atEnd = index >= total - 1;
  const pad = (value) => String(value).padStart(2, "0");

  return (
    <motion.section
      className={`ms-snap ${className}`.trim()}
      aria-roledescription="carousel"
      aria-label={label}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
      variants={prefersReducedMotion ? fadeIn : fadeUp}
    >
      <div
        ref={viewportRef}
        id={viewportId}
        className="ms-snap__viewport"
        tabIndex={0}
        role="region"
        aria-label={`${label}, scrollable`}
        onScroll={handleScroll}
      >
        <ul className="ms-snap__track">
          {items.map((item, itemIndex) => (
            <SnapItem
              key={`${item.src}-${item.spriteIndex ?? itemIndex}`}
              item={item}
            />
          ))}
        </ul>
      </div>
      <div className="ms-snap__bar">
        <div className="ms-snap__controls">
          <button
            type="button"
            className="ms-snap__btn"
            aria-label="Previous screen"
            aria-controls={viewportId}
            aria-disabled={atStart}
            onClick={() => {
              if (!atStart) scrollByItem(-1);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M10 3L5 8l5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="ms-snap__btn"
            aria-label="Next screen"
            aria-controls={viewportId}
            aria-disabled={atEnd}
            onClick={() => {
              if (!atEnd) scrollByItem(1);
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 3l5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
        <div className="ms-snap__progress" aria-hidden="true">
          <span
            className="ms-snap__progress-fill"
            style={{ width: `${total > 0 ? ((index + 1) / total) * 100 : 0}%` }}
          />
        </div>
        <span className="ms-snap__index" aria-hidden="true">
          {pad(index + 1)} / {pad(total)}
        </span>
        <span className="ms-visually-hidden" aria-live="polite">
          {total > 0 &&
            `Screen ${announced + 1} of ${total}: ${
              items[announced]?.caption ?? items[announced]?.alt
            }`}
        </span>
      </div>
    </motion.section>
  );
}
