import React, { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUpImmediate, floatLoop, gridStagger, sectionStagger, tiltIn, useReducedMotion as getReducedMotion, viewport as motionViewport } from "@/lib/animations";
import { applySeo } from "@/lib/seo";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import CaseContents, { CaseBackToContents } from "./components/CaseContents.jsx";
import PinnedStory from "./components/PinnedStory.jsx";
import Figure from "./components/mockups/Figure.jsx";
import Frame from "./components/mockups/Frame.jsx";
import SnapGallery from "./components/mockups/SnapGallery.jsx";
import { HotspotMap, HotspotList } from "./components/mockups/Hotspot.jsx";
import { useLightbox } from "./components/mockups/lightbox-context.js";
import TypedSectionLabel from "./components/TypedSectionLabel.jsx";

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
description:
"Interviews showed patients use the blog. It stayed on the site.",
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
description:
"An FAQ can answer the questions patients asked before booking.",
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
description:
"Low contrast type and uneven blog cards made the content harder to scan.",
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
description:
'The "learn more" button opens the doctor page and his technique.',
},
{
id: 2,
x: "11.33%",
y: "66.18%",
title: "Popular procedures",
description:
"Popular procedures sit on the homepage with photos, so they are easier to find.",
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
description:
"A short timeline walks through the first consultation.",
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
description:
"Surgeries grouped by category, with images, so they are easier to identify.",
},
];

