import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

function hashId(hash) {
  if (!hash || hash === "#") return null;
  try {
    return decodeURIComponent(hash.slice(1)) || null;
  } catch {
    return null;
  }
}

function focusSection(id) {
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  el.scrollIntoView({ block: "start" });
  const label = el.querySelector(".case-section-label, h2") || el;
  if (!label.hasAttribute("tabindex")) label.setAttribute("tabindex", "-1");
  label.focus({ preventScroll: true });
}

/**
 * Second reading layer of a case. The short version (hero, summary, film,
 * outcome) is always on the page; research, process and decisions sit behind
 * one button so a recruiter can decide in a minute and a design lead can
 * still read everything.
 *
 * A link from "In this case" (or a shared URL) that points inside opens it
 * and jumps to that section.
 */
export default function FullProcess({ ids, minutes, topics, children }) {
  const location = useLocation();
  const panelId = useId();
  const [openedByButton, setOpenedByButton] = useState(false);
  const linkedId = hashId(location.hash);
  const linkedInside = ids.includes(linkedId);
  const open = openedByButton || linkedInside;
  const focusFirstRef = useRef(false);

  // A link into the process opens it; jump there once it has rendered.
  useEffect(() => {
    if (!linkedInside) return undefined;
    const frame = window.requestAnimationFrame(() => focusSection(linkedId));
    return () => window.cancelAnimationFrame(frame);
  }, [linkedInside, linkedId, location.key]);

  // Opened with the button: move focus to the first section heading.
  useEffect(() => {
    if (!openedByButton || !focusFirstRef.current) return undefined;
    focusFirstRef.current = false;
    const frame = window.requestAnimationFrame(() => focusSection(ids[0]));
    return () => window.cancelAnimationFrame(frame);
  }, [openedByButton, ids]);

  function openProcess() {
    focusFirstRef.current = true;
    setOpenedByButton(true);
  }

  return (
    <>
      {!open && (
        <div className="full-process-gate">
          <p className="full-process-note">
            That is the short version. The full process covers {topics}, about {minutes} minutes of
            reading.
          </p>
          <button
            type="button"
            className="btn btn--primary btn--md full-process-button"
            aria-expanded="false"
            aria-controls={panelId}
            onClick={openProcess}
          >
            Read the full process
          </button>
        </div>
      )}
      <div id={panelId} hidden={!open}>
        {open ? children : null}
      </div>
    </>
  );
}
