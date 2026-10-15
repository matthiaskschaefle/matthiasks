import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import {
  fadeUpImmediate,
  floatLoop,
  gridStagger,
  sectionStagger,
  tiltIn,
  viewport as motionViewport,
} from "@/lib/animations";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import Frame from "./components/mockups/Frame.jsx";
import SnapGallery from "./components/mockups/SnapGallery.jsx";
import { HotspotMap, HotspotList } from "./components/mockups/Hotspot.jsx";
import { useLightbox } from "./components/mockups/lightbox-context.js";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";
import doctorCss from "./styles/doctor.css?inline";

/* ---------------------------
ANNOTATED MOCKUP (PINGS)
---------------------------- */

// Image: 1256 x 4071 (current homepage evaluation)

const bulletPoints = [
  {
    id: 1,
    x: "59.60%",
    y: "2.89%",
    title: "Blog section",
    description: "Interviews showed patients use the blog. It stayed on the site.",
  },
  {
    id: 2,
    x: "87.20%",
    y: "16.88%",
    title: "Surgeries list",
    description: "The list of surgeries could be clearer and better structured.",
  },
  {
    id: 3,
    x: "83.00%",
    y: "2.11%",
    title: "FAQ section",
    description: "An FAQ can answer the questions patients asked before booking.",
  },
  {
    id: 4,
    x: "7.24%",
    y: "33.42%",
    title: "Grid system",
    description:
      "A grid system could be implemented, as the current site lacks consistency in layout.",
  },
  {
    id: 5,
    x: "87.20%",
    y: "31.71%",
    title: "Specialization & technique",
    description:
      "The doctor's technique and specialization had little presence, so they were easy to miss.",
  },
  {
    id: 6,
    x: "65.70%",
    y: "38.59%",
    title: "Doctor's page link",
    description:
      "There was no direct link to the doctor page. That page carries credentials patients look for.",
  },
  {
    id: 7,
    x: "13.60%",
    y: "80.60%",
    title: "Typography & blog cards",
    description: "Low contrast type and uneven blog cards made the content harder to scan.",
  },
  {
    id: 8,
    x: "47.70%",
    y: "98.80%",
    placement: "top",
    title: "Clinic address",
    description:
      "The clinic address was missing. Adding it helps people find the place and check that the site is real.",
  },
];

// Segundo mockup: homepage redesenhada

const bulletPointsSecondary = [
  {
    id: 1,
    x: "70.40%",
    y: "49.79%",
    title: "Learn more button",
    description: 'The "learn more" button opens the doctor page and his technique.',
  },
  {
    id: 2,
    x: "11.33%",
    y: "66.18%",
    title: "Popular procedures",
    description: "Popular procedures sit on the homepage with photos, so they are easier to find.",
  },
  {
    id: 3,
    x: "56.48%",
    y: "88.55%",
    title: "Consultation information",
    description:
      "A homepage block points to the first consultation, a step patients asked about in interviews.",
  },
];
const bulletPointsSubpages = [
  {
    id: 1,
    x: "7.50%",
    y: "7.82%",
    title: "Breadcrumbs navigation",
    description: "Breadcrumbs keep the path visible on inner pages.",
  },
  {
    id: 2,
    x: "50.50%",
    y: "65.61%",
    title: "Step-by-step timeline",
    description: "A short timeline walks through the first consultation.",
  },
  // [REVISÃO MATTHIAS] Bullet "Technique explanation" removido deste mapa: na
  // colagem antiga ele apontava para a SEGUNDA página (Conheça o Doutor), que
  // não existe mais no print único da Primeira Consulta. O conteúdo (técnica
  // exclusiva do doutor) vive na página do doutor; se quiser manter essa
  // decisão anotada no case, adicionamos um print anotado daquela página.
  // {
  // id: 3,
  // x: "85.32%",
  // y: "70.21%",
  // title: "Technique explanation",
  // description: "Enhanced explanation of the doctor's unique technique.",
  // },
];

const bulletPointsSubpages2 = [
  {
    id: 1,
    x: "50.00%",
    y: "38.00%",
    title: "FAQ based on research",
    description: "FAQ copy grouped from the research themes, not from a generic template.",
  },
];
const bulletPointsSubpages3 = [
  {
    id: 1,
    x: "50.00%",
    y: "35.00%",
    title: "Categorized surgeries with visuals",
    description: "Surgeries grouped by category, with images, so they are easier to identify.",
  },
];