const bulletPointsSubpages4 = [
{
id: 1,
x: "50.00%",
y: "60.00%",
title: "New clinic timeline",
description:
"At the doctor's request, the new clinic appears as a short timeline.",
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
<p>Uma hierarquia calma ajuda pacientes a entender o processo, preparar perguntas e decidir o próximo passo.</p>
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
<li><span>01</span><strong>Conte sua necessidade</strong></li>
<li><span>02</span><strong>Converse com a equipe</strong></li>
<li><span>03</span><strong>Prepare sua consulta</strong></li>
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
<span className="doctor-type-aa" aria-hidden="true">Aa</span>
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
<span className="doctor-type-aa" aria-hidden="true">Aa</span>
<div>
<h4>Montserrat</h4>
<p>Body copy and interface text</p>
</div>
</div>
<div className="doctor-type-scale" aria-label="Montserrat body text scale">
<span className="doctor-type-body-lg"><strong>Large text</strong> / Regular</span>
<span className="doctor-type-body-md"><strong>Medium text</strong> / Regular</span>
<span className="doctor-type-body-base"><strong>Normal text</strong> / Regular</span>
<span className="doctor-type-body-sm"><strong>Small text</strong> / Regular</span>
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
<span className="doctor-swatch-chip" style={{ background: swatch.hex }} aria-hidden="true" />
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
// The annotation container (.relative w-full max-w-[872px]) is locked: the
// HotspotMap stays a direct child so the dots keep their legacy percentage
// geometry. The parity HotspotList lives outside the relative container (in
// flow inside the Frame) so it never shifts the dots' containing block.
function AnnotatedMockup({ src, alt, width, height, bullets, mapId, crop, scrollable = false, observe }) {
const { open } = useLightbox();
const start = crop?.start ?? 0;
const span = crop?.span ?? 1;
const isCropped = Boolean(crop) && span < 0.99;
const windowRatio = `${width} / ${Number(height) * span}`;
const caption = observe || "Full page as designed in this project";

return (
<div className="w-full flex justify-center">
{/* A lista de anotacoes fica FORA do browser frame: dentro dele lia como
    parte da pagina mockada. Fora, vira legenda editorial do artefato. */}
<div className="ms-annotated">
<Frame variant="browser">
<div
className={`w-full max-w-[872px]${scrollable ? " annotated-scroll" : ""}${isCropped ? " annotated-crop-window" : ""}`}
style={isCropped ? { aspectRatio: windowRatio } : undefined}
>
<div
className={`relative w-full${isCropped ? " annotated-crop-inner" : ""}`}
style={isCropped ? { transform: `translateY(-${start * 100}%)` } : undefined}
>
<img
src={src}
alt={alt}
className="w-full h-auto object-contain" loading="lazy" decoding="async" width={width} height={height} />
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
{scrollable ? " Scroll the capture, or open the full page." : isCropped ? " Cropped to the decision. Full page remains available." : ""}
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

export default function Document() {
const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => getReducedMotion());
const [isHeroMobile, setIsHeroMobile] = useState(() => (
typeof window !== "undefined" ? window.innerWidth < 768 : false
));
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
const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
const updateMotionSettings = () => {
const prefersReduced = getReducedMotion();
setPrefersReducedMotion(prefersReduced);
setIsHeroMobile(window.innerWidth < 768);
};

updateMotionSettings();
reducedQuery.addEventListener("change", updateMotionSettings);
window.addEventListener("resize", updateMotionSettings);

return () => {
reducedQuery.removeEventListener("change", updateMotionSettings);
window.removeEventListener("resize", updateMotionSettings);
};
}, []);

useEffect(() => {
applySeo({
title: "Healthcare Website UX Case Study | Matthias Schaefle",
description: "Paid 2024 client project for plastic surgeon Dr. Hélio Alves: patient research, information architecture, UI, WordPress delivery, and a visual identity still in use.",
path: "/doctor",
ogTitle: "The questions patients asked before booking",
ogDescription: "A paid 2024 website project for a Sao Paulo plastic surgeon, built around the questions patients asked before booking.",
});
}, []);

// TOC: seção ativa

return (
<>
<style>{`
* {
box-sizing: border-box;
}

html {
scroll-behavior: auto;
}

body {
margin: 0;
padding: 0;
font-family: var(--font-body);
color: var(--ink);
background: var(--bg);
min-height: 100vh;
overflow-x: hidden;
}

a {
color: inherit;
text-decoration: none;
}

img {
max-width: 100%;
display: block;
}

.page {
min-height: 100vh;
width: 100%;
padding: 152px 16px 40px;
display: flex;
flex-direction: column;
align-items: center;
}

.page-inner {
width: 100%;
max-width: 872px;
}

@media (max-width: 768px){
.page {
min-height: auto;
padding-top: 120px;
padding-inline: 12px;
padding-bottom: 60px;
}
}

.case-hero {
position: relative;
}

.case-hero-backdrop {
position: absolute;
top: -140px;
right: -180px;
width: 560px;
height: 560px;
border-radius: 50%;
background: radial-gradient(circle at 35% 35%, rgba(var(--accent-rgb),0.10) 0%, rgba(var(--accent-rgb),0.045) 40%, transparent 70%);
pointer-events: none;
z-index: 0;
}

@media (max-width: 900px){
.case-hero-backdrop { display: none; }
}

.case-title-main {
font-family: var(--font-display);
font-size: 40px;
font-weight: 500;
letter-spacing: -0.02em;
margin: 0;
color: var(--ink);
line-height: 1.1;
}

.case-subtitle {
font-family: var(--font-body);
font-size: 16px;
line-height: 1.7;
font-weight: 400;
max-width: 520px;
color: var(--ink-600);
margin: 0;
}

.case-meta-grid {
display: grid;
grid-template-columns: repeat(4, minmax(0, 1fr));
gap: 16px;
margin-top: 8px;
position: relative;
z-index: 3;
}

.case-meta-motion {
min-width: 0;
display: flex;
}

.case-meta-motion .case-meta-item {
width: 100%;
}

.case-meta-item {
padding: 12px 0;
border-top: var(--hairline);
}

.case-meta-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--ink-600);
margin-bottom: 6px;
}

.case-meta-value {
font-family: var(--font-body);
font-size: 14px;
color: var(--ink-800);
}

/* ── IN SHORT (hero summary) ── */
.in-short {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 36px;
margin-top: 32px;
padding-top: 8px;
border-top: none;
position: relative;
z-index: 3;
}

.in-short-label {
font-family: var(--font-mono);
font-size: var(--label-1-size);
text-transform: uppercase;
letter-spacing: var(--label-1-track);
color: var(--ink-600);
margin-bottom: 8px;
}

.in-short-text {
font-family: var(--font-body);
font-size: 15px;
line-height: 1.6;
color: var(--ink-700);
margin: 0;
}

@media (max-width: 900px){
.in-short {
grid-template-columns: 1fr;
}
}

.case-hero-mockup-wrap {
margin-top: 16px;
display: flex;
align-items: center;
justify-content: center;
position: relative;
padding: 24px 0 0;
z-index: 1;
}

/* Ondas concêntricas do radar */

.case-hero-mockup {
position: relative;
z-index: 3;
}

.case-hero-mockup img {
display: block;
max-width: 540px;
width: 100%;
height: auto;
}

@media (max-width: 1024px){
.case-title-main { font-size: 34px; }

.case-meta-grid {
grid-template-columns: repeat(2, minmax(0, 1fr));
}

}

@media (max-width: 768px){
.case-title-main { font-size: 32px; }

.case-hero-mockup-wrap {
padding: 20px 0 14px;
}

}

/* LAYOUT COM MENU LATERAL */
.case-layout {
position: relative;
margin-top: 32px;
}

@media (max-width: 768px){
.case-layout {
margin-top: 12px;
}






}

.case-section {
display: grid;
grid-template-columns: minmax(120px, 190px) minmax(0, 1fr);
gap: 20px 40px;
padding-block: 32px;
}

.case-section:not(:first-child) {
border-top: var(--hairline);
}

.case-section:last-of-type {
border-bottom: var(--hairline);
margin-bottom: 32px;
}

.case-section-label {
font-family: var(--font-mono);
font-size: var(--label-2-size);
text-transform: uppercase;
letter-spacing: var(--label-2-track);
color: var(--ink-600);
opacity: 0.75;
padding-top: 4px;
margin: 0;
}

.case-section-label::before {
content: "";
display: inline-block;
width: 22px;
height: 1.5px;
background: var(--brand-600);
margin-right: 10px;
vertical-align: middle;
}

.case-section-body {
font-family: var(--font-body);
font-size: 16px;
line-height: 1.8;
color: var(--ink-800);
max-width: var(--measure-body);
}

.case-section-body-secondary {
grid-column: 2 / 3;
margin-top: 24px;
}

.case-section-body p {
margin: 0 0 14px;
}

.case-section-body p:last-child {
margin-bottom: 0;
}

.case-disclaimer {
margin-top: 4px;
font-size: 13px;
line-height: 1.6;
font-style: italic;
color: var(--ink-600);
}

.case-section-body ul {
margin: 0 0 14px 18px;
padding: 0;
}

.case-section-body li {
margin-bottom: 6px;
}

.case-subsection-title {
font-family: var(--font-display);
font-size: 17px;
font-weight: 600;
margin: 18px 0 6px;
color: var(--ink-800);
}

.case-subsection-title:first-child {
margin-top: 0;
}

@media (max-width: 768px){
.case-section {
grid-template-columns: 1fr;
gap: 16px;
padding-block: 24px;
}

.case-section-label {
font-size: var(--label-1-size);
letter-spacing: var(--label-1-track);
opacity: 0.75;
}

.case-section-body-secondary {
grid-column: 1 / -1;
margin-top: 16px;
}

.case-section-body {
font-size: 15px;
}
}

.research-full {
grid-column: 1 / -1;
max-width: 872px;
margin: 0 auto;
width: 100%;
}

.research-grid {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 16px;
margin-top: 18px;
}

.research-card {
position: relative;
padding: 0;
border: none;
border-radius: 0;
background: transparent;
box-shadow: none;
}

.research-title {
font-family: var(--font-display);
font-size: 16px;
font-weight: 700;
margin: 0 0 10px;
color: var(--ink-900);
letter-spacing: -0.01em;
line-height: 1.4;
}

.research-text {
font-size: 14px;
line-height: 1.75;
color: var(--ink-600);
margin: 0;
}

@media (max-width: 768px){
.research-grid {
grid-template-columns: 1fr;
}
}

.case-gallery {
margin-top: 26px;
}

.case-gallery-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
}

.case-gallery-hint {
margin-top: 10px;
font-size: 13px;
color: var(--ink-600);
}

@media (max-width: 768px){
.case-gallery-grid {
grid-template-columns: 1fr;
gap: 20px;
}
.case-gallery-hint {
font-weight: 600;
color: var(--ink-900);
}
}

.case-wireframes {
margin-top: 24px;
}

.case-wireframes-text {
font-size: 14px;
color: var(--ink-600);
margin: 4px 0 14px;
}

.case-wireframes-grid {
display: grid;
grid-template-columns: repeat(3, minmax(0, 1fr));
gap: 16px;
}

@media (max-width: 768px){
.case-wireframes-grid {
grid-template-columns: 1fr;
}
.case-wireframes-grid .ms-figure {
transform: none !important;
}
}

.case-ia {
margin-top: 20px;
}

.style-guide-image {
margin: 20px 0 0;
}

.style-guide-image-caption {
font-family: var(--font-body);
font-size: 13px;
line-height: 1.6;
color: var(--ink-600);
margin-top: 10px;
}

.style-guide-image-inner {
background: #FFFFFF;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 16px;
overflow: hidden;
}

.style-guide-image-inner img {
width: 100%;
height: auto;
display: block;
}

/* Three lockups stacked at the same width so none reads as a leftover. */
.style-guide-logo-hero {
margin-top: 20px;
background: #FFFFFF;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 16px;
padding: 40px 32px;
display: flex;
align-items: center;
justify-content: center;
}

.style-guide-logo-hero img {
width: auto;
max-width: min(280px, 100%);
max-height: 120px;
height: auto;
display: block;
}

.style-guide-logo-row {
margin-top: 12px;
display: flex;
flex-direction: column;
gap: 12px;
}

/* Faixa de amostras da secao The mark. Cada chip carrega o hex embaixo, e o
hex e texto selecionavel, nao legenda desenhada. */
.mark-swatches {
margin-top: 20px;
display: grid;
grid-template-columns: repeat(5, minmax(0, 1fr));
gap: 12px;
}

.mark-swatch {
min-width: 0;
display: flex;
flex-direction: column;
gap: 6px;
}

.mark-swatch-chip {
display: block;
height: 64px;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 10px;
}

.mark-swatch-hex {
font-family: var(--font-mono);
font-size: var(--label-1-size);
line-height: 1.4;
color: var(--ink-600);
}

.style-guide-logo-variant {
background: #FFFFFF;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 16px;
padding: 40px 24px;
display: flex;
align-items: center;
justify-content: center;
}

.style-guide-logo-row .style-guide-logo-variant:first-child img {
width: auto;
max-width: min(360px, 100%);
max-height: 140px;
}

.style-guide-logo-row .style-guide-logo-variant:last-child img {
width: min(520px, 100%);
max-height: 88px;
}

.style-guide-logo-variant img {
height: auto;
display: block;
}

/* Native Doctor style guide. These are real interface elements rather than
   screenshots of the handoff board, so they stay crisp and responsive. */
.doctor-system-preview {
min-width: 0;
margin-top: 22px;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 18px;
overflow: hidden;
background: #F9F9F9;
color: #092C4C;
}

.doctor-system-topbar {
min-height: 62px;
display: flex;
align-items: center;
gap: 20px;
padding: 12px 16px;
background: #FFFFFF;
border-bottom: 1px solid #E0E0E0;
font-family: "Montserrat", var(--font-body);
}

/* O lockup real, nao um "HA" tipografico: esta peca existe para mostrar o
sistema aplicado, entao a marca dentro dela tem que ser a marca. O alt fica
vazio porque o preview inteiro ja tem role="img" e um aria-label proprio. */
.doctor-system-mark {
width: 148px;
height: auto;
display: block;
flex: 0 0 auto;
}

.doctor-system-nav {
display: flex;
gap: 18px;
margin-right: auto;
font-size: 9px;
font-weight: 600;
letter-spacing: 0.08em;
text-transform: uppercase;
}

.doctor-ui-button {
display: inline-flex;
align-items: center;
justify-content: center;
min-height: 34px;
padding: 8px 13px;
border-radius: 2px;
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 700;
letter-spacing: 0.06em;
line-height: 1.2;
text-transform: uppercase;
white-space: nowrap;
}

.doctor-ui-button--primary {
background: #995F00;
color: #FFFFFF;
}

.doctor-ui-button--secondary {
border: 1px solid #092C4C;
background: #FFFFFF;
color: #092C4C;
}

.doctor-system-canvas {
display: grid;
grid-template-columns: minmax(0, 1.15fr) minmax(210px, 0.85fr);
gap: 24px;
padding: 30px;
background:
radial-gradient(circle at 8% 12%, rgba(206,128,0,0.08), transparent 35%),
#F9F9F9;
}

.doctor-system-copy {
display: flex;
flex-direction: column;
align-items: flex-start;
}

.doctor-system-eyebrow,
.doctor-system-panel-label {
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 700;
letter-spacing: 0.16em;
text-transform: uppercase;
}

.doctor-system-eyebrow { color: #995F00; }
.doctor-system-panel-label { color: #CE8000; }

.doctor-system-copy h4 {
margin: 8px 0 10px;
max-width: 15ch;
font-family: "Barlow", var(--font-display);
font-size: clamp(27px, 4vw, 38px);
font-weight: 600;
line-height: 1.02;
letter-spacing: -0.02em;
color: #092C4C;
}

.doctor-system-copy p {
margin: 0;
max-width: 45ch;
font-family: "Montserrat", var(--font-body);
font-size: 11px;
line-height: 1.65;
color: #4F4F4F;
}

.doctor-system-actions {
display: flex;
flex-wrap: wrap;
gap: 8px;
margin-top: 18px;
}

.doctor-ui-field {
width: 100%;
display: flex;
flex-direction: column;
gap: 6px;
margin-top: 24px;
font-family: "Montserrat", var(--font-body);
font-size: 9px;
font-weight: 600;
color: #4F4F4F;
}

.doctor-ui-field-value {
display: flex;
align-items: center;
min-height: 38px;
padding: 8px 11px;
border: 1px solid #BDBDBD;
background: #FFFFFF;
font-size: 10px;
font-weight: 400;
color: #828282;
}

.doctor-system-panel {
padding: 22px;
background: #092C4C;
color: #FFFFFF;
align-self: stretch;
}

.doctor-system-panel ol {
display: flex;
flex-direction: column;
gap: 0;
margin: 16px 0 0;
padding: 0;
list-style: none;
}

.doctor-system-panel li {
display: grid;
grid-template-columns: 28px 1fr;
gap: 10px;
align-items: center;
min-height: 58px;
margin: 0;
border-top: 1px solid rgba(255,255,255,0.22);
font-family: "Montserrat", var(--font-body);
}

.doctor-system-panel li span {
font-size: 10px;
color: #CE8000;
}

.doctor-system-panel li strong {
font-size: 11px;
font-weight: 600;
line-height: 1.4;
}

.doctor-type-grid {
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
margin-top: 16px;
}

.doctor-type-card {
min-width: 0;
padding: 20px;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 16px;
background: #FFFFFF;
color: #092C4C;
}

.doctor-type-card--barlow { font-family: "Barlow", var(--font-display); }
.doctor-type-card--montserrat { font-family: "Montserrat", var(--font-body); }

.doctor-type-head {
display: flex;
align-items: center;
gap: 14px;
padding-bottom: 16px;
border-bottom: 1px solid #E0E0E0;
}

.doctor-type-aa {
font-size: 46px;
font-weight: 400;
line-height: 0.9;
color: #BDBDBD;
}

.doctor-type-head h4 {
margin: 0;
font: inherit;
font-size: 18px;
font-weight: 600;
color: #092C4C;
}

/* Era 10px em #828282, que da ~3.5:1 sobre branco e reprova em AA. Neutral-200
e cor da paleta do cliente, legitima como amostra, mas nao como texto. */
.doctor-type-head p {
margin: 2px 0 0;
font: inherit;
font-size: var(--label-1-size);
line-height: 1.4;
color: var(--ink-600);
}

.doctor-type-scale {
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 9px;
padding-top: 17px;
color: #092C4C;
}

.doctor-type-h1 { font-size: 26px; font-weight: 700; line-height: 1; }
.doctor-type-h2 { font-size: 21px; font-weight: 500; line-height: 1.1; }
.doctor-type-h3 { font-size: 17px; font-weight: 500; }
.doctor-type-spaced { font-size: 11px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; }
.doctor-type-body-lg { font-size: 15px; }
.doctor-type-body-md { font-size: 13px; }
.doctor-type-body-base { font-size: 11px; }
.doctor-type-body-sm { font-size: 9px; }

.doctor-palette {
margin-top: 16px;
}

.doctor-palette-group {
margin-bottom: 22px;
}

.doctor-palette-group:last-child { margin-bottom: 0; }

.doctor-palette-label {
margin: 0 0 10px !important;
font-family: var(--font-mono);
font-size: var(--label-1-size);
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: var(--ink-600);
}

.doctor-palette-row {
display: grid;
grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
gap: 12px;
}

.doctor-swatch {
min-width: 0;
display: flex;
flex-direction: column;
gap: 3px;
}

.doctor-swatch-chip {
display: block;
height: 54px;
margin-bottom: 3px;
border: none;
box-shadow: var(--shadow-fine);
border-radius: 10px;
}

.doctor-swatch-name {
font-family: "Montserrat", var(--font-body);
font-size: 11px;
font-weight: 600;
color: #092C4C;
}

/* O hex e o token sao o conteudo da secao, nao legenda: a 9px ninguem le,
e era o dado que o leitor veio buscar. 11px e o mesmo tamanho dos rotulos
mono do resto do site. */
.doctor-swatch-token,
.doctor-swatch-hex {
overflow-wrap: anywhere;
font-family: var(--font-mono);
font-size: var(--label-1-size);
line-height: 1.4;
color: var(--ink-600);
}

.doctor-swatch-hex { color: #995F00; }

.annotated-scroll {
max-height: min(70vh, 820px);
overflow-x: hidden;
overflow-y: auto;
overscroll-behavior: contain;
-webkit-overflow-scrolling: touch;
}
.annotated-crop-window {
overflow: hidden;
}
.annotated-full-access {
margin: 12px 0 16px;
font-size: 13px;
line-height: 1.5;
color: var(--ink-600);
}
.annotated-full-btn {
appearance: none;
background: none;
border: 0;
padding: 0;
font: inherit;
color: var(--ink-900);
text-decoration: underline;
text-underline-offset: 2px;
cursor: pointer;
min-height: 44px;
}
.annotated-full-btn:focus-visible {
outline: 2px solid var(--brand-600);
outline-offset: 3px;
}

@media (max-width: 768px){
.style-guide-logo-hero { padding: 32px 20px; }
.style-guide-logo-variant { padding: 28px 20px; }
.style-guide-logo-row { flex-direction: column; }
.mark-swatches { grid-template-columns: repeat(3, minmax(0, 1fr)); }

/* O preview do sistema e uma reducao de um site de 1000px dentro de 350px, e
   nesse tamanho a tipografia dele cai para 9px. Continua sendo uma figura,
   nao texto de leitura, mas ilegivel nao comunica nada: aqui ele volta a um
   tamanho em que da para reconhecer o sistema. */
.doctor-system-nav { font-size: 11px; }
.doctor-ui-button { font-size: 11px; }
.doctor-system-eyebrow { font-size: 11px; }
.doctor-system-panel-label { font-size: 11px; }
.doctor-system-panel li span { font-size: 11px; }
.doctor-ui-field span { font-size: 11px; }

.doctor-system-nav { display: none; }
.doctor-system-topbar { gap: 12px; flex-wrap: wrap; }
.doctor-system-topbar .doctor-ui-button { margin-left: auto; }
.doctor-system-canvas { grid-template-columns: 1fr; padding: 20px; }
.doctor-type-grid { grid-template-columns: 1fr; }
.doctor-palette-row { grid-template-columns: repeat(2, minmax(0, 1fr)); }
}

/* ── Case Pagination ── */
.case-pagination { margin-top: 48px; margin-bottom: 24px; }
.case-pagination-inner { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 20px; }
.case-pagination-card {
display: flex; flex-direction: column; gap: 6px;
padding: 20px 0 0; border-top: var(--hairline);
text-decoration: none;
}
.case-pagination-label {
font-family: var(--font-mono); font-size: var(--label-1-size);
text-transform: uppercase; letter-spacing: var(--label-1-track); color: var(--ink-600);
transition: color .18s ease;
}
.case-pagination-card:hover .case-pagination-label { color: var(--brand-500); }
.case-pagination-title {
display: flex; align-items: center; gap: 8px;
font-family: var(--font-display); font-size: 15px; font-weight: 600; color: var(--ink-900);
}
.case-pagination-arrow {
display: inline-flex; align-items: center; flex-shrink: 0;
color: var(--ink-900);
transition: transform .18s ease;
}
.case-pagination-prev:hover .case-pagination-arrow { transform: translateX(-4px); }
.case-pagination-next:hover .case-pagination-arrow { transform: translateX(4px); }
.case-pagination-desc { font-family: var(--font-body); font-size: 13px; line-height: 1.6; color: var(--ink-600); }
.case-pagination-prev { text-align: left; }
.case-pagination-prev .case-pagination-title { flex-direction: row-reverse; justify-content: flex-end; }
.case-pagination-next { text-align: right; }
.case-pagination-next .case-pagination-title { justify-content: flex-end; }
@media (max-width: 768px){
.case-pagination-inner { grid-template-columns: 1fr; gap: 14px; }
.case-pagination-next { text-align: left; }
.case-pagination-next .case-pagination-title { justify-content: flex-start; }
}

/* MOBILE VERSION: SnapGallery spacing */
.mobile-version-block {
margin-top: 24px;
}

/* Minimal eyebrow label */
.case-label{
margin: 0 0 10px 0; /* small separation from H1, adjust only if needed */
padding: 0;
border: 0;
background: transparent;
box-shadow: none;
text-transform: uppercase;
letter-spacing: var(--label-2-track);
font-size: var(--label-2-size);
line-height: 1;
color: rgba(15,14,12,0.62);
}

/* ── MOBILE ── */
@media (max-width: 768px){
html, body { overflow-x: hidden !important; max-width: 100% !important; }
.page { padding-inline: 12px !important; overflow-x: hidden; }
.page-inner { overflow-x: hidden; max-width: 100% !important; }
.case-layout,.case-content-column,.case-section,.research-full { overflow-x: hidden !important; max-width: 100% !important; }
.case-section { grid-template-columns: 1fr !important; }
.case-section-body-secondary { grid-column: 1 !important; }

.research-grid { grid-template-columns: 1fr !important; }
.case-meta-grid { grid-template-columns: repeat(2,minmax(0,1fr)) !important; }
.case-pagination-inner { grid-template-columns: 1fr !important; }
}

.research-grid--two {
grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
}
@media (max-width: 768px){
.research-grid--two {
grid-template-columns: 1fr !important;
}
}

`}</style>

<SiteHeader />

<main id="main" className="page">
<div className="page-inner">
{/* HERO CASE */}
<section className="case-hero">
<motion.div className="case-hero-backdrop" aria-hidden="true" style={heroBackdropStyle} />
<motion.div style={heroTextStyle}>
<p className="case-label">PAID CLIENT PROJECT, 2024</p>
<h1 className="case-title-main">
The questions patients asked before booking
</h1>
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
alt="Website redesign mockup for Dr. Hélio" loading="eager" decoding="async" width="540" height="311" />
</motion.div>
</motion.div>
</figure>

<motion.p className="case-hero-byline" {...fadeUpImmediate(0, prefersReducedMotion)}>
Research, identity, IA, UI, and WordPress, 2024.
</motion.p>

<div className="in-short">
<div className="in-short-item">
<div className="in-short-label">Problem</div>
<p className="in-short-text">Patients asked about procedures, prices, and insurance. The site did not answer.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">My role</div>
<p className="in-short-text">I led the project from patient research through the WordPress build. Leticia Magri collaborated on the palette.</p>
</div>
<div className="in-short-item">
<div className="in-short-label">What remains</div>
<p className="in-short-text">The WordPress site was later rebuilt. The logo and palette are still used on the clinic, prescription pad, and Instagram.</p>
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
body: "I shipped the site for the clinic to maintain. Others later rebuilt it. The logo and palette stayed.",
img: "/assets/portfolio/2025/09/doctor-redesign-home.webp",
alt: "Redesigned Doctor homepage as delivered",
},
]}
/>

