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
    phrase: "Hi! I'm Matthias, UX/UI Designer and Design Engineer",
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
    phrase: "Hi! I'm Matthias and I design in Figma and ship in React",
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
                  UX/UI Designer and Design Engineer in Berlin. I watch how people actually work,
                  design the interface, and build it in React and TypeScript.
                </p>
                <p>
                  Since 2024 I have worked as a freelancer: a delivery app, a doctor&apos;s site, a
                  landscaping company site, and a café brand. In 2026 I also built{" "}
                  <Link to="/mappe">Mappe</Link>, the app I use every day to run my own job search.
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
                  I studied Biological Sciences (Licenciatura, 2019) and taught biology in schools
                  in Minas Gerais from 2020 to 2022. Research taught me to measure before I
                  conclude. Teaching taught me to explain in plain words.
                </p>
                <p>
                  I lived in Munich for an academic exchange at TUM, from late 2014 to early 2016,
                  and moved to Berlin in May 2026. I work in Portuguese and English, and German at
                  B2.
                </p>
              </div>
            </div>

            <div className="about-row">
              <TypedSectionLabel
                className="about-label"
                prefersReducedMotion={shouldReduceMotion}
                standalone
              >
                How I work
              </TypedSectionLabel>
              <div className="about-body">
                <div className="about-highlights">
                  <div>
                    <h3 className="about-highlight-title">Research grounded in real workflows</h3>
                    <div className="about-highlight-text">
                      For <Link to="/delivery">Delivery</Link>, I rode along with drivers who make
                      80 to 130 stops a day. The redesign cut 7 to 8 seconds per stop in the pilot.
                    </div>
                  </div>

                  <div>
                    <h3 className="about-highlight-title">Work that holds up after launch</h3>
                    <div className="about-highlight-text">
                      In its first month, the <Link to="/marcelo-gramas">Marcelo Gramas</Link> site
                      brought eight contacts, and five became jobs. The logo and palette I made for{" "}
                      <Link to="/doctor">Doctor</Link> are still in use.
                    </div>
                  </div>

                  <div>
                    <h3 className="about-highlight-title">Design and code in one hand</h3>
                    <div className="about-highlight-text">
                      <Link to="/mappe">Mappe</Link> runs on a design system with tokens, React,
                      TypeScript, and Supabase, with automated tests on every push. I designed every
                      screen and decided what shipped. The same goes for{" "}
                      <a href="#colophon">this portfolio</a>.
                    </div>
                  </div>

                  <div>
                    <h3 className="about-highlight-title">Brand to the last file</h3>
                    <div className="about-highlight-text">
                      For <Link to="/artesano">Artesano</Link>, a new café, I turned a JPG seal into
                      a logo in four versions, two colors, a type pairing, and a usage guide.
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
                      <li className="about-skill-chip">Usability testing</li>
                      <li className="about-skill-chip">Wireframing</li>
                      <li className="about-skill-chip">Prototyping</li>
                      <li className="about-skill-chip">Design systems</li>
                      <li className="about-skill-chip">Brand identity</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Tools</h3>
                    <ul className="about-skill-list">
                      <li className="about-skill-chip">Figma</li>
                      <li className="about-skill-chip">React</li>
                      <li className="about-skill-chip">TypeScript</li>
                      <li className="about-skill-chip">JavaScript</li>
                      <li className="about-skill-chip">HTML/CSS</li>
                      <li className="about-skill-chip">Vite</li>
                      <li className="about-skill-chip">Supabase</li>
                      <li className="about-skill-chip">framer-motion</li>
                      <li className="about-skill-chip">Tailwind</li>
                      <li className="about-skill-chip">Git and GitHub</li>
                      <li className="about-skill-chip">Claude Code</li>
                      <li className="about-skill-chip">Codex</li>
                      <li className="about-skill-chip">Cursor</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Currently studying</h3>
                    <p className="about-skill-note">
                      AI Software Development with Deutsch für den Beruf at WBS Coding School, until
                      March 2027.
                    </p>
                  </div>
                  <div>
                    <h3 className="about-skill-title">Languages</h3>
                    <ul className="about-skill-list">
                      <li className="about-skill-chip">Portuguese (native)</li>
                      <li className="about-skill-chip">English (fluent)</li>
                      <li className="about-skill-chip">German (B2)</li>
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
                <p>
                  Designed in Figma, built and shipped by me in React and Vite. Type in Mona Sans
                  and Figtree. The source is public on{" "}
                  <a href="https://github.com/matthiaskschaefle/matthiasks">GitHub</a>.
                </p>
                <p>
                  The case films come from a small script I wrote. It opens each product in a
                  headless browser, moves a drawn cursor through the real screens, and cuts the
                  scenes with ffmpeg. Change a screen, run it again, and the film updates.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