const bulletPointsSubpages4 = [
  {
    id: 1,
    x: "50.00%",
    y: "60.00%",
    title: "New clinic timeline",
    description: "At the doctor's request, the new clinic appears as a short timeline.",
  },
];
const MOBILE_SCREENS = [
  {
    src: "/assets/portfolio/2025/09/doctor-mobile-01.png",
    alt: "Mobile homepage of the redesigned plastic surgeon website",
  },
  {
    src: "/assets/portfolio/2025/09/doctor-mobile-02.png",
    alt: "Mobile surgeries page with procedures grouped by category",
  },
  {
    src: "/assets/portfolio/2025/09/doctor-mobile-03.png",
    alt: "Mobile first-consultation page with the step-by-step timeline",
  },
  {
    src: "/assets/portfolio/2025/09/doctor-mobile-04.png",
    alt: "Mobile page showing other regions and the new clinic location",
  },
  {
    src: "/assets/portfolio/2025/09/doctor-mobile-05.png",
    alt: "Mobile post-operative care page",
  },
];

// Native style-guide specs. Values are transcribed from the original handoff
// boards so the system stays readable, responsive, and selectable in the case.
const DOCTOR_PALETTE = [
  {
    group: "Primary",
    swatches: [
      { name: "Base", token: "Primary-base", hex: "#092C4C" },
      { name: "Light", token: "Primary-light", hex: "#095399" },
    ],
  },
  {
    group: "Secondary",
    swatches: [
      { name: "Base", token: "Secondary-base", hex: "#CE8000" },
      { name: "Dark", token: "Secondary-dark", hex: "#995F00" },
    ],
  },
  {
    group: "Neutral",
    swatches: [
      { name: "100", token: "Neutral-100", hex: "#4F4F4F" },
      { name: "200", token: "Neutral-200", hex: "#828282" },
      { name: "300", token: "Neutral-300", hex: "#BDBDBD" },
      { name: "400", token: "Neutral-400", hex: "#E0E0E0" },
      { name: "White", token: "White", hex: "#F9F9F9" },
    ],
  },
];