{/* LAYOUT PRINCIPAL */}
<div className="case-layout">

<div className="case-content-column">
{/* OVERVIEW */}
<motion.section id="overview" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Overview</TypedSectionLabel>
<div className="case-section-body">
<p>
Dr. H&eacute;lio Alves is a plastic surgeon in Sao Paulo, with 16 years
of experience in corrective body surgery.
</p>
</div>

</motion.section>

{/* RESEARCH */}
<motion.section id="research" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Research</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
What patients asked, and what the clinic needed
</h3>
<p>
A stakeholder interview set the clinic&apos;s priorities: show the
doctor&apos;s technique, attract new patients, and keep using the blue
he already wore on coats and instruments. I then interviewed five
patients and, with the social media team, collected Instagram
question stickers. The same themes appeared in both: insurance,
pricing, payment, procedures, recovery, and what a first visit
involves.
</p>
</div>

<div className="research-full">
<div className="research-grid">
<article className="research-card">
<h4 className="research-title">Insurance, price, payment</h4>
<p className="research-text">
These were the first questions. They needed a visible place on the
site, not a buried paragraph.
</p>
</article>

<article className="research-card">
<h4 className="research-title">
Technique and credentials
</h4>
<p className="research-text">
The doctor wanted his specialization easier to find. Patients wanted
proof they were looking at the right surgeon, including a direct
path to his page.
</p>
</article>

