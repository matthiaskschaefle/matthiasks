import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpImmediate, sectionStagger, viewport as motionViewport } from "@/lib/animations";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import FullProcess from "./components/FullProcess.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";
import Figure from "./components/mockups/Figure.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import marceloCss from "./styles/marcelo.css?inline";

// Brand identity for a café that has not opened yet. The symbol options came
// from an AI image tool and the mockups are AI images: both are said on the page.

const CASE_SECTIONS = [
  { id: "starting-point", label: "starting point" },
  { id: "dropped", label: "what I dropped" },
  { id: "mark", label: "the mark" },
  { id: "system", label: "system" },
  { id: "review", label: "review" },
  { id: "outcome", label: "outcome" },
];

const HERO_STATS = [
  { value: "2", label: "days from the brief to the approved identity" },
  { value: "4", label: "logo files: main, white, black, and symbol" },
  { value: "14", label: "pages in the brand guide" },
  { value: "2", label: "colors, so it prints in one" },
];

const IMG = "/assets/portfolio/2026/10/artesano";

function Section({ id, label, prefersReducedMotion, children }) {
  return (
    <motion.section
      id={id}
      className="case-section"
      variants={sectionStagger}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
    >
      <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>{label}</TypedSectionLabel>
      {children}
    </motion.section>
  );
}