function DoctorSystemPreview() {
  return (
    <div
      className="doctor-system-preview"
      role="img"
      aria-label="Reconstructed portfolio preview of the Doctor header, typography, buttons, form field, and consultation timeline. Not a capture of the live site."
    >
      <div className="doctor-system-topbar" aria-hidden="true">
        <img
          className="doctor-system-mark"
          src="/assets/portfolio/2025/12/helio-logo-horizontal.svg"
          alt=""
          loading="lazy"
          decoding="async"
          width="581"
          height="125"
        />
        <div className="doctor-system-nav">
          <span>Cirurgias</span>
          <span>Sobre</span>
          <span>Blog</span>
        </div>
        <span className="doctor-ui-button doctor-ui-button--primary">Agendar consulta</span>
      </div>
      <div className="doctor-system-canvas" aria-hidden="true">
        <div className="doctor-system-copy">
          <span className="doctor-system-eyebrow">Primeira consulta</span>
          <h4>Informação clara antes da primeira conversa.</h4>
          <p>
            Uma hierarquia calma ajuda pacientes a entender o processo, preparar perguntas e decidir
            o próximo passo.
          </p>
          <div className="doctor-system-actions">
            <span className="doctor-ui-button doctor-ui-button--primary">Agendar consulta</span>
            <span className="doctor-ui-button doctor-ui-button--secondary">Conhecer o doutor</span>
          </div>
          <label className="doctor-ui-field">
            <span>Procedimento de interesse</span>
            <span className="doctor-ui-field-value">Selecione uma opção</span>
          </label>
        </div>
        <div className="doctor-system-panel">
          <span className="doctor-system-panel-label">Como funciona</span>
          <ol>
            <li>
              <span>01</span>
              <strong>Conte sua necessidade</strong>
            </li>
            <li>
              <span>02</span>
              <strong>Converse com a equipe</strong>
            </li>
            <li>
              <span>03</span>
              <strong>Prepare sua consulta</strong>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export function DoctorTypography() {
  return (
    <div className="doctor-type-grid">
      <article className="doctor-type-card doctor-type-card--barlow">
        <div className="doctor-type-head">
          <span className="doctor-type-aa" aria-hidden="true">
            Aa
          </span>
          <div>
            <h4>Barlow</h4>
            <p>Headings and navigation</p>
          </div>
        </div>
        <div className="doctor-type-scale" aria-label="Barlow heading scale">
          <span className="doctor-type-h1">Heading 1</span>
          <span className="doctor-type-h2">Heading 2</span>
          <span className="doctor-type-h3">Heading 3</span>
          <span className="doctor-type-spaced">Heading with space</span>
        </div>
      </article>
      <article className="doctor-type-card doctor-type-card--montserrat">
        <div className="doctor-type-head">
          <span className="doctor-type-aa" aria-hidden="true">
            Aa
          </span>
          <div>
            <h4>Montserrat</h4>
            <p>Body copy and interface text</p>
          </div>
        </div>
        <div className="doctor-type-scale" aria-label="Montserrat body text scale">
          <span className="doctor-type-body-lg">
            <strong>Large text</strong> / Regular
          </span>
          <span className="doctor-type-body-md">
            <strong>Medium text</strong> / Regular
          </span>
          <span className="doctor-type-body-base">
            <strong>Normal text</strong> / Regular
          </span>
          <span className="doctor-type-body-sm">
            <strong>Small text</strong> / Regular
          </span>
        </div>
      </article>
    </div>
  );
}

export function DoctorPalette() {
  return (
    <div className="doctor-palette">
      {DOCTOR_PALETTE.map((group) => (
        <div className="doctor-palette-group" key={group.group}>
          <p className="doctor-palette-label">{group.group}</p>
          <div className="doctor-palette-row">
            {group.swatches.map((swatch) => (
              <div className="doctor-swatch" key={swatch.token}>
                <span
                  className="doctor-swatch-chip"
                  style={{ background: swatch.hex }}
                  aria-hidden="true"
                />
                <span className="doctor-swatch-name">{swatch.name}</span>
                <span className="doctor-swatch-token">{swatch.token}</span>
                <span className="doctor-swatch-hex">{swatch.hex}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

const CASE_SECTIONS = [
  { id: "overview", label: "overview" },
  { id: "research", label: "research" },
  { id: "evaluation", label: "evaluation" },
  { id: "wireframes", label: "wireframes" },
  { id: "ia", label: "ia" },
  { id: "the-mark", label: "the mark" },
  { id: "style-guide", label: "style guide" },
  { id: "the-redesign", label: "redesign" },
  { id: "outcome", label: "outcome" },
];

// A faixa resumida da secao The mark: as cinco decisoes que o cliente
// reconhece. A paleta completa de nove amostras continua no style guide.
const MARK_PALETTE = [
  { hex: "#092C4C" },
  { hex: "#095399" },
  { hex: "#CE8000" },
  { hex: "#E0E0E0" },
  { hex: "#F9F9F9" },
];

// ─── Annotated mockup (hotspot system) ──────────────────────────────────────
// The annotation layer (.annotated-layer) is locked: the
// HotspotMap stays a direct child so the dots keep their legacy percentage
// geometry. The parity HotspotList lives outside the relative container (in
// flow inside the Frame) so it never shifts the dots' containing block.
function AnnotatedMockup({
  src,
  alt,
  width,
  height,
  bullets,
  mapId,
  crop,
  scrollable = false,
  observe,
}) {
  const { open } = useLightbox();
  const start = crop?.start ?? 0;
  const span = crop?.span ?? 1;
  const isCropped = Boolean(crop) && span < 0.99;
  const windowRatio = `${width} / ${Number(height) * span}`;
  const caption = observe || "Full page as designed in this project";

  return (
    <div className="annotated-stage">
      {/* A lista de anotacoes fica FORA do browser frame: dentro dele lia como
    parte da pagina mockada. Fora, vira legenda editorial do artefato. */}
      <div className="ms-annotated">
        <Frame variant="browser">
          <div
            className={`annotated-window${scrollable ? " annotated-scroll" : ""}${isCropped ? " annotated-crop-window" : ""}`}
            style={isCropped ? { aspectRatio: windowRatio } : undefined}
            {...(scrollable
              ? { tabIndex: 0, role: "region", "aria-label": "Scrollable page preview" }
              : {})}
          >
            <div
              className={`annotated-layer${isCropped ? " annotated-crop-inner" : ""}`}
              style={isCropped ? { transform: `translateY(-${start * 100}%)` } : undefined}
            >
              <img
                src={src}
                alt={alt}
                className="annotated-img"
                loading="lazy"
                decoding="async"
                width={width}
                height={height}
              />
              <HotspotMap bullets={bullets} mapId={mapId} />
            </div>
          </div>
        </Frame>
        <p className="annotated-full-access">
          {observe ? <span className="annotated-observe">{observe} </span> : null}
          <button
            type="button"
            className="annotated-full-btn"
            onClick={() => open({ src, alt, caption })}
          >
            View full page
          </button>
          {scrollable
            ? " Scroll the capture, or open the full page."
            : isCropped
              ? " Cropped to the decision. Full page remains available."
              : ""}
        </p>
        <HotspotList bullets={bullets} mapId={mapId} />
      </div>
    </div>
  );
}

export function AnimatedBullets() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/08/doctor-evaluation.webp"
      alt="Current homepage annotated with the eight evaluation findings"
      width="1256"
      height="4071"
      bullets={bulletPoints}
      mapId="evaluation"
      scrollable
      observe="Eight gaps on the previous homepage. Scroll to read every note, or open the full page."
    />
  );
}

function AnimatedBulletsSecondary() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/09/doctor-redesign-home.webp"
      alt="Redesigned homepage annotated with three design decisions"
      width="912"
      height="1940"
      bullets={bulletPointsSecondary}
      mapId="redesign-home"
      crop={{ start: 0.278, span: 0.702 }}
      observe="Delivered homepage: the doctor entry with Learn more, popular procedures, and the first-consultation block."
    />
  );
}

function AnimatedBulletsSubpages() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/09/doctor-consultation.webp"
      alt="Redesigned first-consultation subpage annotated with the design decisions"
      width="1366"
      height="1712"
      bullets={bulletPointsSubpages}
      mapId="consultation"
      crop={{ start: 0, span: 0.87 }}
      observe="Delivered first-consultation page: breadcrumbs at the top and the visit timeline further down."
    />
  );
}

function AnimatedBulletsSubpages2() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/09/doctor-faq.webp"
      alt="Redesigned FAQ subpage annotated with one design decision"
      width="1366"
      height="2524"
      bullets={bulletPointsSubpages2}
      mapId="faq"
      crop={{ start: 0.178, span: 0.49 }}
      observe="Delivered FAQ page: questions grouped from the research themes, not a generic template."
    />
  );
}

function AnimatedBulletsSubpages3() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/09/doctor-surgeries.webp"
      alt="Redesigned surgeries subpage annotated with one design decision"
      width="1366"
      height="5165"
      bullets={bulletPointsSubpages3}
      mapId="surgeries"
      crop={{ start: 0.288, span: 0.175 }}
      observe="Delivered surgeries page: procedures grouped by category, with images."
    />
  );
}