<article className="research-card">
<h4 className="research-title">
How a first visit works
</h4>
<p className="research-text">
Patients studied blogs and posts before booking. They needed
indications, risks, recovery, and a simple account of the first
consultation.
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

<p className="case-gallery-hint">
Click any screen to see it in detail.
</p>
</div>
</div>

<div className="case-section-body case-section-body-secondary">
<p>
Those themes drove the next decisions: a clearer surgery list,
an FAQ, a first-consultation timeline, and a homepage that
points to the doctor and to popular procedures. The interviews
and stickers were qualitative, not a formal test.
</p>
</div>

</motion.section>

{/* EVALUATION */}
<motion.section id="evaluation" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Evaluation</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">
Gaps on the live homepage
</h3>
<p>
I mapped the existing homepage against those findings. The notes
below are the gaps that later became pages or components.
</p>
</div>

<div className="research-full">
<AnimatedBullets />
</div>
</motion.section>

{/* WIREFRAMES */}
<motion.section id="wireframes" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Wireframes</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">
Pages before polish
</h3>
<p className="case-wireframes-text">
Booking, procedure detail, and the landing structure from that map,
before color and type.
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
<motion.section id="ia" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion} lineBreakAfter="Information">Information architecture</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
From a question to a page
</h3>
<p>
Insurance, pricing, procedures, recovery, and the first visit from
the interviews sit on this tree. Patients move from a general
interest to a procedure, then to how a first visit works, then to
contact.
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
<motion.section id="the-mark" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>The mark</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">A color he already had</h3>
<p>
He had used the same blue since medical school, on instruments and
coats, and asked to keep it. #092C4C became the primary, with a
lighter blue for interactive states, amber for calls to action, and
neutrals for hierarchy.
</p>

