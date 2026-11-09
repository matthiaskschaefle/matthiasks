import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpImmediate, sectionStagger, viewport as motionViewport } from "@/lib/animations";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";
import AnnotatedMockup from "./components/mockups/AnnotatedMockup.jsx";
import Figure from "./components/mockups/Figure.jsx";
import VideoFigure from "./components/mockups/VideoFigure.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import marceloCss from "./styles/marcelo.css?inline";

const CASE_SECTIONS = [
  { id: "brief", label: "brief" },
  { id: "research", label: "research" },
  { id: "what-changed", label: "what changed" },
  { id: "structure", label: "structure" },
  { id: "decisions", label: "decisions" },
  { id: "first-screen", label: "first screen" },
  { id: "quote-flow", label: "quote flow" },
  { id: "references", label: "references" },
  { id: "system", label: "system" },
  { id: "outcome", label: "outcome" },
];

// Four anonymous interviews (research/entrevista-01 to 04 in the project repo).
const INTERVIEWS = [
  { who: "Homeowner, finished house, large lawn", decided: "Price" },
  {
    who: "Public buyer, city square",
    decided: "Public tender, company tax ID (CNPJ), lowest price per m²",
  },
  {
    who: "Professional on a high-end build",
    decided: "Trust over price; deadline tied to move-in",
  },
  {
    who: "Professional on a high-end project, landscaping planned with the architecture",
    decided: "Referral from another construction professional; full scope",
  },
];

// The live routes of the site, and the question each page is there to answer.
const SITE_PAGES = [
  {
    name: "Services",
    route: "/servicos",
    question: "What do they do, and how are price and schedule set?",
  },
  {
    name: "Projects",
    route: "/portfolio",
    question: "Have they done a job like mine?",
    child: { name: "Project detail", route: "five job pages" },
  },
  {
    name: "Company",
    route: "/empresa",
    question: "Can I trust them with this?",
    child: { name: "Formal contact", route: "for public buyers" },
  },
  {
    name: "Quote",
    route: "/orcamento",
    question: "How do I ask, without a long form?",
    child: { name: "WhatsApp message", route: "sent by the client" },
  },
];

const SITE_PATHS = [
  {
    who: "Homeowner",
    steps: ["Home", "Projects", "Quote", "WhatsApp"],
    why: "Sees a comparable job, then sends the size and photos.",
  },
  {
    who: "Professional on a high-end build",
    steps: ["Projects", "Services", "WhatsApp"],
    why: "Checks the finish, then what moves a schedule.",
  },
  {
    who: "Public buyer",
    steps: ["Company", "Formal contact"],
    why: "Checks standing and past public works. Documents follow the formal process.",
  },
];

// Inspiration only; the reference sites stay unnamed.
const REFERENCES = [
  { from: "A lawn care site", took: "Service tiles with job photos, and the quick request card." },
  { from: "A travel site", took: "Photo cards with a caption panel laid over the photo." },
  { from: "A third site", took: "A muted green and calm, restrained type." },
];

const FINDINGS = [
  {
    title: "Everyone asked to see real work",
    text: "All four wanted to see finished jobs. The two on high-end builds asked for more: large comparable jobs, finishing details, before and after. For the homeowner and the public buyer, price still decided.",
    meta: "Seen in 4 of 4",
  },
  {
    title: "Price matters by segment",
    text: "The first hypothesis treated price as the deciding factor. It was, for the large lawn and the public square. On the high-end builds, trust and quality weighed more, and price was a reference before a site visit.",
    meta: "Seen in 4 of 4. Corrected the hypothesis",
  },
  {
    title: "The channel depends on the client",
    text: "The hypothesis assumed WhatsApp was the only channel. It works for homes because it carries the visual brief: photos, size, plans. One interviewee preferred a form, and the public buyer's hire went through a formal process.",
    meta: "Seen in 4 of 4. Corrected the hypothesis",
  },
];

const DECISIONS = [
  {
    finding: "Everyone asked to see real work",
    decision: "Job photos are real, with two real before and after pairs. No stock.",
  },
  {
    finding: "Price weighs differently",
    decision: "No fixed prices. Price per m² as a reference, the final number after a site visit.",
  },
  {
    finding: "Different journeys",
    decision: "Three ways to ask: WhatsApp, a guided form, and a formal route for public buyers.",
  },
  {
    finding: "Trust is portfolio, origin, and reputation",
    decision: "Own team since 1996, sod from a named producer, past public works named.",
  },
  {
    finding: "Full projects, not just selling grass (interview 04)",
    decision: "Services in levels, from planting a lawn to full landscaping.",
  },
  {
    finding: "Deadlines worry builders (interview 03)",
    decision: "The services page explains what moves a schedule, without promising dates.",
  },
];

