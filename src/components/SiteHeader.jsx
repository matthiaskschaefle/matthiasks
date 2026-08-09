import { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logoMks from "../assets/logo-mks.svg";

// A URL do PDF vive em src/lib/resumeData.js (RESUME_PDF_URL), junto do
// conteudo do CV. O header e o footer apontam para a pagina /resume, que
// mostra o CV na tela e oferece o download.

/**
 * Floating pill navigation.
 * - Fixed with margin from the edges, 1px border, soft shadow, fully rounded.
 * - Hides on scroll down, reappears on scroll up (js-hide-on-scroll behavior).
 * - Logo left / mono links center / "resume" CTA right (opens the CV PDF).
 *   The nav CTA is intentionally "resume", not a contact pitch: recruiters
 *   need the CV one tap away. Contact lives in the footer.
 */
export default function SiteHeader() {
  useEffect(() => {
    const header = document.querySelector(".js-hide-on-scroll");
    if (!header) return;

    let lastY = window.pageYOffset || document.documentElement.scrollTop || 0;
    const threshold = 4;

    function onScroll() {
      const y = window.pageYOffset || document.documentElement.scrollTop || 0;
      const goingDown = y > lastY + threshold;
      const goingUp = y < lastY - threshold;

      if (y <= 10) {
        header.classList.remove("is-hidden");
      } else if (goingDown) {
        header.classList.add("is-hidden");
      } else if (goingUp) {
        header.classList.remove("is-hidden");
      }

      lastY = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <header className="site-header js-hide-on-scroll">
      <div className="site-header-pill">
        <Link className="site-header-logo" to="/" aria-label="Go to home">
          <img src={logoMks} alt="mks. logo" width="34" height="34" />
        </Link>
        <nav className="site-nav" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? "is-active" : undefined)}>work</NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "is-active" : undefined)}>about</NavLink>
        </nav>
        {/* Vai para a pagina /resume, nao direto para o PDF: la o CV e legivel
            na tela (responsivo e com texto real) e o download fica ao lado. */}
        <NavLink
          className={({ isActive }) =>
            isActive
              ? "btn btn--primary btn--sm site-header-cta is-active"
              : "btn btn--primary btn--sm site-header-cta"
          }
          to="/resume"
        >
          resume
        </NavLink>
      </div>
      </header>
    </>
  );
}