<div className="mark-swatches">
{MARK_PALETTE.map((swatch) => (
<div className="mark-swatch" key={swatch.hex}>
<span className="mark-swatch-chip" style={{ background: swatch.hex }} aria-hidden="true" />
<span className="mark-swatch-hex">{swatch.hex}</span>
</div>
))}
</div>

<p>
I drew the HA monogram in one stroke, the letters crossing. It keeps
the gesture of a signature patients see on every prescription.
</p>

<div className="style-guide-logo-hero">
<img
src="/assets/portfolio/2025/12/helio-logo-mark.svg"
alt="the HA monogram on its own" loading="lazy" decoding="async" width="119" height="91" />
</div>

<p>
Three lockups: monogram, vertical for print and the header, horizontal
for narrow spaces. Barlow for headings, Montserrat for body, both open
license.
</p>

<div className="style-guide-logo-row">
<div className="style-guide-logo-variant">
<img
src="/assets/portfolio/2025/12/helio-logo-vertical.svg"
alt="the monogram above the doctor's full name" loading="lazy" decoding="async" width="339" height="170" />
</div>
<div className="style-guide-logo-variant">
<img
src="/assets/portfolio/2025/12/helio-logo-horizontal.svg"
alt="the monogram beside the doctor's full name" loading="lazy" decoding="async" width="581" height="125" />
</div>
</div>

