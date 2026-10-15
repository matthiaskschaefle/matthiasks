import { useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import StoryHero from "./components/StoryHero.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import aboutCss from "./styles/about.css?inline";

// Fotos do StoryHero: 1 por quadro. O H1 e estatico; as frases abaixo
// so sincronizam o slideshow de fotos (nao aparecem como titulo).
const FRAMES = [
  {
    img: "/assets/portfolio/2026/07/story-berlin.webp",
    alt: "Matthias by the Spree river in Berlin on a sunny day",
    phrase: "Hi! I'm Matthias and I am a UX/UI Designer",
  },
  {
    img: "/assets/portfolio/2026/07/story-spitz-bridge.webp",
    alt: "Matthias with his German Spitz on a wooden bridge in a park",
    phrase: "Hi! I'm Matthias and I am German and Brazilian",
  },
  {
    img: "/assets/portfolio/2026/07/story-spitz-daisy.webp",
    alt: "Matthias's German Spitz sniffing a daisy in the grass",
    phrase: "Hi! I'm Matthias and I changed careers into UX/UI design",
  },
  {
    img: "/assets/portfolio/2026/07/story-cars.webp",
    alt: "Matthias sitting in front of classic sports cars at an exhibition",
    phrase: "Hi! I'm Matthias and I design in Figma and build in React",
  },
];

export default function AboutPage() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <style>{aboutCss}</style>

      <main id="main" className="page">
        <div className="page-inner">
          <StoryHero frames={FRAMES} heading="About Matthias Schaefle" />

          <section className="about-sections">
            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                About
              </TypedSectionLabel>
              <div className="about-body">
                <p>
                  Freelance UX/UI Designer in Berlin. I work across user research, interaction
                  design, interface design, and selected web builds.
                </p>
                <p>
                  I am looking for a product team in Germany. I live in Berlin and hold German and
                  Brazilian citizenship.
                </p>
              </div>
            </div>

            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                lineBreakAfter="Brazil"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                From Brazil to Berlin
              </TypedSectionLabel>
              <div className="about-body">
                <p>
                  I studied Biological Sciences (Licenciatura, 2019) and taught biology before
                  moving into UX/UI design.
                </p>
                <p>
                  Academic exchange in Munich, late 2014 to early 2016. I work in Portuguese and
                  English. German is at B2, with a telc B1 certificate.
                </p>
              </div>
            </div>

            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                lineBreakAfter="differentiates"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                What differentiates me as a designer
              </TypedSectionLabel>
              <div className="about-body">
                <div className="about-highlights">
                  <div>
                    <h3 className="about-highlight-title">Research grounded in real workflows</h3>
                    <div className="about-highlight-text">
                      For <Link to="/delivery">Delivery</Link>, I observed routes and interviewed
                      couriers. Their working days ran to 80 to 130 stops.
                    </div>
                  </div>

                  <div>
                    <h3 className="about-highlight-title">Visual identity that stayed in use</h3>
                    <div className="about-highlight-text">
                      For <Link to="/doctor">Doctor</Link>, I delivered a WordPress site and the
                      visual identity. The logo and palette remain in use.
                    </div>
                  </div>

                  <div>
                    <h3 className="about-highlight-title">Prototypes close to implementation</h3>
                    <div className="about-highlight-text">
                      I prototype in React and Vite, including{" "}
                      <a href="#colophon">this portfolio</a>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                Skills and tools
              </TypedSectionLabel>
              <div className="about-body">
                <div className="about-skill-groups">
                  <div>
                    <h3 className="about-skill-title">Design practice</h3>
                    <ul className="about-skill-list">
                      <li className="about-skill-chip">User research</li>
                      <li className="about-skill-chip">Interviews</li>
                      <li className="about-skill-chip">Field observation</li>
                      <li className="about-skill-chip">Wireframing</li>
                      <li className="about-skill-chip">Style guides</li>
                      <li className="about-skill-chip">Prototyping</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Tools</h3>
                    <ul className="about-skill-list">
                      <li className="about-skill-chip">Figma</li>
                      <li className="about-skill-chip">Tailwind</li>
                      <li className="about-skill-chip">React</li>
                      <li className="about-skill-chip">Vite</li>
                      <li className="about-skill-chip">framer-motion</li>
                      <li className="about-skill-chip">HTML/CSS</li>
                      <li className="about-skill-chip">JavaScript</li>
                      <li className="about-skill-chip">Git</li>
                      <li className="about-skill-chip">Cursor</li>
                      <li className="about-skill-chip">Codex</li>
                      <li className="about-skill-chip">Claude</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Currently studying</h3>
                    <p className="about-skill-note">
                      Deutsch für den Beruf at WBS Coding School, until November 2026.
                    </p>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Languages</h3>
                    <ul className="about-skill-list">
                      <li className="about-skill-chip">Portuguese (native)</li>
                      <li className="about-skill-chip">English (fluent)</li>
                      <li className="about-skill-chip">German (B2, telc B1 certified)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="about-colophon" id="colophon" aria-labelledby="colophon-heading">
            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                id="colophon-heading"
                lineBreakAfter="site"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                How this site was built
              </TypedSectionLabel>
              <div className="about-body">
                <p>Designed in Figma, built and shipped by me in React and Vite.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