function AnimatedBulletsSubpages4() {
  return (
    <AnnotatedMockup
      src="/assets/portfolio/2025/09/doctor-clinic.webp"
      alt="Redesigned new-clinic subpage annotated with one design decision"
      width="1366"
      height="5042"
      bullets={bulletPointsSubpages4}
      mapId="new-clinic"
      crop={{ start: 0.32, span: 0.34 }}
      observe="Delivered new-clinic page: the short timeline added at the doctor's request."
    />
  );
}

/* ---------------------------
PÁGINA /HELIO
---------------------------- */

export default function DoctorCase() {
  const prefersReducedMotion = useReducedMotion();
  const [isHeroMobile, setIsHeroMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false,
  );
  const { scrollY } = useScroll();
  // Layered hero: the text block drifts as ONE layer at a single speed and
  // fades all the way out while the mockup rises in the opposite direction.
  const rawMockupY = useTransform(scrollY, [0, 500], [0, -60]);
  const rawHeroTextY = useTransform(scrollY, [0, 500], [0, 34]);
  const rawBackdropY = useTransform(scrollY, [0, 600], [0, 120]);
  const heroTextFade = useTransform(scrollY, [0, 420], [1, 0]);
  const parallaxDisabled = isHeroMobile || prefersReducedMotion;
  const heroMockupStyle = parallaxDisabled ? undefined : { y: rawMockupY };
  const heroTextStyle = parallaxDisabled ? undefined : { y: rawHeroTextY, opacity: heroTextFade };
  const heroBackdropStyle = parallaxDisabled ? undefined : { y: rawBackdropY };
  // Reduced-motion variants: translate-based reveals collapse to plain fades.
  // Float loop only runs while the hero mockup is on screen.
  const heroMockupRef = useRef(null);
  const heroMockupInView = useInView(heroMockupRef);
  useEffect(() => {
    const updateHeroLayout = () => setIsHeroMobile(window.innerWidth < 768);
    updateHeroLayout();
    window.addEventListener("resize", updateHeroLayout);
    return () => window.removeEventListener("resize", updateHeroLayout);
  }, []);

  // TOC: seção ativa

  return (
    <>
      <style>{doctorCss}</style>

      <main id="main" className="page">
        <div className="page-inner">
          {/* HERO CASE */}
          <section className="case-hero">
            <motion.div
              className="case-hero-backdrop"
              aria-hidden="true"
              style={heroBackdropStyle}
            />
            <motion.div style={heroTextStyle}>
              <p className="case-label">PAID CLIENT PROJECT, 2024</p>
              <h1 className="case-title-main">The questions patients asked before booking</h1>
              <p className="case-subtitle">
                Paid work for Dr. H&eacute;lio Alves, a plastic surgeon in Sao Paulo.
              </p>
            </motion.div>

            <figure className="case-hero-mockup-wrap" ref={heroMockupRef}>
              <motion.div style={heroMockupStyle}>
                <motion.div
                  className="case-hero-mockup"
                  variants={floatLoop}
                  animate={!prefersReducedMotion && heroMockupInView ? "animate" : undefined}
                >
                  <img
                    src="/assets/portfolio/2025/11/mockup-helio.png"
                    alt="Website redesign mockup for Dr. Hélio"
                    loading="eager"
                    decoding="async"
                    width="540"
                    height="311"
                  />
                </motion.div>
              </motion.div>
            </figure>

            <motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
              Research, identity, IA, UI, and WordPress, 2024.
            </motion.p>

            <div className="in-short">
              <div className="in-short-item">
                <div className="in-short-label">Problem</div>
                <p className="in-short-text">
                  Patients asked about procedures, prices, and insurance. The site did not answer.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">My role</div>
                <p className="in-short-text">
                  I led the project from patient research through the WordPress build. Leticia Magri
                  collaborated on the palette.
                </p>
              </div>
              <div className="in-short-item">
                <div className="in-short-label">What remains</div>
                <p className="in-short-text">
                  The WordPress site was later rebuilt. The logo and palette are still used on the
                  clinic, prescription pad, and Instagram.
                </p>
              </div>
            </div>

            <CaseContents sections={CASE_SECTIONS} />
          </section>

          {/* [REVISÃO MATTHIAS] Doctor PinnedStory context copy, compressed from the existing Overview. */}
          <PinnedStory
            steps={[
              {
                id: "context",
                label: "The brief",
                title: "A site that did not answer questions before booking",
                body: "Navigation was unclear. Pages skipped procedures, prices, insurance, and how a first visit worked.",
                img: "/assets/portfolio/2025/08/doctor-evaluation.webp",
                alt: "Previous Doctor homepage evaluated against patient needs",
              },
              {
                id: "research",
                label: "Evidence",
                title: "Five interviews and Instagram questions named the same doubts",
                body: "Insurance, pricing, payment, procedures, and recovery came up again and again. Those themes became the content map.",
                img: "/assets/portfolio/2025/08/Feedback-Insurance-1.png",
                alt: "Patient feedback about insurance information",
              },
              {
                id: "insight",
                label: "Decisions",
                title: "Navigation was organized around the questions patients asked",
                body: "FAQ, first consultation, and procedure pages moved patients from a doubt to a next step.",
                img: "/assets/portfolio/2025/09/doctor-faq.webp",
                alt: "FAQ page organized around recurring patient questions",
              },
              {
                id: "solution",
                label: "Delivery",
                title: "WordPress pages, a style guide, and a mark still in use",
                body: "I shipped the site for the clinic to maintain. The logo and palette stayed.",
                img: "/assets/portfolio/2025/09/doctor-redesign-home.webp",
                alt: "Redesigned Doctor homepage as delivered",
              },
            ]}
          />

          {/* LAYOUT PRINCIPAL */}
          <div className="case-layout">
            <div className="case-content-column">
              {/* OVERVIEW */}
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
                  <p>
                    Dr. H&eacute;lio Alves is a plastic surgeon in Sao Paulo, with 16 years of
                    experience in corrective body surgery.
                  </p>
                </div>
              </motion.section>

              {/* RESEARCH */}
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
                  <h3 className="case-subsection-title">
                    What patients asked, and what the clinic needed
                  </h3>
                  <p>
                    A stakeholder interview set the clinic&apos;s priorities: show the doctor&apos;s
                    technique, attract new patients, and keep using the blue he already wore on
                    coats and instruments. I then interviewed five patients and, with the social
                    media team, collected Instagram question stickers. The same themes appeared in
                    both: insurance, pricing, payment, procedures, recovery, and what a first visit
                    involves.
                  </p>
                </div>

                <div className="research-full">
                  <div className="research-grid">
                    <article className="research-card">
                      <h4 className="research-title">Insurance, price, payment</h4>
                      <p className="research-text">
                        These were the first questions. They needed a visible place on the site, not
                        a buried paragraph.
                      </p>
                    </article>

                    <article className="research-card">
                      <h4 className="research-title">Technique and credentials</h4>
                      <p className="research-text">
                        The doctor wanted his specialization easier to find. Patients wanted proof
                        they were looking at the right surgeon, including a direct path to his page.
                      </p>
                    </article>

                    <article className="research-card">
                      <h4 className="research-title">How a first visit works</h4>
                      <p className="research-text">
                        Patients studied blogs and posts before booking. They needed indications,
                        risks, recovery, and a simple account of the first consultation.
                      </p>
                    </article>
                  </div>
                </div>

                <div className="research-full">
                  <div className="case-gallery">
                    <div className="case-gallery-grid">
                      <Figure
                        src="/assets/portfolio/2025/08/Feedback-Insurance-1.png"
                        alt="Feedback about insurance information"
                        zoom
                        caption={{ text: "Insurance feedback" }}
                      />
                      <Figure
                        src="/assets/portfolio/2025/08/Feedback-Prices-768x726.png"
                        alt="Feedback about prices"
                        zoom
                        caption={{ text: "Price feedback" }}
                      />
                      <Figure
                        src="/assets/portfolio/2025/08/Feedback-Information-1-768x726.png"
                        alt="Feedback about information clarity"
                        zoom
                        caption={{ text: "Information feedback" }}
                      />
                      <Figure
                        src="/assets/portfolio/2025/08/Feedback-Others-768x722.png"
                        alt="Other qualitative feedback"
                        zoom
                        caption={{ text: "Other insights" }}
                      />
                    </div>

                    <p className="case-gallery-hint">Click any screen to see it in detail.</p>
                  </div>
                </div>

                <div className="case-section-body case-section-body-secondary">
                  <p>
                    Those themes drove the next decisions: a clearer surgery list, an FAQ, a
                    first-consultation timeline, and a homepage that points to the doctor and to
                    popular procedures. The interviews and stickers were qualitative, not a formal
                    test.
                  </p>
                </div>
              </motion.section>

              {/* EVALUATION */}
              <motion.section
                id="evaluation"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Evaluation
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Gaps on the live homepage</h3>
                  <p>
                    I mapped the existing homepage against those findings. The notes below are the
                    gaps that later became pages or components.
                  </p>
                </div>

                <div className="research-full">
                  <AnimatedBullets />
                </div>
              </motion.section>

              {/* WIREFRAMES */}
              <motion.section
                id="wireframes"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Wireframes
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">Pages before polish</h3>
                  <p className="case-wireframes-text">
                    Booking, procedure detail, and the landing structure from that map, before color
                    and type.
                  </p>
                </div>

                <div className="research-full">
                  <div className="case-wireframes">
                    <motion.div className="case-wireframes-grid" variants={gridStagger}>
                      <Figure
                        src="/assets/portfolio/2025/12/Wireframe-Agendar-consulta.png"
                        alt="Wireframe: appointment booking flow"
                        zoom
                        variants={tiltIn(-1.2, prefersReducedMotion)}
                      />
                      <Figure
                        src="/assets/portfolio/2025/12/Wireframe-Procedure-2.png"
                        alt="Wireframe: procedure detail page"
                        zoom
                        variants={tiltIn(0, prefersReducedMotion)}
                      />
                      <Figure
                        src="/assets/portfolio/2025/12/Wireframe-Landing-Page-1.png"
                        alt="Wireframe: landing page structure"
                        zoom
                        variants={tiltIn(1.2, prefersReducedMotion)}
                      />
                    </motion.div>
                  </div>
                </div>
              </motion.section>

              {/* IA */}
              <motion.section
                id="ia"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel
                  prefersReducedMotion={prefersReducedMotion}
                  lineBreakAfter="Information"
                >
                  Information architecture
                </TypedSectionLabel>

                <div className="case-section-body">
                  <h3 className="case-subsection-title">From a question to a page</h3>
                  <p>
                    Insurance, pricing, procedures, recovery, and the first visit from the
                    interviews sit on this tree. Patients move from a general interest to a
                    procedure, then to how a first visit works, then to contact.
                  </p>
                </div>

                <div className="research-full">
                  <div className="case-ia">
                    <Figure
                      src="/assets/portfolio/2025/12/IA-image.png"
                      alt="Information architecture diagram for the redesigned website"
                      zoom
                    />
                  </div>
                </div>
              </motion.section>

              {/* THE MARK */}
              <motion.section
                id="the-mark"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  The mark
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">A color he already had</h3>
                  <p>
                    He had used the same blue since medical school, on instruments and coats, and
                    asked to keep it. #092C4C became the primary, with a lighter blue for
                    interactive states, amber for calls to action, and neutrals for hierarchy.
                  </p>

                  <div className="mark-swatches">
                    {MARK_PALETTE.map((swatch) => (
                      <div className="mark-swatch" key={swatch.hex}>
                        <span
                          className="mark-swatch-chip"
                          style={{ background: swatch.hex }}
                          aria-hidden="true"
                        />
                        <span className="mark-swatch-hex">{swatch.hex}</span>
                      </div>
                    ))}
                  </div>

                  <p>
                    I drew the HA monogram in one stroke, the letters crossing. It keeps the gesture
                    of a signature patients see on every prescription.
                  </p>

                  <div className="style-guide-logo-hero">
                    <img
                      src="/assets/portfolio/2025/12/helio-logo-mark.svg"
                      alt="the HA monogram on its own"
                      loading="lazy"
                      decoding="async"
                      width="119"
                      height="91"
                    />
                  </div>

                  <p>
                    Three lockups: monogram, vertical for print and the header, horizontal for
                    narrow spaces. Barlow for headings, Montserrat for body, both open license.
                  </p>

                  <div className="style-guide-logo-row">
                    <div className="style-guide-logo-variant">
                      <img
                        src="/assets/portfolio/2025/12/helio-logo-vertical.svg"
                        alt="the monogram above the doctor's full name"
                        loading="lazy"
                        decoding="async"
                        width="339"
                        height="170"
                      />
                    </div>
                    <div className="style-guide-logo-variant">
                      <img
                        src="/assets/portfolio/2025/12/helio-logo-horizontal.svg"
                        alt="the monogram beside the doctor's full name"
                        loading="lazy"
                        decoding="async"
                        width="581"
                        height="125"
                      />
                    </div>
                  </div>

                  <h3 className="case-subsection-title">Still in use</h3>
                  <p>
                    The logo and palette remain on the clinic, the prescription pad, the bags
                    patients take home, and Instagram. When the practice added Est&eacute;tica to
                    the descriptor, I extended the lockups without redrawing the mark. Continuity of
                    the identity is adoption, not a measured UX or conversion result.
                  </p>

                  <figure className="style-guide-image">
                    <div className="style-guide-image-inner">
                      <img
                        src="/assets/portfolio/2025/09/Logobags-image.png"
                        alt="the mark on bags given to patients"
                        loading="lazy"
                        decoding="async"
                        width="584"
                        height="763"
                      />
                    </div>
                  </figure>
                </div>
              </motion.section>

              {/* STYLE GUIDE */}
              <motion.section
                id="style-guide"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Style guide
                </TypedSectionLabel>
                <div className="case-section-body">
                  <h3 className="case-subsection-title">A file the clinic could keep using</h3>
                  <p>
                    The style guide recorded spacing, type, color, and core components so new pages
                    could be added after handoff. The block below is a reconstructed preview for
                    this portfolio, not a screenshot of the live site.
                  </p>

                  <DoctorSystemPreview />
                </div>
              </motion.section>

              {/* THE REDESIGN */}
              <motion.section
                id="the-redesign"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  The redesign
                </TypedSectionLabel>

                <div className="case-section-body">
                  <h3 className="case-subsection-title">Pages as delivered</h3>
                  <p>
                    The screens below show the design delivered in this project, not the
                    clinic&apos;s current site. The site was implemented in WordPress and later
                    rebuilt by others.
                  </p>
                </div>

                <div className="research-full" style={{ marginTop: "24px" }}>
                  <AnimatedBulletsSecondary />
                </div>

                {/* Subpages: título + novo mockup com bullets */}
                <div
                  className="case-section-body case-section-body-secondary"
                  style={{ marginTop: "32px" }}
                >
                  <h3 className="case-subsection-title">Subpages</h3>
                </div>

                <div className="research-full" style={{ marginTop: "16px" }}>
                  <AnimatedBulletsSubpages />
                </div>

                <div className="research-full" style={{ marginTop: "24px" }}>
                  <AnimatedBulletsSubpages2 />
                </div>

                <div className="research-full" style={{ marginTop: "24px" }}>
                  <AnimatedBulletsSubpages3 />
                </div>

                <div className="research-full" style={{ marginTop: "24px" }}>
                  <AnimatedBulletsSubpages4 />
                </div>
                {/* Mobile version */}
                <div
                  className="case-section-body case-section-body-secondary"
                  style={{ marginTop: "32px" }}
                >
                  <h3 className="case-subsection-title">Mobile version</h3>
                </div>

                <div className="research-full mobile-gallery-shell">
                  <div className="mobile-version-block">
                    <SnapGallery
                      label="Mobile screens"
                      items={MOBILE_SCREENS}
                      className="ms-snap--exported ms-snap--large ms-snap--depth"
                    />
                  </div>
                </div>
              </motion.section>

              {/* OUTCOME */}

              <CaseBackToContents />
              <motion.section
                id="outcome"
                className="case-section"
                variants={sectionStagger}
                initial="hidden"
                whileInView="visible"
                viewport={motionViewport}
              >
                <TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>
                  Outcome
                </TypedSectionLabel>

                <div className="case-section-body">
                  <p>
                    I delivered information architecture, wireframes, UI, the logo, a style guide,
                    and a WordPress site. The logo and palette remain on the clinic, the
                    prescription pad, the bags, and Instagram. The WordPress site was later rebuilt
                    by others. This case does not present post-launch UX or sales metrics.
                  </p>
                </div>
              </motion.section>

              <CaseBackToContents />

              {/* ── Paginação ── */}
              <section className="case-pagination" aria-label="Next and previous case">
                <div className="case-pagination-inner">
                  <Link to="/delivery" className="case-pagination-card case-pagination-prev">
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
                      The New Delivery Experience
                    </div>
                    <div className="case-pagination-desc">
                      Redesigning the delivery confirmation flow for drivers.
                    </div>
                  </Link>
                  <Link to="/duopet" className="case-pagination-card case-pagination-next">
                    <div className="case-pagination-label">Next case</div>
                    <div className="case-pagination-title">
                      DuoPet
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
                      Making veterinary appointment scheduling stress-free.
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
