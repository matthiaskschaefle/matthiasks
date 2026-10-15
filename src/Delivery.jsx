import { useEffect } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  fadeIn,
  fadeScale,
  fadeUp,
  fadeUpImmediate,
  gridStagger,
  sectionStagger,
  viewport as motionViewport,
} from "@/lib/animations";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import BeforeAfter from "./components/mockups/BeforeAfter.jsx";
import CountUp from "./components/CountUp.jsx";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import PlayOnceVideo from "./components/PlayOnceVideo.jsx";
import deliveryCss from "./styles/delivery.css?inline";

/**
 * Entregas Case Study: v2.0 (EN): DE market structure
 * UX for a delivery app: Full portfolio pattern
 * Accent: var(--brand-500) (mint)
 */

const CASE_SECTION_IDS = [
  "overview",
  "my-role",
  "research",
  "insights",
  "process",
  "solutions",
  "kpis",
  "reflections",
];

/* ── Asset URLs ── */
const HERO_IMG = "/assets/portfolio/2026/03/Mockup-Hero-scaled.png";

function NumberCard({ icon, title, description }) {
  return (
    <motion.article className="research-card" variants={fadeUp}>
      {icon ? <div className="research-icon">{icon}</div> : null}
      <h4 className="research-title">{title}</h4>
      <p className="research-text">{description}</p>
    </motion.article>
  );
}