// Hotspot positions were measured on the live page at 1440 px, the capture
// size, as percentages of the full page (6107 px tall).
const HOME_PROOF_BULLETS = [
  {
    id: 1,
    x: "9.00%",
    y: "14.68%",
    title: "Quick request",
    description: "Three fields open WhatsApp with the request already written.",
  },
  {
    id: 2,
    x: "10.50%",
    y: "17.74%",
    title: "Proof under the hero",
    description: "Since 1996, own team, and where the sod comes from.",
  },
  {
    id: 3,
    x: "10.50%",
    y: "21.24%",
    title: "Public works, named",
    description: "Named with the client's permission. Public buyers check a company's standing.",
  },
];

const HOME_SERVICES_BULLETS = [
  {
    id: 4,
    x: "10.50%",
    y: "42.23%",
    title: "Real job photos",
    description:
      "Each service shows a captioned job photo. The cover is the one labeled exception.",
  },
];

// Services page, 1440 x 4213, cropped to the process and pricing block.
const SERVICES_BULLETS = [
  {
    id: 1,
    x: "10.00%",
    y: "60.80%",
    title: "Schedule after the assessment",
    description: "Builders get the reason, not a promise.",
  },
  {
    id: 2,
    x: "10.00%",
    y: "74.74%",
    title: "Price per m², then a visit",
    description: "The final number waits for the site visit. No price list.",
  },
];

// First-month numbers from Marcelo's own count in WhatsApp.
const HERO_STATS = [
  { value: "4", label: "client interviews" },
  { value: "2", label: "hypotheses the interviews corrected" },
  { value: "8", label: "contacts through the site in its first month" },
  { value: "5", label: "of those contacts became jobs" },
];

const SYSTEM_COUNTS = [
  { value: "29 to 8", label: "text size combinations" },
  { value: "13 to 2", label: "button variants" },
];

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