export default function ArtesanoCase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <style>{marceloCss}</style>
      <main id="main" className="page">
        <div className="page-inner">
          <section className="case-hero">
            <div>
              <h1 className="case-title-main">A café logo that only existed as a JPG</h1>
              <p className="case-subtitle">
                Brand identity in 2026 for Artesano Cafeteria, the new café of a bakery in Minas
                Gerais, Brazil. My first logo project.
              </p>
            </div>

            <figure className="case-film">
              <PlayOnceVideo
                className="case-film-frame"
                sources={[{ src: "/media/artesano-film.mp4", type: "video/mp4" }]}
                poster="/media/artesano-film-poster.jpg"
                alt="Artesano case film: the problem with the old logo, the new mark, its three versions, the two colors, the type, and AI mockups of cups and a pie box"
                threshold={1}
                requireScroll
                controls
                reducedMotion="player"
                tracks={[{ src: "/media/artesano-film.en.vtt", srcLang: "en", label: "English" }]}
              />
              <figcaption className="case-film-caption">
                The case in 45 seconds. Silent, all text on screen.
              </figcaption>
            </figure>

            <motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
              Logo, visual identity, and brand guide, October 2026. The café has not opened yet, so
              every application shown is a mockup made with AI.
            </motion.p>

            <dl className="mg-stats">
              {HERO_STATS.map((stat) => (
                <div key={stat.label}>
                  <dt>{stat.label}</dt>
                  <dd>{stat.value}</dd>
                </div>
              ))}
            </dl>

            <div className="in-short">
              <div className="in-short-item">
                <div className="in-short-label">Problem</div>
                <p className="in-short-text">
                  The logo only existed as a JPG: rough edges, a fake transparent background, and
                  wheat that turned into a smudge at small sizes. A print shop could not use it.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">My role</div>
                <p className="in-short-text">
                  I ran the project, generated symbol options with an AI image tool, chose one, and
                  finished the logo, the guide, and the presentation film by hand in Figma.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">Result</div>
                <p className="in-short-text">
                  The client approved the identity the day after the brief, with a 14-page guide and
                  logo files ready for print.
                </p>
              </div>
            </div>

            <CaseContents sections={CASE_SECTIONS} />
          </section>

          <div className="case-layout">
            <div className="case-content-column">
              <FullProcess
                ids={["starting-point", "dropped", "mark", "system", "review"]}
                minutes={4}
                topics="the starting point, the paths I dropped, the new mark, the brand system and the final review"
              >
                <Section
                  id="starting-point"
                  label="Starting point"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Three JPGs, one color, one typeface</h3>
                    <p>
                      A bakery in Minas Gerais was opening a café and asked me to create or improve
                      its logo. The client sent three JPG versions of the old seal, a steaming cup
                      with two wheat stalks, and two rules: the brown of the logo and the typeface
                      Garamond.
                    </p>
                    <p>
                      None of it worked for print. The edges were jagged, the transparent background
                      was a checkerboard drawn inside the image, and the wheat lost its shape below
                      a few centimeters. A vector file that came later looked like an automatic
                      trace of the same JPG.
                    </p>
                    <p>
                      There was no formal research. My references were the old logo, the
                      client&apos;s color and typeface, and the visual languages common in specialty
                      cafés: the editorial wordmark, the arched badge, the stamp for kraft paper,
                      and the monogram.
                    </p>
                  </div>
                </Section>

                <CaseBackToContents />
                <Section
                  id="dropped"
                  label="What I dropped"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Cleaning up was not enough</h3>
                    <p>
                      The first round, done with Claude, redrew the old seal as a clean vector, then
                      rebuilt it with the client&apos;s own symbol. Both were tidier and still
                      looked like the old logo. The café was new, with no history to keep, so I
                      asked for more modern options.
                    </p>
                    <p>
                      Four new directions followed, drawn in code by Claude: wheat steam, editorial,
                      arch, and stamp. I rejected all four. They did not look like real logos.
                      Generating options in an image tool and finishing the chosen one by hand
                      worked better, and that is the path I took.
                    </p>
                  </div>
                </Section>

                <CaseBackToContents />
                <Section id="mark" label="The mark" prefersReducedMotion={prefersReducedMotion}>
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Wheat, a cup, and three arcs</h3>
                    <p>
                      I generated options in the AI image tool Higgsfield from seven prompts, one
                      per direction, written with Claude. I chose the option that kept the idea of
                      the old logo: bakery and coffee in a single symbol. I finished it in Figma and
                      set ARTESANO in the client&apos;s Garamond, converted to outlines so it does
                      not depend on the print shop&apos;s fonts.
                    </p>
                    <div className="case-gallery">
                      <div className="case-gallery-grid">
                        <Figure
                          src={`${IMG}/logo-principal.webp`}
                          alt="The Artesano logo in coffee brown on white: wheat, a steaming cup, arcs, and the name in Garamond"
                          zoom
                          caption={{ kicker: "Main", text: "Brown on a light background." }}
                        />
                        <Figure
                          src={`${IMG}/logo-negativa.webp`}
                          alt="The Artesano logo in white on coffee brown"
                          zoom
                          caption={{ kicker: "Negative", text: "White on coffee brown." }}
                        />
                      </div>
                    </div>
                  </div>
                </Section>

                <CaseBackToContents />
                <Section id="system" label="System" prefersReducedMotion={prefersReducedMotion}>
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Few parts, clear rules</h3>
                    <p>
                      The palette is coffee brown and white. With two colors, the logo prints in
                      one, on a stamp or on kraft paper. The typeface Montserrat carries the word
                      CAFETERIA and short labels, so the serif name stays the star.
                    </p>
                    <p>
                      The guide sets clear space, minimum sizes, and four things never to do:
                      stretch it, redraw it, add effects, or place it on a busy background.
                    </p>
                    <Figure
                      src={`${IMG}/guia-paleta.webp`}
                      alt="Brand guide page: coffee brown #3D2B29 and white"
                      zoom
                      caption={{ kicker: "Brand guide", text: "Two colors. Text in Portuguese." }}
                    />
                    <Figure
                      src={`${IMG}/mockup-copos.webp`}
                      alt="AI mockup of two takeaway cups with the Artesano logo, one white and one brown"
                      zoom
                      caption={{
                        kicker: "Mockup made with AI",
                        text: "The café has not opened; these are illustrations, not real products.",
                      }}
                    />
                  </div>
                </Section>

                <CaseBackToContents />
                <Section id="review" label="Review" prefersReducedMotion={prefersReducedMotion}>
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">What the final check found</h3>
                    <p>
                      Before handing over, a technical review with Claude checked every file: no
                      live text or embedded images in the SVGs, and transparent PNGs at 2048 px. The
                      check also found a real problem. At the 45 mm minimum the guide gives, the
                      letters of CAFETERIA end up about 1 mm tall. That and four production gaps, a
                      short version, a horizontal version, a vector PDF, and a CMYK value tested on
                      paper, went on the list for version 1.1.
                    </p>
                    <h3 className="case-subsection-title">What I would do differently</h3>
                    <p>
                      Agree in the brief whether the job is a clean-up or a new logo. Test small
                      sizes and print early, not at the end. And keep the references while I work,
                      so the research is on record.
                    </p>
                  </div>
                </Section>

                <CaseBackToContents />
              </FullProcess>

              <Section id="outcome" label="Outcome" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <p>
                    The client approved the identity on October 3, 2026, one day after the brief.
                    The delivery had the logo in four versions as SVG and PNG, the brand guide as a
                    PDF with an editable Figma file, a presentation film, and three mockups.
                  </p>
                  <p>
                    The café has not opened yet, so there are no real applications or numbers to
                    show.
                  </p>
                </div>
              </Section>

              <CaseBackToContents />

              <section className="case-pagination" aria-label="Next and previous case">
                <div className="case-pagination-inner">
                  <Link to="/mappe" className="case-pagination-card case-pagination-prev">
                    <div className="case-pagination-label">Previous case</div>
                    <div className="case-pagination-title">
                      <span className="case-pagination-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M15 18l-6-6 6-6"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                      The tracker I built for my own job search
                    </div>
                    <div className="case-pagination-desc">
                      A personal product I designed, built, and use every day.
                    </div>
                  </Link>
                  <Link to="/doctor" className="case-pagination-card case-pagination-next">
                    <div className="case-pagination-label">Next case</div>
                    <div className="case-pagination-title">
                      The questions patients asked before booking
                      <span className="case-pagination-arrow" aria-hidden="true">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M9 18l6-6-6-6"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </div>
                    <div className="case-pagination-desc">
                      A website for a plastic surgeon, built around patient questions.
                    </div>
                  </Link>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
