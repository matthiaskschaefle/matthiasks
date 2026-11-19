import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpImmediate, sectionStagger, viewport as motionViewport } from "@/lib/animations";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import FullProcess from "./components/FullProcess.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";
import Figure from "./components/mockups/Figure.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import marceloCss from "./styles/marcelo.css?inline";

// Mappe uses the shared case layout from the Marcelo Gramas page.
// Every screenshot here shows demo data: the real applications stay private.

const CASE_SECTIONS = [
  { id: "problem", label: "problem" },
  { id: "decisions", label: "decisions" },
  { id: "automation", label: "automation" },
  { id: "system", label: "system" },
  { id: "safety", label: "data and safety" },
  { id: "outcome", label: "outcome" },
];

const HERO_STATS = [
  { value: "1", label: "job search by Claude every day" },
  { value: "3", label: "inbox checks for replies a day" },
  { value: "16", label: "automated tests on every push" },
  { value: "3", label: "places merged into one: tracker, Gmail, folders" },
];

const IMG = "/assets/portfolio/2026/11/mappe";

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

export default function MappeCase() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <>
      <style>{marceloCss}</style>
      <main id="main" className="page">
        <div className="page-inner">
          <section className="case-hero">
            <div>
              <h1 className="case-title-main">The tracker I built for my own job search</h1>
              <p className="case-subtitle">
                Mappe, a personal product from 2026. I am the user, the designer, and the person who
                ships it.
              </p>
            </div>

            <figure className="case-film">
              <PlayOnceVideo
                className="case-film-frame"
                sources={[{ src: "/media/mappe-film.mp4", type: "video/mp4" }]}
                poster="/media/mappe-film-poster.jpg"
                alt="Mappe case film with demo data: a cursor uses the dashboard, snoozes a late follow-up, filters the list, changes a status, and saves a job from the daily search"
                threshold={1}
                requireScroll
                controls
                reducedMotion="player"
                tracks={[{ src: "/media/mappe-film.en.vtt", srcLang: "en", label: "English" }]}
              />
              <figcaption className="case-film-caption">
                The case in 54 seconds, with the product in use. Silent, all text on screen. Every
                screen shows demo data.
              </figcaption>
            </figure>

            <motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
              Product design, UI, design system, and front end, 2026. Interface in Portuguese.
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
                  My applications lived in a tracker file, the replies in Gmail, and the PDFs in
                  folders. Every update meant typing the same data again in three places.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">My role</div>
                <p className="in-short-text">
                  Everything: the flows, the UI, the design system, and the build. AI coding agents
                  wrote most of the code; I set the requirements and checked every result.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">Result</div>
                <p className="in-short-text">
                  One app I open every day. Claude looks for jobs each morning and reads the
                  replies, and I only decide what to do next.
                </p>
              </div>
            </div>

            <CaseContents sections={CASE_SECTIONS} />
          </section>

          <div className="case-layout">
            <div className="case-content-column">
              <FullProcess
                ids={["problem", "decisions", "automation", "system", "safety"]}
                minutes={4}
                topics="the problem, the design decisions, the automation, the design system and how the data stays safe"
              >
                <Section id="problem" label="Problem" prefersReducedMotion={prefersReducedMotion}>
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Three places for one job search</h3>
                    <p>
                      I moved to Berlin in May 2026 and started applying in June. By the autumn I
                      had more than thirty applications, in English and in German, through job
                      boards, company forms, and e-mail.
                    </p>
                    <p>
                      The status of each one lived in a tracker file. The answers arrived in Gmail.
                      Each CV and cover letter sat in its own folder. To know where I stood, I had
                      to look in all three, and I kept losing follow-ups.
                    </p>
                    <p>
                      I was the user, so I did not need interviews to know the pain. I did need
                      discipline: I wrote down what I actually did every morning, and designed for
                      that, not for what a tracker usually has.
                    </p>
                  </div>
                </Section>

                <CaseBackToContents />
                <Section
                  id="decisions"
                  label="Decisions"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Summary first, then the list</h3>
                    <p>
                      The dashboard answers one question before anything else: how many applications
                      are still waiting. The full list comes after. A filter bar sits above it, so I
                      can jump to the ones without a reply.
                    </p>
                    <Figure
                      src={`${IMG}/painel.webp`}
                      alt="The Mappe dashboard with demo data: sent applications, statuses, response time, and two action cards"
                      zoom
                      caption={{ kicker: "Dashboard", text: "Demo data. Interface in Portuguese." }}
                    />
                    <h3 className="case-subsection-title">Status has a word, not only a color</h3>
                    <p>
                      Every status is written out, and time is shown with small bars, so the list
                      still reads in grayscale and for people who do not tell colors apart. A late
                      action carries the word &quot;late&quot;, not just red.
                    </p>
                    <h3 className="case-subsection-title">Resolve it where you see it</h3>
                    <p>
                      A late follow-up shows up as a card with its own buttons: mark as done, snooze
                      for three days, or open. I can clear the morning without opening anything
                      else.
                    </p>
                    <Figure
                      src={`${IMG}/drawer.webp`}
                      alt="The detail sheet of one demo application, with status options, next action and date"
                      zoom
                      caption={{
                        kicker: "One sheet per application",
                        text: "Status, next step, documents, and timeline.",
                      }}
                    />
                  </div>
                </Section>

                <CaseBackToContents />
                <Section
                  id="automation"
                  label="Automation"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">The search comes to me</h3>
                    <p>
                      Every morning a scheduled task runs Claude through the job boards with my
                      rules: UX/UI roles in Berlin, the language each posting asks for, and the
                      filters that ruled me out before. New jobs land in an inbox inside Mappe. I
                      only choose: apply or discard.
                    </p>
                    <p>
                      Three times a day another task reads my inbox for replies from companies and
                      updates the status. A rejection that arrives at night is already in the list
                      the next morning.
                    </p>
                    <Figure
                      src={`${IMG}/vagas.webp`}
                      alt="The jobs tab with demo data: two new jobs with notes, and a button to run the search now"
                      zoom
                      caption={{ kicker: "Jobs", text: "The daily search, with demo data." }}
                    />
                  </div>
                </Section>

                <CaseBackToContents />
                <Section id="system" label="System" prefersReducedMotion={prefersReducedMotion}>
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">
                      A design system that grew from my portfolio
                    </h3>
                    <p>
                      Mappe started with the tokens of this portfolio. An app needs things a
                      portfolio does not, like fields, sheets, and dense lists, so it became its own
                      language: cards on a gray canvas, one indigo for actions, and glass only on
                      the bars that float over content.
                    </p>
                    <p>
                      Colors, type, and spacing only come from tokens, and one file feeds both the
                      code and the documentation. The typefaces Mona Sans and Figtree now run this
                      site too.
                    </p>
                    <Figure
                      src={`${IMG}/mobile.webp`}
                      alt="The Mappe dashboard on a phone, with demo data"
                      zoom
                      caption={{ kicker: "Phone", text: "The same system on a small screen." }}
                    />
                  </div>
                </Section>

                <CaseBackToContents />
                <Section
                  id="safety"
                  label="Data and safety"
                  prefersReducedMotion={prefersReducedMotion}
                >
                  <div className="case-section-body">
                    <h3 className="case-subsection-title">Private by design</h3>
                    <p>
                      Mappe holds names, salaries, and letters, so only my login can read it. Every
                      table has row level security, the PDFs never go into Git, and no secret key
                      reaches the browser.
                    </p>
                    <p>
                      Text from a job posting is treated as data, never as an instruction to the AI.
                      A posting that says &quot;ignore your rules&quot; is just a posting.
                    </p>
                  </div>
                </Section>

                <CaseBackToContents />
              </FullProcess>

              <Section id="outcome" label="Outcome" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <p>
                    Mappe replaced the tracker file in November 2026. I open it every morning, and
                    the follow-ups I used to forget now show up as late cards until I act on them.
                  </p>
                  <h3 className="case-subsection-title">How it was built</h3>
                  <p>
                    React, TypeScript, and Supabase, deployed on Vercel. AI coding agents wrote most
                    of the code; I wrote the requirements, designed every screen, and judged each
                    result in the browser. Sixteen automated tests run on every push.
                  </p>
                </div>
              </Section>

              <CaseBackToContents />

              <section className="case-pagination" aria-label="Next and previous case">
                <div className="case-pagination-inner">
                  <Link to="/duopet" className="case-pagination-card case-pagination-prev">
                    <div className="case-pagination-label">Previous case</div>
                    <div className="case-pagination-title">DuoPet</div>
                    <div className="case-pagination-desc">
                      Making veterinary appointment scheduling stress-free.
                    </div>
                  </Link>
                  <Link to="/marcelo-gramas" className="case-pagination-card case-pagination-next">
                    <div className="case-pagination-label">Next case</div>
                    <div className="case-pagination-title">
                      What clients needed to see before asking for a quote
                    </div>
                    <div className="case-pagination-desc">
                      A landscaping company with 30 years of work and no website.
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