function PaginationArrow({ direction }) {
  return (
    <span className="case-pagination-arrow">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d={direction === "prev" ? "M15 18l-6-6 6-6" : "M9 18l6-6-6-6"}
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export default function MarceloGramasCase() {
  const prefersReducedMotion = useReducedMotion();
  const [isHeroMobile, setIsHeroMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const { scrollY } = useScroll();
  // Same layered hero as the other cases: text drifts and fades over the film.
  const rawHeroTextY = useTransform(scrollY, [0, 500], [0, 34]);
  const rawBackdropY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroTextFade = useTransform(scrollY, [0, 420], [1, 0]);
  const parallaxDisabled = isHeroMobile || prefersReducedMotion;
  const heroTextStyle = parallaxDisabled ? undefined : { y: rawHeroTextY, opacity: heroTextFade };
  const heroBackdropStyle = parallaxDisabled ? undefined : { y: rawBackdropY };
  useEffect(() => {
    const updateHeroLayout = () => setIsHeroMobile(window.innerWidth < 768);
    updateHeroLayout();
    window.addEventListener("resize", updateHeroLayout);
    return () => window.removeEventListener("resize", updateHeroLayout);
  }, []);

  return (
    <>
      <style>{marceloCss}</style>

      <main id="main" className="page">
        <div className="page-inner">
          <section className="case-hero">
            <motion.div
              className="case-hero-backdrop"
              aria-hidden="true"
              style={heroBackdropStyle}
            />
            <motion.div style={heroTextStyle}>
              <p className="case-label">PAID CLIENT PROJECT, 2026</p>
              <h1 className="case-title-main">
                What clients needed to see before asking for a quote
              </h1>
              <p className="case-subtitle">
                Paid work for Marcelo Gramas, a garden and landscaping company in Minas Gerais,
                Brazil, active since 1996.
              </p>
            </motion.div>

            <figure className="case-film">
              <PlayOnceVideo
                className="case-film-frame"
                sources={[{ src: "/media/marcelo-film.mp4", type: "video/mp4" }]}
                poster="/media/marcelo-film-poster.jpg"
                alt="Marcelo Gramas case film: the interviews, the live site, the proof on the homepage, the quote form, and the first month's numbers"
                threshold={1}
                requireScroll
                controls
                reducedMotion="player"
                tracks={[{ src: "/media/marcelo-film.en.vtt", srcLang: "en", label: "English" }]}
              />
              <figcaption className="case-film-caption">
                The case in 32 seconds, from the interviews to the first month. Silent, all text on
                screen.
              </figcaption>
            </figure>

            <motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
              Research, information architecture, visual identity, design system, and UI, 2026. The
              cover image is a labeled AI visualization.
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
                  The company had no website. New work came through referrals and Instagram, and the
                  people who hire it decide in different ways: on price, on a public tender, or on
                  trust.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">My role</div>
                <p className="in-short-text">
                  I led the design end to end: four interviews, synthesis, information architecture,
                  visual identity and logo, design system, and UI. AI coding agents wrote the code;
                  I set the requirements and judged every result in the browser.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">Result</div>
                <p className="in-short-text">
                  Live at marcelogramas.com.br since October 14, 2026. Eight contacts came through
                  the site in its first month, and five became jobs.
                </p>
              </div>
            </div>

            <CaseContents sections={CASE_SECTIONS} />
          </section>

          <div className="case-layout">
            <div className="case-content-column">
              <Section id="brief" label="The brief" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    A family company with thirty years of work and no website
                  </h3>
                  <p>
                    The company plants lawns, builds gardens, and does full landscaping with its own
                    team.
                  </p>
                  <p>
                    Some referrals went straight to WhatsApp, with no place to see the work first.
                    City buyers follow another path altogether: a public tender (a{" "}
                    <em lang="pt-BR">licitação</em>).
                  </p>
                  <p>
                    Two constraints came with the photos: every real shot of the work was vertical,
                    taken on a phone, and none showed a garden after it had grown in.
                  </p>
                </div>
              </Section>

              <Section id="research" label="Research" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Hypothesis first, then four interviews</h3>
                  <p>
                    I started from AI-drafted personas and scenarios, marked as hypotheses to test,
                    not research. Then I interviewed four people who had hired this kind of service.
                    The interviews stay anonymous.
                  </p>
                </div>

                <div className="research-full">
                  <table className="mg-table">
                    <caption className="ms-visually-hidden">
                      The four interviews: who they were and what decided the hire
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Who</th>
                        <th scope="col">What decided</th>
                      </tr>
                    </thead>
                    <tbody>
                      {INTERVIEWS.map((row, index) => (
                        <tr key={row.who}>
                          <td className="mg-table-index">0{index + 1}</td>
                          <td>{row.who}</td>
                          <td>{row.decided}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <p>
                    Four interviews are enough to see the main patterns repeat, not enough to
                    generalize. Rural clients were not interviewed, so anything about them stays an
                    assumption.
                  </p>
                </div>
              </Section>

              <Section
                id="what-changed"
                label="What changed"
                prefersReducedMotion={prefersReducedMotion}
              >
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    The interviews corrected two of my assumptions
                  </h3>
                  <ol className="mg-findings">
                    {FINDINGS.map((finding) => (
                      <li key={finding.title}>
                        <h4>{finding.title}</h4>
                        <p>{finding.text}</p>
                        <p className="mg-findings-meta">{finding.meta}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </Section>

              <Section id="structure" label="Structure" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    A short home, and one page for each kind of doubt
                  </h3>
                  <p>
                    Three kinds of buyer decide in three different ways, so one funnel could not
                    serve them. The home stays short and routes people. The depth lives in four
                    pages, each built around one question.
                  </p>
                </div>

                <div className="research-full">
                  <div className="mg-sitemap">
                    <p className="mg-sitemap-root">
                      <strong>Home</strong>
                      <span>Who are they, and what have they done?</span>
                    </p>
                    <ul className="mg-sitemap-pages">
                      {SITE_PAGES.map((page) => (
                        <li key={page.name}>
                          <h4>{page.name}</h4>
                          <p className="mg-sitemap-route">{page.route}</p>
                          <p>{page.question}</p>
                          {page.child ? (
                            <p className="mg-sitemap-child">
                              <strong>{page.child.name}</strong>
                              <span className="mg-sitemap-route">{page.child.route}</span>
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="research-full">
                  <table className="mg-table mg-table--paths">
                    <caption className="ms-visually-hidden">
                      The path each kind of buyer is meant to take through the site
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Who</th>
                        <th scope="col">Intended path</th>
                        <th scope="col">Why</th>
                      </tr>
                    </thead>
                    <tbody>
                      {SITE_PATHS.map((row) => (
                        <tr key={row.who}>
                          <td>{row.who}</td>
                          <td>
                            <ol className="mg-path">
                              {row.steps.map((step) => (
                                <li key={step}>{step}</li>
                              ))}
                            </ol>
                          </td>
                          <td>{row.why}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <p>
                    These paths are the design intent and have not been tested yet. Left out on
                    purpose: a blog, a page per service, a separate grass guide (now a section of
                    Services), and a tender page (covered by Company, since the site cannot replace
                    a public tender).
                  </p>
                </div>
              </Section>

              <Section id="decisions" label="Decisions" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Every decision points back to a finding</h3>
                </div>

                <div className="research-full">
                  <table className="mg-table mg-table--decisions">
                    <caption className="ms-visually-hidden">
                      Each research finding and the design decision it led to
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Finding</th>
                        <th scope="col">Decision on the site</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DECISIONS.map((row) => (
                        <tr key={row.finding}>
                          <td>{row.finding}</td>
                          <td>{row.decision}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <h3 className="case-subsection-title">The homepage</h3>
                  <p>The site is in Portuguese; the notes translate what each part does.</p>
                </div>
                <div className="research-full">
                  <AnnotatedMockup
                    src="/assets/portfolio/2026/10/marcelo-gramas/home-full.webp"
                    alt="The homepage, cropped to the quick request form and the proof row, annotated with three decisions"
                    width="1440"
                    height="6107"
                    bullets={HOME_PROOF_BULLETS}
                    mapId="marcelo-home-proof"
                    crop={{ start: 0.125, span: 0.113 }}
                    observe="The homepage under the hero: the quick request and the proof row."
                  />
                </div>
                <div className="research-full">
                  <AnnotatedMockup
                    src="/assets/portfolio/2026/10/marcelo-gramas/home-full.webp"
                    alt="The homepage, cropped to the services block with real job photos, annotated with one decision"
                    width="1440"
                    height="6107"
                    bullets={HOME_SERVICES_BULLETS}
                    mapId="marcelo-home-services"
                    crop={{ start: 0.37, span: 0.087 }}
                    observe="The homepage: services, each with a real job photo."
                  />
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <h3 className="case-subsection-title">Before and after</h3>
                </div>
                <div className="research-full">
                  <div className="mg-pair mg-pair--photos">
                    <Figure
                      src="/assets/portfolio/2026/10/marcelo-gramas/backyard-before.webp"
                      alt="A walled backyard of bare packed earth, before the work"
                      zoom
                      caption={{ kicker: "Before", text: "Bare packed earth." }}
                    />
                    <Figure
                      src="/assets/portfolio/2026/10/marcelo-gramas/backyard-after.webp"
                      alt="The same walled backyard covered in sod, after the work"
                      zoom
                      caption={{ kicker: "After", text: "Sod laid wall to wall." }}
                    />
                  </div>
                  <p className="case-gallery-hint">
                    Real photos from the team&apos;s own record, taken from different angles. The
                    site says so under the pair.
                  </p>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <h3 className="case-subsection-title">Price and schedule</h3>
                </div>
                <div className="research-full">
                  <AnnotatedMockup
                    src="/assets/portfolio/2026/10/marcelo-gramas/services-full.webp"
                    alt="The services page, cropped to the process and pricing block, annotated with two decisions"
                    width="1440"
                    height="4213"
                    bullets={SERVICES_BULLETS}
                    mapId="marcelo-services"
                    crop={{ start: 0.584, span: 0.19 }}
                    observe="The services page: how the schedule and the price are set."
                  />
                </div>
              </Section>

              <Section
                id="first-screen"
                label="First screen"
                prefersReducedMotion={prefersReducedMotion}
              >
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    Three directions for the first screen, two thrown away
                  </h3>
                  <p>
                    Everyone asked to see real work, so the first image carried the most weight. A
                    real photo alone could not do it: every shot was vertical and went soft when
                    cropped wide.
                  </p>
                  <ul>
                    <li>
                      <strong>A 3D garden, rotating with the scroll.</strong> Built, integrated, and
                      reverted on review. The lawn read flat, the house came out as a narrow tower,
                      and the palm took over the scene.
                    </li>
                    <li>
                      <strong>An idealized landscape.</strong> The most attractive so far. A design
                      critique ranked it the top problem: it showed the scale of a park, not his
                      work, and made the real photos after it look like a smaller promise.
                    </li>
                    <li>
                      <strong>One of his real jobs, grown in.</strong> The base is a job of his. The
                      grown palm, the planting, and the clean site are illustrated, so it is a
                      visualization, not a record.
                    </li>
                  </ul>
                </div>

                <div className="research-full">
                  <div className="mg-trio">
                    <Figure
                      src="/assets/portfolio/2026/10/marcelo-gramas/hero-3d-rejected.webp"
                      alt="The rejected 3D garden diorama: a flat lawn disc, a narrow house fragment, and a large palm"
                      zoom
                      caption={{ kicker: "Rejected", text: "3D garden, early September." }}
                    />
                    <Figure
                      src="/assets/portfolio/2026/10/marcelo-gramas/hero-landscape-rejected.webp"
                      alt="The rejected idealized landscape, generated with AI: rolling hills, a winding stone path, and large planted beds, not a job of the company"
                      zoom
                      caption={{ kicker: "Rejected", text: "Idealized landscape, late September." }}
                    />
                    <Figure
                      src="/assets/portfolio/2026/10/marcelo-gramas/home-desktop.webp"
                      alt="The shipped homepage hero, an AI visualization made from a real job photo"
                      zoom
                      caption={{ kicker: "Shipped", text: "Built on his real job, October." }}
                    />
                  </div>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <p>
                    The trade-off: the image that opens the site is the one image that is not a
                    photo, so it says what it is. The footer and alt text call it an AI
                    visualization, and Marcelo approved it knowing that. The footer also says job
                    photos were adjusted with AI, for light and color only.
                  </p>
                </div>
              </Section>

              <Section
                id="quote-flow"
                label="Quote flow"
                prefersReducedMotion={prefersReducedMotion}
              >
                <div className="case-section-body">
                  <h3 className="case-subsection-title">A form that writes the WhatsApp message</h3>
                  <p>
                    Five questions, and only the first two are required: the type of project and the
                    place. The last step shows the message before anything leaves the page.
                  </p>
                  <p>
                    The client sends the message from their own WhatsApp or copies it. Both phone
                    numbers stay visible for those who prefer a call. Nothing is stored.
                  </p>
                  <p>
                    The trade-off: the site itself cannot count requests. Its messages do say they
                    came from the site, so Marcelo counts them in WhatsApp.
                  </p>
                </div>

                <div className="research-full">
                  <VideoFigure
                    className="mg-video"
                    src="/media/marcelo-quote-flow.webm"
                    poster="/media/marcelo-quote-poster.webp"
                    ratio="390 / 844"
                    label="The quote form on a phone: five questions, then the written WhatsApp message to review"
                    caption={{
                      text: "Recorded on the live site. The last step shows the message; nothing was sent.",
                    }}
                  />
                </div>
              </Section>

              <Section
                id="references"
                label="References"
                prefersReducedMotion={prefersReducedMotion}
              >
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    What I took from the references, and what I refused
                  </h3>
                </div>

                <div className="research-full">
                  <table className="mg-table mg-table--decisions">
                    <caption className="ms-visually-hidden">
                      The three sites used as inspiration and what the site took from each
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Inspiration</th>
                        <th scope="col">What the site took</th>
                      </tr>
                    </thead>
                    <tbody>
                      {REFERENCES.map((row) => (
                        <tr key={row.from}>
                          <td>{row.from}</td>
                          <td>{row.took}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <p>
                    Text, photos, and brand were always this company&apos;s own. Later rounds also
                    removed some of what the inspiration brought: rounded frames, pill buttons, and
                    3D objects.
                  </p>
                  <p>
                    I refused what these sites use to build trust: star ratings, client counts,
                    success percentages, testimonials, and brand logos. Nothing like that had been
                    measured or collected here. The same space holds facts a client can check: since
                    1996, own team, a named sod producer, and named public works.
                  </p>
                </div>
              </Section>

              <Section id="system" label="System" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">One token set, in code and in Figma</h3>
                  <p>
                    Mata Nobre is the palette: deep green for actions, charcoal for text, ivory for
                    the ground, and wood brown for earth.
                  </p>

                  <p>
                    A design critique round consolidated the interface. The counts were measured on
                    the built pages, not estimated:
                  </p>
                  <dl className="mg-counts">
                    {SYSTEM_COUNTS.map((count) => (
                      <div key={count.label}>
                        <dt>{count.label}</dt>
                        <dd>{count.value}</dd>
                      </div>
                    ))}
                  </dl>
                  <p>
                    The same round found a closing button green on green, at 1.6:1 against its
                    background, which became ivory. FAQ rows carried a chevron and looked clickable
                    but did nothing, so they became plain rows.
                  </p>
                  <p>
                    The tokens are exported to JSON, and a test fails if the code and the export
                    diverge. The Figma variables carry the same names as the CSS tokens.
                  </p>
                </div>

                <div className="research-full">
                  <Figure
                    src="/assets/portfolio/2026/10/marcelo-gramas/design-system.webp"
                    alt="The living design system page: Mata Nobre palette with token names, buttons, and the chevron cut from the logo"
                    zoom
                    caption={{
                      text: "The design system page renders the site's own components, so the documentation cannot drift from the code.",
                    }}
                  />
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <h3 className="case-subsection-title">Accessibility</h3>
                  <p>
                    Labels tied to every field, a skip link, a main landmark, a menu that closes on
                    Escape and returns focus, 44 px text targets, and reduced motion respected. AA
                    contrast was measured on every solid background.
                  </p>
                  <p>
                    Text over the cover was measured pixel by pixel on the live site, at 1440 and
                    390 px: 8.4:1 at worst for the headline, 4.9:1 for the line under it. The small
                    labels on the before and after photos still need that check, and there has been
                    no screen reader audit yet.
                  </p>
                </div>
              </Section>

              <CaseBackToContents />
              <Section id="outcome" label="Outcome" prefersReducedMotion={prefersReducedMotion}>
                <div className="case-section-body">
                  <p>
                    The site went live on October 14, 2026, on the client&apos;s own domain, and
                    Google indexed its pages within the first week.
                  </p>
                  <p>
                    In its first month, eight people got in touch through the site, and five of them
                    became jobs, by Marcelo&apos;s count in WhatsApp. The company had no site
                    before, so there is no earlier number to compare with, and the site has no
                    analytics by design.
                  </p>
                  <figure className="mg-quote">
                    <blockquote>
                      <p>
                        I want to thank you for the excellent work you did on my company&apos;s
                        website! I was very satisfied with the result and with your professionalism.
                        You can be sure I will recommend your work to others who need this service.
                      </p>
                    </blockquote>
                    <figcaption>
                      Marcelo, owner of Marcelo Gramas, in a WhatsApp message. Translated from
                      Portuguese.
                    </figcaption>
                  </figure>
                  <h3 className="case-subsection-title">How it was built</h3>
                  <p>
                    I designed the logo in Figma. AI coding agents wrote all of the code; I wrote
                    the requirements and judged every result in the browser. Code review was light:
                    a pass by me and one by a second agent.
                  </p>
                  <h3 className="case-subsection-title">What I would do next</h3>
                  <ul>
                    <li>
                      Track which page each request starts from: the message already differs on the
                      projects and services pages.
                    </li>
                    <li>Test the quote form with people who are about to hire this service.</li>
                    <li>Interview new clients after the first months.</li>
                    <li>Test the three intended paths with people from each group.</li>
                  </ul>
                  <p>
                    <a
                      className="mg-live-link"
                      href="https://marcelogramas.com.br"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit marcelogramas.com.br
                      <span className="ms-visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
              </Section>

              <CaseBackToContents />

              <section className="case-pagination" aria-label="Next and previous case">
                <div className="case-pagination-inner">
                  <Link to="/duopet" className="case-pagination-card case-pagination-prev">
                    <div className="case-pagination-label">Previous case</div>
                    <div className="case-pagination-title">
                      <PaginationArrow direction="prev" />
                      DuoPet
                    </div>
                    <div className="case-pagination-desc">
                      Making veterinary appointment scheduling stress-free.
                    </div>
                  </Link>
                  <Link to="/delivery" className="case-pagination-card case-pagination-next">
                    <div className="case-pagination-label">Next case</div>
                    <div className="case-pagination-title">
                      The New Delivery Experience
                      <PaginationArrow direction="next" />
                    </div>
                    <div className="case-pagination-desc">
                      Redesigning the delivery confirmation flow for drivers.
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
