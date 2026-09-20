import { useEffect, useLayoutEffect, useState } from "react";

const CONTENTS_ID = "case-contents";
const DESKTOP_MQ = "(min-width: 769px)";

function parseHashId(hash) {
  if (!hash || hash === "#") return null;
  try {
    const id = decodeURIComponent(hash.slice(1));
    return id || null;
  } catch {
    return null;
  }
}

function focusHashTarget(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const focusTarget =
    id === CONTENTS_ID
      ? el.querySelector("summary") || el
      : el.querySelector(".case-section-label, h2") || el;
  if (!focusTarget.hasAttribute("tabindex")) {
    focusTarget.setAttribute("tabindex", "-1");
  }
  focusTarget.focus({ preventScroll: true });
}

function scrollToHashTarget(el) {
  el.scrollIntoView({ behavior: "instant", block: "start" });
}

function restoreHashOnce() {
  const id = parseHashId(window.location.hash);
  if (!id) return;
  const el = document.getElementById(id);
  if (!el) return;
  scrollToHashTarget(el);
  window.requestAnimationFrame(() => focusHashTarget(id));
}

/**
 * In-flow case contents. Native hash links, no fixed chrome, no active spy.
 * Direct URLs restore after the case tree commits. In-page clicks stay native.
 * Invalid or unknown fragments leave the page where it is.
 */
export default function CaseContents({ sections }) {
  const [isDesktop, setIsDesktop] = useState(() => (
    typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches
  ));
  const [open, setOpen] = useState(() => (
    typeof window !== "undefined" && window.matchMedia(DESKTOP_MQ).matches
  ));

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_MQ);
    function sync() {
      const desktop = mq.matches;
      setIsDesktop(desktop);
      if (desktop) setOpen(true);
    }
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useLayoutEffect(() => {
    restoreHashOnce();
    const outer = window.requestAnimationFrame(() => {
      restoreHashOnce();
    });
    return () => window.cancelAnimationFrame(outer);
  }, []);

  function onToggle(event) {
    if (isDesktop) {
      setOpen(true);
      return;
    }
    setOpen(event.currentTarget.open);
  }

  function onHashClick(event) {
    const href = event.currentTarget.getAttribute("href") || "";
    if (!href.startsWith("#")) return;
    const id = parseHashId(href);
    if (!id) return;
    window.requestAnimationFrame(() => focusHashTarget(id));
  }

  return (
    <nav id={CONTENTS_ID} className="case-contents" aria-label="In this case">
      <details className="case-contents-box" open={open} onToggle={onToggle}>
        <summary className="case-contents-summary" tabIndex={isDesktop ? -1 : undefined}>In this case</summary>
        <ol className="case-contents-list">
          {sections.map(({ id, label }) => (
            <li key={id}>
              <a href={`#${id}`} onClick={onHashClick}>{label}</a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

export function CaseBackToContents() {
  function onHashClick() {
    window.requestAnimationFrame(() => focusHashTarget(CONTENTS_ID));
  }

  return (
    <p className="case-contents-back">
      <a href={`#${CONTENTS_ID}`} onClick={onHashClick}>Back to contents</a>
    </p>
  );
}
