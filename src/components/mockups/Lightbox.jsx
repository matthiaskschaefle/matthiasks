import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  fadeIn,
  fadeScale,
  useReducedMotion as getReducedMotion,
} from "@/lib/animations";
import { LightboxContext } from "./lightbox-context.js";
import { getImageDims } from "./imageDims.js";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function LightboxDialog({ content, onClose, closeRef, dialogRef }) {
  const prefersReducedMotion = getReducedMotion();
  const dims = getImageDims(content.src, "Lightbox");

  return (
    <motion.div
      className="ms-lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        className="ms-lightbox__dialog"
        role="dialog"
        aria-modal="true"
        aria-label={content.caption || content.alt}
        variants={prefersReducedMotion ? fadeIn : fadeScale}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          ref={closeRef}
          type="button"
          className="ms-lightbox__close"
          aria-label="Close"
          onClick={onClose}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M3 3l10 10M13 3L3 13"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <img
          className="ms-lightbox__img"
          src={content.src}
          alt={content.alt}
          width={dims?.width}
          height={dims?.height}
          loading="eager"
          decoding="async"
        />
        {content.caption && (
          <p className="ms-lightbox__caption">{content.caption}</p>
        )}
      </motion.div>
    </motion.div>
  );
}

/**
 * LightboxProvider: shared image dialog (APG dialog pattern).
 * Mount ONCE around the routed pages, inside <MotionConfig>:
 *
 *   <MotionConfig reducedMotion="user">
 *     <LightboxProvider>
 *       <BrowserRouter>…</BrowserRouter>
 *     </LightboxProvider>
 *   </MotionConfig>
 *
 * Behavior: portal to document.body, focus trap (Tab/Shift+Tab cycle),
 * initial focus on Close, focus restore on the trigger, Esc closes,
 * click on overlay closes, scroll-lock with scrollbar compensation, and
 * `inert` on #root while open. One image per opening (v1, no prev/next).
 */
export function LightboxProvider({ children }) {
  const [content, setContent] = useState(null);
  const previousFocusRef = useRef(null);
  const closeRef = useRef(null);
  const dialogRef = useRef(null);

  const open = useCallback((next) => {
    previousFocusRef.current = document.activeElement;
    setContent(next);
  }, []);

  const close = useCallback(() => {
    setContent(null);
  }, []);

  // Scroll-lock + scrollbar compensation + inert page root + initial focus.
  useEffect(() => {
    if (!content) return undefined;

    const docEl = document.documentElement;
    const scrollbarWidth = window.innerWidth - docEl.clientWidth;
    const prevOverflow = docEl.style.overflow;
    const prevPaddingRight = docEl.style.paddingRight;
    docEl.style.overflow = "hidden";
    if (scrollbarWidth > 0) docEl.style.paddingRight = `${scrollbarWidth}px`;

    const pageRoot = document.getElementById("root");
    if (pageRoot) pageRoot.inert = true;

    if (closeRef.current) closeRef.current.focus();

    return () => {
      docEl.style.overflow = prevOverflow;
      docEl.style.paddingRight = prevPaddingRight;
      if (pageRoot) pageRoot.inert = false;
      const trigger = previousFocusRef.current;
      previousFocusRef.current = null;
      if (trigger && typeof trigger.focus === "function") trigger.focus();
    };
  }, [content]);

  // Esc closes + focus trap (Tab / Shift+Tab cycle inside the dialog).
  useEffect(() => {
    if (!content) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusables = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusables.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [content, close]);

  const api = useMemo(
    () => ({ open, close, isOpen: content !== null }),
    [open, close, content]
  );

  return (
    <LightboxContext.Provider value={api}>
      {children}
      {createPortal(
        <AnimatePresence>
          {content && (
            <LightboxDialog
              key="ms-lightbox-dialog"
              content={content}
              onClose={close}
              closeRef={closeRef}
              dialogRef={dialogRef}
            />
          )}
        </AnimatePresence>,
        document.body
      )}
    </LightboxContext.Provider>
  );
}
