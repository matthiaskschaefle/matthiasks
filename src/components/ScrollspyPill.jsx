import { useEffect, useState } from "react";

/**
 * Floating scrollspy pill for case pages (brober.xyz pattern).
 * Highlights the active section via scroll position and fades in
 * after the reader leaves the hero.
 *
 * props:
 *  - sections: [{ id, label }]
 *  - offset: px from top used to decide the active section (default 160)
 */
export default function ScrollspyPill({ sections, offset = 160 }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    function update() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      setVisible(y > 420);

      let current = sections[0]?.id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top - offset <= 0) current = id;
      }
      // Short last sections never cross the offset threshold: when the page
      // is scrolled to the end, the last pill must win.
      const doc = document.documentElement;
      if (window.innerHeight + y >= doc.scrollHeight - 8) {
        current = sections[sections.length - 1]?.id;
      }
      setActiveId(current);
    }
    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
        ticking = true;
      }
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections, offset]);

  function handleClick(e, id) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const top = el.getBoundingClientRect().top + window.pageYOffset - 96;
    window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <nav className={`scrollspy${visible ? " is-visible" : ""}`} aria-label="Case sections">
      <div className="scrollspy-pill">
        {sections.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            className={`scrollspy-link${activeId === id ? " is-active" : ""}`}
            aria-current={activeId === id ? "true" : undefined}
            onClick={(e) => handleClick(e, id)}
          >
            {label}
          </a>
        ))}
      </div>
    </nav>
  );
}
