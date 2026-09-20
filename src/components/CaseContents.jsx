import { useEffect, useLayoutEffect, useState } from "react";

const CONTENTS_ID = "case-contents";
const DESKTOP_MQ = "(min-width: 769px)";
const STABLE_FRAMES = 2;
const USER_SCROLL_KEYS = new Set([
  " ",
  "ArrowUp",
  "ArrowDown",
  "PageUp",
  "PageDown",
  "Home",
  "End",
  "Spacebar",
]);

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

function imageAffectsPrecedingLayout(img, target) {
  if (!img.isConnected) return false;
  if (!(target.compareDocumentPosition(img) & Node.DOCUMENT_POSITION_PRECEDING)) {
    return false;
  }
  if (img.closest("details:not([open]), [hidden], [aria-hidden='true']")) {
    return false;
  }
  const style = window.getComputedStyle(img);
  if (
    style.display === "none"
    || style.visibility === "hidden"
    || style.contentVisibility === "hidden"
  ) {
    return false;
  }
  return true;
}

function whenImageCannotBlockLayout(img) {
  if (img.complete) {
    if (typeof img.decode === "function") {
      return img.decode().catch(() => undefined);
    }
    return Promise.resolve();
  }

  const lazyUnstarted = img.loading === "lazy" && !img.currentSrc;
  if (lazyUnstarted) {
    return Promise.resolve();
  }

  return new Promise((resolve) => {
    const done = () => {
      img.removeEventListener("load", done);
      img.removeEventListener("error", done);
      resolve();
    };
    img.addEventListener("load", done);
    img.addEventListener("error", done);
  });
}

function whenPrecedingLayoutIsReady(target) {
  const images = [...document.images]
    .filter((img) => imageAffectsPrecedingLayout(img, target))
    .map(whenImageCannotBlockLayout);
  const fonts = document.fonts?.ready ?? Promise.resolve();
  return Promise.all([fonts, ...images]);
}

function whenDocumentLayoutSettles(target, shouldStop) {
  return new Promise((resolve) => {
    let lastTop = null;
    let lastHeight = null;
    let stable = 0;

    const tick = () => {
      if (shouldStop()) {
        resolve();
        return;
      }
      const top = Math.round(target.getBoundingClientRect().top);
      const height = document.documentElement.scrollHeight;
      if (top === lastTop && height === lastHeight) {
        stable += 1;
        if (stable >= STABLE_FRAMES) {
          resolve();
          return;
        }
      } else {
        stable = 0;
        lastTop = top;
        lastHeight = height;
      }
      window.requestAnimationFrame(tick);
    };

    window.requestAnimationFrame(tick);
  });
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
    const id = parseHashId(window.location.hash);
    if (!id) return undefined;
    const target = document.getElementById(id);
    if (!target) return undefined;

    let cancelled = false;
    let userMoved = false;
    const shouldStop = () => cancelled || userMoved;

    const markUserMoved = () => {
      userMoved = true;
    };
    const markUserKey = (event) => {
      if (USER_SCROLL_KEYS.has(event.key)) userMoved = true;
    };

    window.addEventListener("wheel", markUserMoved, { passive: true });
    window.addEventListener("touchmove", markUserMoved, { passive: true });
    window.addEventListener("pointerdown", markUserMoved);
    window.addEventListener("keydown", markUserKey);

    restoreHashOnce();
    const outer = window.requestAnimationFrame(() => {
      if (!shouldStop()) restoreHashOnce();
    });

    whenPrecedingLayoutIsReady(target)
      .then(() => whenDocumentLayoutSettles(target, shouldStop))
      .then(() => {
        if (!shouldStop()) restoreHashOnce();
      });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(outer);
      window.removeEventListener("wheel", markUserMoved);
      window.removeEventListener("touchmove", markUserMoved);
      window.removeEventListener("pointerdown", markUserMoved);
      window.removeEventListener("keydown", markUserKey);
    };
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