<h3 className="case-subsection-title">Still in use</h3>
<p>
The logo and palette remain on the clinic, the prescription pad, the
bags patients take home, and Instagram. When the practice added
Est&eacute;tica to the descriptor, I extended the lockups without
redrawing the mark. Continuity of the identity is adoption, not a
measured UX or conversion result.
</p>

<figure className="style-guide-image">
<div className="style-guide-image-inner">
<img
src="/assets/portfolio/2025/09/Logobags-image.png"
alt="the mark on bags given to patients" loading="lazy" decoding="async" width="584" height="763" />
</div>
</figure>
</div>
</motion.section>

{/* STYLE GUIDE */}
<motion.section id="style-guide" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Style guide</TypedSectionLabel>
<div className="case-section-body">
<h3 className="case-subsection-title">
A file the clinic could keep using
</h3>
<p>
The style guide recorded spacing, type, color, and core components so
new pages could be added after handoff. The block below is a reconstructed
preview for this portfolio, not a screenshot of the live site.
</p>

<DoctorSystemPreview />
</div>
</motion.section>

{/* THE REDESIGN */}
<motion.section id="the-redesign" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>The redesign</TypedSectionLabel>

<div className="case-section-body">
<h3 className="case-subsection-title">
Pages as delivered
</h3>
<p>
The screens below show the design delivered in this project, not the
clinic&apos;s current site. The site was implemented in WordPress and
later rebuilt by others.
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
<div className="case-section-body case-section-body-secondary" style={{ marginTop: "32px" }}>
<h3 className="case-subsection-title">Mobile version</h3>
</div>

<div className="research-full mobile-gallery-shell">
<div className="mobile-version-block">
<SnapGallery label="Mobile screens" items={MOBILE_SCREENS} className="ms-snap--exported ms-snap--large ms-snap--depth" />
</div>
</div>

</motion.section>

{/* OUTCOME */}

<CaseBackToContents />
<motion.section id="outcome" className="case-section" variants={sectionStagger} initial="hidden" whileInView="visible" viewport={motionViewport}>
<TypedSectionLabel prefersReducedMotion={prefersReducedMotion}>Outcome</TypedSectionLabel>

<div className="case-section-body">
<p>
I delivered information architecture, wireframes, UI, the logo, a
style guide, and a WordPress site. The logo and palette remain on
the clinic, the prescription pad, the bags, and Instagram. The
WordPress site was later rebuilt by others. This case does not
present post-launch UX or sales metrics.
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
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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
<span className="case-pagination-arrow"><svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg></span>
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

<SiteFooter tagline="Thanks for visiting. Research, interface design, and prototyping." />
</>
);
}