// ─── Quote band: full-column dark moment for the driver quotes ───────────────
function QuoteBand({ quotes }) {
  return (
    <motion.div className="quote-band" variants={fadeScale}>
      <span className="quote-band-ghost" aria-hidden="true">
        &ldquo;
      </span>
      <motion.div className="quote-band-grid" variants={gridStagger}>
        {quotes.map((q) => (
          <motion.figure className="quote-band-item" variants={fadeUp} key={q.author}>
            <blockquote className="quote-band-text">{q.text}</blockquote>
            <figcaption className="quote-band-author">{q.author}</figcaption>
          </motion.figure>
        ))}
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
MAIN COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function DeliveryCase() {
  const prefersReducedMotion = useReducedMotion();
  const childUpV = prefersReducedMotion ? fadeIn : fadeUp;

  useEffect(() => {
    function updateMobile() {
      if (window.innerWidth < 900) document.body.classList.add("is-mobile");
      else document.body.classList.remove("is-mobile");
    }
    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => {
      window.removeEventListener("resize", updateMobile);
      document.body.classList.remove("is-mobile");
    };
  }, []);

  return (
    <>
      <style>{deliveryCss}</style>

      {/* ── MAIN ── */}
      <main id="main" className="page">
        <div className="page-inner">
          {/* ── HERO ── */}
          <section className="case-hero">
            <div className="case-hero-backdrop" aria-hidden="true" />
            <p className="case-eyebrow">CASE STUDY / DELIVERY</p>
            <h1 className="case-title-main">The New Delivery Experience</h1>
            <p className="case-engagement">
              Paid freelance client project via Vulpes Studio, 2025. A regional delivery company in
              Brazil.
            </p>
            <p className="case-subtitle">
              We redesigned the confirmation flow inside the screens drivers already used.
            </p>

            <figure className="case-film">
              <PlayOnceVideo
                className="case-film-frame"
                sources={[{ src: "/media/delivery-full-web.mp4", type: "video/mp4" }]}
                poster="/media/delivery-poster.jpg"
                alt="Delivery case film: the disputes, the field research, the redesigned confirmation flow and the pilot numbers"
                threshold={1}
                requireScroll
                controls
                reducedMotion="player"
                tracks={[
                  { src: "/media/delivery-full-web.en.vtt", srcLang: "en", label: "English" },
                ]}
              />
              <figcaption className="case-film-caption">
                The case in 49 seconds, from the disputes to the pilot numbers. Silent, all text on
                screen.
              </figcaption>
            </figure>

            <motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
              Two designers with the client&apos;s operations lead. Research and UI, 2025.
            </motion.p>

            <div className="in-short">
              <div className="in-short-item">
                <div className="in-short-label">Problem</div>
                <p className="in-short-text">
                  Paid deliveries were disputed, and the records were too thin to settle the claim.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">My role</div>
                <p className="in-short-text">
                  I led the field sessions and designed the receiver confirmation flow.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">Results</div>
                <p className="in-short-text">
                  7 to 8 seconds faster per stop, 2 fewer taps, and record compliance from 92% to
                  98%. 12-driver, 3-week pilot.
                </p>
              </div>
            </div>

            <CaseContents
              sections={CASE_SECTION_IDS.map((id) => ({
                id,
                label: id === "my-role" ? "my role" : id === "kpis" ? "results" : id,
              }))}
            />
          </section>

          {/* ── PINNED STORY: the case in four scroll steps ── */}
          <PinnedStory
            steps={[
              {
                id: "context",
                label: "The product",
                title: "A last-mile app at 80 to 130 stops a day",
                body: "Partner drivers finish each stop in it: confirm delivery, register who received the package, and submit photo proof. The records it produced were not strong enough.",
                img: HERO_IMG,
                alt: "Delivery app mockups",
              },
              {
                id: "field",
                label: "Field research",
                title: "I led two days on active routes",
                body: "Five drivers, before the redesign and separate from the later 12-driver pilot. We watched the app at the door without interrupting, then debriefed after each route.",
                img: "/assets/portfolio/2026/04/IMG-20260328-WA0013.jpg",
                alt: "Field observation during a driver route",
              },
              {
                id: "insight",
                label: "The principle",
                title: "Confirmation should replace entry",
                body: "Names and document numbers were already in the system. Drivers were still typing them. The interface was asking people to do work the app could do.",
                img: "/assets/portfolio/2026/03/Mockup-02-Receiver-Modal.png",
                alt: "Wireframe of the receiver modal",
              },
              {
                id: "solution",
                label: "The three changes",
                title: "Same screens, less work at the door",
                body: "Auto-filled confirmation data, structured receiver options, and photo feedback at capture. No new screens and no retraining.",
                img: "/assets/portfolio/2026/04/Mockup-02-Modal.png",
                alt: "Final receiver modal UI",
              },
            ]}
          />

          {/* ── LAYOUT: TOC + CONTENT ── */}
          <div className="case-layout">
            <div className="case-content-column">
              {/* ══ OVERVIEW ══ */}
              <motion.section
                id="overview"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Overview
                </TypedSectionLabel>
                <div className="case-section-body">
                  <p className="case-disclaimer">
                    App name and visual identity have been altered to comply with a non-disclosure
                    agreement.
                  </p>
                  <p>
                    The confirmation flow cost time and left records that could not settle Proof Not
                    Received (PNR) disputes. The brief: close those gaps without new screens or
                    retraining.
                  </p>
                </div>
                <div className="context-card">
                  <span className="context-card-label">Context</span>
                  <div className="context-card-grid">
                    <div className="context-card-item">
                      <div className="context-card-number">80 to 130</div>
                      <div className="context-card-unit">Stops per day</div>
                      <div className="context-card-context">per driver, per route</div>
                    </div>
                    <div className="context-card-item">
                      <div className="context-card-number">7 to 8s</div>
                      <div className="context-card-unit">Faster per stop</div>
                      <div className="context-card-context">12-driver, 3-week pilot</div>
                    </div>
                    <div className="context-card-item">
                      <div className="context-card-number">
                        <CountUp value={92} suffix="%" />
                      </div>
                      <div className="context-card-unit">Record compliance</div>
                      <div className="context-card-context">before the redesign</div>
                    </div>
                  </div>
                </div>
              </motion.section>

              {/* ══ MY ROLE ══ */}
              <motion.section
                id="my-role"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  My Role
                </TypedSectionLabel>
                <div className="case-section-body">
                  <p>
                    I led the field sessions and the receiver confirmation flow, with one other
                    designer and the client&apos;s operations lead. No dedicated researcher.
                    Constraints: no new screens, no retraining, about three weeks from first field
                    session to handoff.
                  </p>
                </div>
                <div className="research-full">
                  <div className="research-grid research-grid--two">
                    <NumberCard
                      icon={
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <path d="M12 20h9" />
                          <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                        </svg>
                      }
                      title="What I owned"
                      description="Field observations, driver interviews, wireframes for confirmation and photo capture, and high-fidelity UI for those flows."
                    />
                    <NumberCard
                      icon={
                        <svg
                          width="28"
                          height="20"
                          viewBox="0 0 28 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                        >
                          <circle cx="10" cy="10" r="7" />
                          <circle cx="18" cy="10" r="7" />
                        </svg>
                      }
                      title="What was shared"
                      description="Research planning, which problems to prioritize, and the final design direction, with the other designer and the operations lead."
                    />
                  </div>
                </div>
              </motion.section>

              {/* ══ RESEARCH ══ */}
              <motion.section
                id="research"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Research
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Two days on the road</h3>
                  <p>
                    Two days with five drivers, before the redesign and separate from the later
                    12-driver pilot. I led the ride-alongs. We watched the app at each stop without
                    directing them, then debriefed after each route.
                  </p>
                  <Figure
                    className="research-field-figure"
                    src="/assets/portfolio/2026/04/IMG-20260328-WA0013.jpg"
                    alt="Package with shipping label and phone during field research"
                    caption={{ text: "Field observation, driver route" }}
                  />
                  <QuoteBand
                    quotes={[
                      {
                        text: "In stores it's almost always a coworker who receives the package, but there's no option for that in the app.",
                        author: "Driver, 1 year of experience",
                      },
                      {
                        text: "If the system already has the ID number, why do I need to type it again?",
                        author: "Driver, 3 years of experience",
                      },
                    ]}
                  />
                </div>
                <div className="research-full">
                  <div className="research-grid research-grid--two">
                    <NumberCard
                      title="Retyping what the system already knew"
                      description="Document numbers, recipient names, recurring notes. Drivers entered data the system already had."
                    />
                    <NumberCard
                      title="No option for how deliveries actually happen"
                      description="In commercial buildings, packages almost always go to a coworker or security guard. The app had no field for that, so drivers used free text."
                    />
                    <NumberCard
                      title="Photos accepted regardless of quality"
                      description="Dark, blurry, or off-angle shots were accepted. Proof of delivery depended on the driver's attention at that moment."
                    />
                    <NumberCard
                      title="PNR disputes with no clear answer"
                      description="When a customer disputed a delivery, the records were often too thin to settle it. The app had not captured enough."
                    />
                  </div>
                </div>
              </motion.section>

              {/* ══ INSIGHTS ══ */}
              <motion.section
                id="insights"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Insights
                </TypedSectionLabel>
                <div className="case-section-body">
                  <p>
                    One principle: confirmation should replace entry. Names and IDs were already in
                    the system. Free text made coworker and doorman records inconsistent. Photo
                    quality had to be caught at capture, while the driver was still at the door.
                  </p>
                </div>
              </motion.section>

              {/* ══ PROCESS ══ */}
              <motion.section
                id="process"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Process
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">
                    Informal wireframe check, not a usability test
                  </h3>
                  <p>
                    We took the wireframes back to drivers. Informal feedback, not a structured
                    usability test. No formal test before rollout.
                  </p>
                  <p>
                    Most of the direction held. One gap: sometimes nobody is home, and packages go
                    to the mailbox, the door, or building security. The receiver modal only covered
                    attended deliveries, so we added a second group for unattended scenarios.
                  </p>
                </div>
                <div className="research-full" style={{ marginTop: 24 }}>
                  <span className="wireframe-grid-label">Wireframes</span>
                  <div className="wireframe-grid">
                    <Figure
                      className="wireframe-glass-item"
                      src="/assets/portfolio/2026/03/Mockup-01-Route-List.png"
                      alt="Wireframe mockup: Route List"
                      caption={{ text: "Route List" }}
                    />
                    <Figure
                      className="wireframe-glass-item"
                      src="/assets/portfolio/2026/03/Mockup-02-Receiver-Modal.png"
                      alt="Wireframe mockup: Order Details"
                      caption={{ text: "Order Details" }}
                    />
                    <Figure
                      className="wireframe-glass-item"
                      src="/assets/portfolio/2026/03/Mockup-03-Confirmation-Form.png"
                      alt="Wireframe mockup: Confirmation Form"
                      caption={{ text: "Confirmation" }}
                    />
                  </div>
                </div>
              </motion.section>

              {/* ══ SOLUTIONS ══ */}
              <motion.section
                id="solutions"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Solutions
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">From field observation to interface</h3>
                  <p>Each change maps to a problem we watched on routes.</p>
                </div>

                {/* ── Considered and discarded ── */}
                <div className="research-full alt-block">
                  <span className="alt-block-label">Considered and discarded</span>
                  <p className="alt-block-intro">
                    Two directions were dropped before the receiver modal below:
                  </p>
                  <div className="alt-grid">
                    <article className="alt-card">
                      <h4 className="alt-card-title">A longer list of receiver-type buttons</h4>
                      <p className="alt-card-text">
                        One button per situation sounded thorough. On 80 to 130 stops a day, every
                        extra option is one more thing to scan at the door. We kept the set short
                        and grouped it around attended and unattended deliveries.
                      </p>
                    </article>
                    <article className="alt-card">
                      <h4 className="alt-card-title">Separate UI and journey per receiver group</h4>
                      <p className="alt-card-text">
                        Separate flows would simplify each case in isolation. They would also break
                        the sequence drivers already knew and collide with no new screens and no
                        retraining. One modal with two labeled groups kept that muscle memory.
                      </p>
                    </article>
                  </div>
                  <p className="alt-block-close">
                    Both calls came back to the same test: does it hold up at the door, on stop 90
                    of a 120-stop route?
                  </p>
                </div>

                {/* ── Pair 01: Confirmation Form ── */}
                <div className="research-full" style={{ marginTop: 32 }}>
                  <BeforeAfter
                    className="delivery-before-after"
                    focus="top"
                    zoom
                    title="Data that shows itself"
                    description="Observation: drivers retyped names and IDs the system already had. Decision: those fields appear from route data, one tap to confirm. Evidence: 7 to 8 seconds faster per stop in the 12-driver, 3-week pilot."
                    caption="Empty name and ID fields before. After: filled from route data. Tap a screen to enlarge. Labels are in Portuguese."
                    before={{
                      src: "/assets/portfolio/2026/04/Mockup-01-Delivery-Proof-Wire.png",
                      alt: "Before: empty receiver name and document fields on the confirmation screen",
                    }}
                    after={{
                      src: "/assets/portfolio/2026/04/Mockup-01-Delivery-Proof.png",
                      alt: "After: receiver name and document number filled from route data",
                    }}
                  />
                </div>

                {/* ── Pair 02: Receiver Modal ── */}
                <div className="research-full" style={{ marginTop: 56 }}>
                  <BeforeAfter
                    className="delivery-before-after"
                    zoom
                    title="Receiver options that match delivery situations"
                    description="Observation: commercial stops often go to a coworker or security, so drivers wrote free text. Decision: a short labeled set, grouped into attended and unattended deliveries, instead of one button per situation. The unattended group came from the informal wireframe check. Evidence: field quotes and that wireframe check. This case does not measure how often each option was used."
                    caption="Wireframe: attended options only. After: two groups, attended and unattended. Tap a screen to enlarge. Labels are in Portuguese."
                    before={{
                      src: "/assets/portfolio/2026/04/Mockup-02-Modal-Wire.png",
                      alt: "Before: wireframe of attended receiver options without an unattended group",
                    }}
                    after={{
                      src: "/assets/portfolio/2026/04/Mockup-02-Modal.png",
                      alt: "After: receiver options grouped into attended and unattended deliveries",
                    }}
                  />
                </div>

                {/* ── Pair 03: Photo Feedback ── */}
                <div className="research-full" style={{ marginTop: 56 }}>
                  <BeforeAfter
                    className="delivery-before-after"
                    focus="bottom"
                    zoom
                    title="Photo feedback before the moment passes"
                    description="Observation: dark, blurry, or off-angle photos were accepted. Decision: the app flags the issue at capture. Evidence: record compliance moved from 92% to 98% in the 12-driver, 3-week pilot. This case does not document how the score was calculated, and does not report a result for each criterion."
                    caption="After: missing photo lines turn red before delivery can finish. Tap a screen to enlarge. Labels are in Portuguese."
                    before={{
                      src: "/assets/portfolio/2026/04/Mockup-03-Proof-of-Delivery-Wire.png",
                      alt: "Before: photo slots with no quality warning",
                    }}
                    after={{
                      src: "/assets/portfolio/2026/04/Mockup-03-Proof-of-Delivery.png",
                      alt: "After: missing photo labels shown in red on the confirmation screen",
                    }}
                  />
                </div>

                {/* ── Prototype CTA ── */}
                <div
                  className="research-full"
                  style={{ marginTop: 56, display: "flex", justifyContent: "center" }}
                >
                  <a
                    className="case-btn"
                    href="https://www.figma.com/proto/9EZDFZqXsv48JWYctCQnvx/ReDesign-Delivery?node-id=16-12&p=f&m=draw&scaling=scale-down&content-scaling=fixed&starting-point-node-id=16%3A12&page-id=0%3A1&t=18dSu0uiezoT5rJm-1"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: "fit-content" }}
                  >
                    <span className="case-btn-icon" aria-hidden="true">
                      <img src="/assets/icons/figma.svg" alt="" width="12" height="18" />
                    </span>
                    <span className="case-btn-label">View prototype</span>
                  </a>
                </div>
              </motion.section>

              {/* ══ KPIs ══ */}
              <CaseBackToContents />
              <motion.section
                id="kpis"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Results
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Measured in the 12-driver pilot</h3>
                  <p>
                    12 drivers, three weeks. 7 to 8 seconds faster per stop, 2 taps removed, and
                    record compliance from 92% to 98%.
                  </p>
                </div>
                <div className="research-full">
                  <div className="kpi-grid kpi-grid--measured">
                    <motion.div className="kpi-card" variants={childUpV}>
                      <div className="kpi-card-value kpi-card-value--range">
                        7 to 8<span className="kpi-card-unit">s</span>
                      </div>
                      <div className="kpi-card-label">faster per stop</div>
                      <p className="kpi-card-desc">
                        From the 12-driver, 3-week pilot. About 12 to 13 minutes across 100 stops is
                        an estimate from that average, not a measured full route.
                      </p>
                    </motion.div>
                    <motion.div className="kpi-card" variants={childUpV}>
                      <div className="kpi-card-value">
                        <CountUp value={2} />
                        <span className="kpi-card-unit"> taps</span>
                      </div>
                      <div className="kpi-card-label">removed per stop</div>
                      <p className="kpi-card-desc">
                        Two taps that used to be required at every stop, in the same 12-driver,
                        3-week pilot.
                      </p>
                    </motion.div>
                    <motion.div className="kpi-card" variants={childUpV}>
                      <div className="kpi-card-value">
                        <CountUp value={98} />
                        <span className="kpi-card-unit">%</span>
                      </div>
                      <div className="kpi-card-label">record compliance</div>
                      <p className="kpi-card-desc">
                        Up from 92% in the 12-driver, 3-week pilot. Completed fields, photos of the
                        package and the residence, and correct photo metadata were among the
                        criteria.
                      </p>
                    </motion.div>
                  </div>
                  <div className="projection-block">
                    <div className="projection-block-label">Projection</div>
                    <p className="projection-block-value">30 to 40% fewer PNR disputes</p>
                    <p className="projection-block-text">
                      A projection based on the pilot, not a measured drop in disputes.
                    </p>
                  </div>
                  <div className="limitations-block">
                    <h3 className="case-subsection-title">Limits of this evidence</h3>
                    <ul className="limitations-list">
                      <li>
                        The 7 to 8 seconds, 2 taps, and 92% to 98% figures are from the 12-driver,
                        3-week pilot, not from the earlier five-driver field research.
                      </li>
                      <li>
                        The scoring method for record compliance is not documented in this case.
                      </li>
                      <li>
                        The pilot was 12 drivers for three weeks, not a full production period.
                      </li>
                      <li>There was no formal usability test before rollout.</li>
                      <li>
                        The pilot does not establish a measured reduction in delivery disputes.
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.section>

              {/* ══ REFLECTIONS ══ */}
              <motion.section
                id="reflections"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Reflections
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Field work first</h3>
                  <p>
                    PNR reports showed a records problem. Riding along showed where it came from.
                  </p>
                  <h3 className="case-subsection-title">What I would do differently</h3>
                  <p>
                    I would protect time for at least one structured usability session before high
                    fidelity. The informal wireframe check caught the unattended-delivery gap, but
                    it was not designed to catch every edge case.
                  </p>
                </div>
              </motion.section>

              <CaseBackToContents />

              {/* ══ PAGINATION ══ */}
              <section className="case-pagination" aria-label="Next and previous case">
                <div className="case-pagination-inner">
                  <Link to="/duopet" className="case-pagination-card case-pagination-prev">
                    <div className="case-pagination-label">Previous case</div>
                    <div className="case-pagination-title">
                      <span className="case-pagination-arrow">
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
                      DuoPet
                    </div>
                    <div className="case-pagination-desc">
                      Making veterinary appointment scheduling stress-free.
                    </div>
                  </Link>
                  <Link to="/doctor" className="case-pagination-card case-pagination-next">
                    <div className="case-pagination-label">Next case</div>
                    <div className="case-pagination-title">
                      The questions patients asked before booking
                      <span className="case-pagination-arrow">
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
                      Patients could not find procedures, prices, or insurance before booking.
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
