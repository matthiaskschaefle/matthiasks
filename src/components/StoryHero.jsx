import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DURATION, EASE } from "@/lib/animations";
import { useTypewriter } from "@/lib/useTypewriter";
import TypedCaret from "./TypedCaret.jsx";

const photoVariants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: {
    x: "0%",
  },
  exit: (direction) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

function commonPrefix(phrases) {
  if (phrases.length === 0) return "";
  let prefix = phrases[0];
  for (const phrase of phrases.slice(1)) {
    let index = 0;
    while (
      index < prefix.length
      && index < phrase.length
      && prefix[index] === phrase[index]
    ) {
      index++;
    }
    prefix = prefix.slice(0, index);
  }

  const lastSpace = prefix.lastIndexOf(" ");
  return lastSpace > 0 ? prefix.slice(0, lastSpace + 1) : prefix;
}

export default function StoryHero({ frames, heading }) {
  const shouldReduceMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [manualNavigationActive, setManualNavigationActive] = useState(false);
  const [manualIndex, setManualIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const paused = (hovered || focused) && !manualNavigationActive;

  const prefix = useMemo(
    () => commonPrefix(frames.map((frame) => frame.phrase)),
    [frames],
  );
  const variablePhrases = useMemo(
    () => frames.map((frame) => frame.phrase.slice(prefix.length)),
    [frames, prefix],
  );
  const {
    text,
    phraseIndex,
    progress,
    goTo,
  } = useTypewriter(variablePhrases, {
    enabled: !shouldReduceMotion,
    paused,
  });

  const activeIndex = shouldReduceMotion ? manualIndex : phraseIndex;
  const activeFrame = frames[activeIndex];
  const displayedText = shouldReduceMotion
    ? variablePhrases[activeIndex]
    : text;
  const srSentence = `${frames[0].phrase}.`;

  const navigate = (step, resumeAfterNavigation = false) => {
    const nextIndex = (activeIndex + step + frames.length) % frames.length;
    if (resumeAfterNavigation) setManualNavigationActive(true);
    setDirection(step > 0 ? 1 : -1);
    goTo(nextIndex);
    if (shouldReduceMotion) setManualIndex(nextIndex);
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      navigate(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      navigate(1);
    }
  };

  return (
    <section
      className="story-hero"
      aria-label="Introduction"
      tabIndex={0}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
      }}
      onFocus={() => setFocused(true)}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
          setFocused(false);
          setManualNavigationActive(false);
        }
      }}
      onKeyDown={handleKeyDown}
    >
      <style>{`
.story-hero { display:flex; flex-direction:column; align-items:center; margin-bottom:72px; outline:none; }
.story-hero:focus-visible { outline:2px solid var(--brand-400); outline-offset:6px; border-radius:16px; }
.story-hero-bars { display:flex; gap:6px; width:100%; max-width:420px; margin-bottom:14px; }
.story-hero-bar { flex:1; height:3px; overflow:hidden; border-radius:999px; background:var(--ink-200); }
.story-hero-bar-fill { display:block; width:0; height:100%; border-radius:inherit; background:var(--brand-600); }
.story-hero-media { position:relative; width:100%; max-width:420px; aspect-ratio:4/5; border-radius:12px; border:none; box-shadow:var(--shadow-fine); overflow:hidden; background:var(--ink-100); }
.story-hero-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 30%; pointer-events:none; user-select:none; }
.story-hero-nav { position:absolute; inset-block:0; z-index:2; width:30%; padding:0; border:0; border-radius:0; background:transparent; cursor:pointer; touch-action:manipulation; }
.story-hero-nav--previous { left:0; }
.story-hero-nav--next { right:0; }
.story-hero-nav:focus-visible { outline:3px solid var(--ink-900); outline-offset:-3px; box-shadow:inset 0 0 0 6px var(--bg); }
.story-hero-line { margin:22px 0 0; font-family:var(--font-mono); font-size:clamp(18px, 2.6vw, 24px); line-height:1.45; min-height:2.9em; text-align:center; max-width:640px; color:var(--ink-900); font-weight:500; }
.story-hero-line--static { min-height:0; font-family:var(--font-display); font-size:32px; font-weight:500; letter-spacing:-0.03em; line-height:1.15; color:var(--ink-900); }
@media (max-width:768px) { .story-hero-line--static { font-size:28px; } }
.story-hero-variable { color:var(--brand-600); }
.story-hero-caret { display:inline-block; width:0.55ch; height:1.05em; margin-left:2px; vertical-align:text-bottom; background:var(--brand-600); }
@media (max-width:768px) { .story-hero { margin-bottom:56px; } .story-hero-line { margin-top:18px; } }
      `}</style>

      <div className="story-hero-bars" aria-hidden="true">
        {frames.map((frame, index) => {
          const width = shouldReduceMotion
            ? 0
            : index < activeIndex
              ? 100
              : index === activeIndex
                ? progress * 100
                : 0;

          return (
            <span key={frame.phrase} className="story-hero-bar">
              <span
                className="story-hero-bar-fill"
                style={{ width: `${width}%` }}
              />
            </span>
          );
        })}
      </div>

      <div className="story-hero-media">
        {shouldReduceMotion ? (
          <img
            key={activeFrame.phrase}
            src={activeFrame.img}
            alt={activeFrame.alt}
            loading={activeIndex === 0 ? "eager" : "lazy"}
            decoding="async"
          />
        ) : (
          <AnimatePresence mode="popLayout" custom={direction}>
            <motion.img
              key={activeFrame.phrase}
              src={activeFrame.img}
              alt={activeFrame.alt}
              custom={direction}
              variants={photoVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: DURATION.base, ease: EASE.out }}
              onAnimationComplete={() => {
                if (direction < 0) setDirection(1);
              }}
              loading={activeIndex === 0 ? "eager" : "lazy"}
              decoding="async"
            />
          </AnimatePresence>
        )}

        <button
          type="button"
          className="story-hero-nav story-hero-nav--previous"
          aria-label="Previous photo"
          onClick={() => navigate(-1, true)}
        />
        <button
          type="button"
          className="story-hero-nav story-hero-nav--next"
          aria-label="Next photo"
          onClick={() => navigate(1, true)}
        />
      </div>

      {heading ? (
        <h1 className="story-hero-line story-hero-line--static">{heading}</h1>
      ) : (
      <h1 className="story-hero-line">
        <span
          className="sr-only-stable"
          style={{
            position: "absolute",
            width: 1,
            height: 1,
            overflow: "hidden",
            clip: "rect(0 0 0 0)",
            whiteSpace: "nowrap",
          }}
        >
          {srSentence}
        </span>
        <span aria-hidden="true">
          {prefix}
          <span className="story-hero-variable">{displayedText}</span>
          {!shouldReduceMotion && <TypedCaret className="story-hero-caret" />}
        </span>
      </h1>
      )}
    </section>
  );
}
