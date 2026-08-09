import{r as o,j as e,m as a,A as E,a as B,e as N,c as A,L as S}from"./vendor-_eVBy7WR.js";import{u as z,b as P,S as R,c as k,d as L,v as m,s as g,T as x,h as D,t as F,e as q}from"./home-D69OED-q.js";import{S as H,P as _,F as u,a as O}from"./case-delivery-BEA3mx--.js";import{S as W}from"./case-duopet-DWwv9SYK.js";function T(){return typeof window<"u"&&window.matchMedia("(pointer: fine)").matches}function U({bullet:t,popoverId:n,layerRef:c}){const s=o.useRef(null),[r,p]=o.useState("right"),l=z();return o.useEffect(()=>{if(!s.current)return;const h=c.current?.parentElement?.getBoundingClientRect(),d=s.current.parentElement?.getBoundingClientRect();if(!h||!d)return;const i=d.left-h.left+d.width/2,f=requestAnimationFrame(()=>{p(i<h.width/2?"right":"left")});return()=>cancelAnimationFrame(f)},[c]),e.jsxs(a.div,{ref:s,id:n,role:"note",className:`ms-hotspot-popover ms-hotspot-popover--${r}${t.placement?` ms-hotspot-popover--${t.placement}`:""}`,initial:l?{opacity:0}:{opacity:0,y:4},animate:l?{opacity:1}:{opacity:1,y:0},exit:l?{opacity:0}:{opacity:0,y:4},transition:{duration:.18,ease:"easeOut"},children:[e.jsx("span",{className:"ms-hotspot-popover__arrow","aria-hidden":"true"}),e.jsxs("div",{className:"ms-hotspot-popover__card",children:[e.jsx("h3",{className:"ms-hotspot-popover__title",children:t.title}),e.jsx("p",{className:"ms-hotspot-popover__desc",children:t.description})]})]})}function $({bullets:t,mapId:n,className:c=""}){const[s,r]=o.useState(null),[p,l]=o.useState(null),h=o.useRef(null),d=s??p;return o.useEffect(()=>{if(d===null)return;const i=f=>{f.key==="Escape"&&(r(null),l(null))};return window.addEventListener("keydown",i),()=>window.removeEventListener("keydown",i)},[d]),e.jsx("div",{ref:h,className:`ms-hotspot-map ${c}`.trim(),children:t.map((i,f)=>{const y=d===i.id,v=`hotspot-${n}-${i.id}`;return e.jsxs("div",{className:"absolute",style:{left:i.x,top:i.y,transform:"translate(-50%, -50%)",zIndex:y?50:10},onMouseEnter:()=>{T()&&l(i.id)},onMouseLeave:()=>{T()&&l(null)},children:[e.jsx("button",{type:"button",className:`ms-hotspot-dot${y?" is-active":""}`,"aria-label":`${f+1}. ${i.title}`,"aria-expanded":y,"aria-controls":`${v}-popover`,"aria-describedby":`${v}-item`,onClick:()=>r(w=>w===i.id?null:i.id),onBlur:()=>{s===i.id&&r(null)},children:e.jsx(a.span,{className:"ms-hotspot-dot__visual","aria-hidden":"true",animate:{scale:y?1.1:1},transition:{duration:.2,ease:"easeOut"},children:i.id})}),e.jsx(E,{children:y&&e.jsx(U,{bullet:i,popoverId:`${v}-popover`,layerRef:h})})]},i.id)})})}function V({bullets:t,mapId:n,className:c=""}){return e.jsx("ol",{className:`ms-hotspot-list ${c}`.trim(),children:t.map(s=>e.jsxs("li",{id:`hotspot-${n}-${s.id}-item`,className:"ms-hotspot-list__item",children:[e.jsx("span",{className:"ms-hotspot-list__number","aria-hidden":"true",children:s.id}),e.jsxs("span",{className:"ms-hotspot-list__content",children:[e.jsx("span",{className:"ms-hotspot-list__title",children:s.title}),e.jsx("span",{className:"ms-hotspot-list__desc",children:s.description})]})]},s.id))})}const Q=[{id:1,x:"59.60%",y:"2.89%",title:"Blog section",description:"Maintaining the blog section is advisable, as our interviews indicate that patients often rely on this resource for information."},{id:2,x:"87.20%",y:"16.88%",title:"Surgeries list",description:"The list of surgeries could be clearer and better structured."},{id:3,x:"83.00%",y:"2.11%",title:"FAQ section",description:"Including an FAQ section can be valuable for addressing common questions from prospective patients."},{id:4,x:"7.24%",y:"33.42%",title:"Grid system",description:"A grid system could be implemented, as the current site lacks consistency in layout."},{id:5,x:"87.20%",y:"31.71%",title:"Specialization & technique",description:"There is little emphasis on the doctor's specialization and technique, which limits differentiation and trust."},{id:6,x:"65.70%",y:"38.59%",title:"Doctor's page link",description:"There is no direct link to the page about the doctor. Adding this link builds trust and provides key information about his credentials."},{id:7,x:"13.60%",y:"80.60%",title:"Typography & blog cards",description:"Low contrast in fonts and inconsistencies in blog boxes can be improved to make content easier to read and scan."},{id:8,x:"47.70%",y:"98.80%",placement:"top",title:"Clinic address",description:"The clinic address is missing. Including it can help users find the clinic and enhance site credibility."}],X=[{id:1,x:"70.40%",y:"49.79%",title:"Learn more button",description:'I added the "learn more" button to allow users to discover more about the doctor and his innovative technique.'},{id:2,x:"11.33%",y:"66.18%",title:"Popular procedures",description:"I chose to feature the most popular procedures on the homepage with photos to capture users' attention and make them easier to find."},{id:3,x:"56.48%",y:"88.55%",title:"Consultation information",description:"I added a dedicated homepage section, guiding users to detailed information about the initial consultation process, based on our interviews highlighting its importance to patients."}],Y=[{id:1,x:"7.50%",y:"7.82%",title:"Breadcrumbs navigation",description:"Implemented breadcrumbs for enhanced navigation."},{id:2,x:"50.50%",y:"65.61%",title:"Step-by-step timeline",description:"I created a simple and easy-to-understand step-by-step guide, designed as a timeline, to streamline the first consultation process."}],G=[{id:1,x:"50.00%",y:"38.00%",title:"FAQ based on research",description:"FAQ content shaped by insights from user research."}],K=[{id:1,x:"50.00%",y:"35.00%",title:"Categorized surgeries with visuals",description:"I organized the surgeries into categories with images to make them easier to identify, and future usability tests will validate this approach."}],J=[{id:1,x:"50.00%",y:"60.00%",title:"New clinic timeline",description:"At the doctor’s request, I highlighted the construction of the new clinic in a clear and easy-to-understand timeline."}],Z=[{src:"/assets/portfolio/2025/09/doctor-mobile-01.png",alt:"Mobile homepage of the redesigned plastic surgeon website"},{src:"/assets/portfolio/2025/09/doctor-mobile-02.png",alt:"Mobile surgeries page with procedures grouped by category"},{src:"/assets/portfolio/2025/09/doctor-mobile-03.png",alt:"Mobile first-consultation page with the step-by-step timeline"},{src:"/assets/portfolio/2025/09/doctor-mobile-04.png",alt:"Mobile page showing other regions and the new clinic location"},{src:"/assets/portfolio/2025/09/doctor-mobile-05.png",alt:"Mobile post-operative care page"}],ee=[{group:"Primary",swatches:[{name:"Base",token:"Primary-base",hex:"#092C4C"},{name:"Light",token:"Primary-light",hex:"#095399"}]},{group:"Secondary",swatches:[{name:"Base",token:"Secondary-base",hex:"#CE8000"},{name:"Dark",token:"Secondary-dark",hex:"#995F00"}]},{group:"Neutral",swatches:[{name:"100",token:"Neutral-100",hex:"#4F4F4F"},{name:"200",token:"Neutral-200",hex:"#828282"},{name:"300",token:"Neutral-300",hex:"#BDBDBD"},{name:"400",token:"Neutral-400",hex:"#E0E0E0"},{name:"White",token:"White",hex:"#F9F9F9"}]}];function te(){return e.jsxs("div",{className:"doctor-system-preview",role:"img","aria-label":"Live preview of the Doctor website header, typography, buttons, form field, and consultation timeline",children:[e.jsxs("div",{className:"doctor-system-topbar","aria-hidden":"true",children:[e.jsx("span",{className:"doctor-system-mark",children:"HA"}),e.jsxs("div",{className:"doctor-system-nav",children:[e.jsx("span",{children:"Cirurgias"}),e.jsx("span",{children:"Sobre"}),e.jsx("span",{children:"Blog"})]}),e.jsx("span",{className:"doctor-ui-button doctor-ui-button--primary",children:"Agendar consulta"})]}),e.jsxs("div",{className:"doctor-system-canvas","aria-hidden":"true",children:[e.jsxs("div",{className:"doctor-system-copy",children:[e.jsx("span",{className:"doctor-system-eyebrow",children:"Primeira consulta"}),e.jsx("h4",{children:"Informação clara antes da primeira conversa."}),e.jsx("p",{children:"Uma hierarquia calma ajuda pacientes a entender o processo, preparar perguntas e decidir o próximo passo."}),e.jsxs("div",{className:"doctor-system-actions",children:[e.jsx("span",{className:"doctor-ui-button doctor-ui-button--primary",children:"Agendar consulta"}),e.jsx("span",{className:"doctor-ui-button doctor-ui-button--secondary",children:"Conhecer o doutor"})]}),e.jsxs("label",{className:"doctor-ui-field",children:[e.jsx("span",{children:"Procedimento de interesse"}),e.jsx("span",{className:"doctor-ui-field-value",children:"Selecione uma opção"})]})]}),e.jsxs("div",{className:"doctor-system-panel",children:[e.jsx("span",{className:"doctor-system-panel-label",children:"Como funciona"}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("span",{children:"01"}),e.jsx("strong",{children:"Conte sua necessidade"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"02"}),e.jsx("strong",{children:"Converse com a equipe"})]}),e.jsxs("li",{children:[e.jsx("span",{children:"03"}),e.jsx("strong",{children:"Prepare sua consulta"})]})]})]})]})]})}function ie(){return e.jsxs("div",{className:"doctor-type-grid",children:[e.jsxs("article",{className:"doctor-type-card doctor-type-card--barlow",children:[e.jsxs("div",{className:"doctor-type-head",children:[e.jsx("span",{className:"doctor-type-aa","aria-hidden":"true",children:"Aa"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Barlow"}),e.jsx("p",{children:"Headings and navigation"})]})]}),e.jsxs("div",{className:"doctor-type-scale","aria-label":"Barlow heading scale",children:[e.jsx("span",{className:"doctor-type-h1",children:"Heading 1"}),e.jsx("span",{className:"doctor-type-h2",children:"Heading 2"}),e.jsx("span",{className:"doctor-type-h3",children:"Heading 3"}),e.jsx("span",{className:"doctor-type-spaced",children:"Heading with space"})]})]}),e.jsxs("article",{className:"doctor-type-card doctor-type-card--montserrat",children:[e.jsxs("div",{className:"doctor-type-head",children:[e.jsx("span",{className:"doctor-type-aa","aria-hidden":"true",children:"Aa"}),e.jsxs("div",{children:[e.jsx("h4",{children:"Montserrat"}),e.jsx("p",{children:"Body copy and interface text"})]})]}),e.jsxs("div",{className:"doctor-type-scale","aria-label":"Montserrat body text scale",children:[e.jsxs("span",{className:"doctor-type-body-lg",children:[e.jsx("strong",{children:"Large text"})," / Regular"]}),e.jsxs("span",{className:"doctor-type-body-md",children:[e.jsx("strong",{children:"Medium text"})," / Regular"]}),e.jsxs("span",{className:"doctor-type-body-base",children:[e.jsx("strong",{children:"Normal text"})," / Regular"]}),e.jsxs("span",{className:"doctor-type-body-sm",children:[e.jsx("strong",{children:"Small text"})," / Regular"]})]})]})]})}function ae(){return e.jsx("div",{className:"doctor-palette",children:ee.map(t=>e.jsxs("div",{className:"doctor-palette-group",children:[e.jsx("p",{className:"doctor-palette-label",children:t.group}),e.jsx("div",{className:"doctor-palette-row",children:t.swatches.map(n=>e.jsxs("div",{className:"doctor-swatch",children:[e.jsx("span",{className:"doctor-swatch-chip",style:{background:n.hex},"aria-hidden":"true"}),e.jsx("span",{className:"doctor-swatch-name",children:n.name}),e.jsx("span",{className:"doctor-swatch-token",children:n.token}),e.jsx("span",{className:"doctor-swatch-hex",children:n.hex})]},n.token))})]},t.group))})}const se=[{id:"overview",label:"overview"},{id:"research",label:"research"},{id:"evaluation",label:"evaluation"},{id:"wireframes",label:"wireframes"},{id:"ia",label:"ia"},{id:"style-guide",label:"style guide"},{id:"the-redesign",label:"redesign"},{id:"outcome",label:"outcome"}];function b({src:t,alt:n,width:c,height:s,bullets:r,mapId:p}){return e.jsx("div",{className:"w-full flex justify-center",children:e.jsxs("div",{className:"ms-annotated",children:[e.jsx(O,{variant:"browser",children:e.jsxs("div",{className:"relative w-full max-w-[872px]",children:[e.jsx("img",{src:t,alt:n,className:"w-full h-auto object-contain",loading:"lazy",decoding:"async",width:c,height:s}),e.jsx($,{bullets:r,mapId:p})]})}),e.jsx(V,{bullets:r,mapId:p})]})})}function ne(){return e.jsx(b,{src:"/assets/portfolio/2025/08/doctor-evaluation.webp",alt:"Current homepage annotated with the eight evaluation findings",width:"1256",height:"4071",bullets:Q,mapId:"evaluation"})}function re(){return e.jsx(b,{src:"/assets/portfolio/2025/09/doctor-redesign-home.webp",alt:"Redesigned homepage annotated with three design decisions",width:"912",height:"1940",bullets:X,mapId:"redesign-home"})}function oe(){return e.jsx(b,{src:"/assets/portfolio/2025/09/doctor-consultation.webp",alt:"Redesigned first-consultation subpage annotated with the design decisions",width:"1366",height:"1712",bullets:Y,mapId:"consultation"})}function ce(){return e.jsx(b,{src:"/assets/portfolio/2025/09/doctor-faq.webp",alt:"Redesigned FAQ subpage annotated with one design decision",width:"1366",height:"2524",bullets:G,mapId:"faq"})}function le(){return e.jsx(b,{src:"/assets/portfolio/2025/09/doctor-surgeries.webp",alt:"Redesigned surgeries subpage annotated with one design decision",width:"1366",height:"5165",bullets:K,mapId:"surgeries"})}function de(){return e.jsx(b,{src:"/assets/portfolio/2025/09/doctor-clinic.webp",alt:"Redesigned new-clinic subpage annotated with one design decision",width:"1366",height:"5042",bullets:J,mapId:"new-clinic"})}function xe(){const[t,n]=o.useState(()=>z()),[c,s]=o.useState(()=>typeof window<"u"?window.innerWidth<768:!1),{scrollY:r}=B(),p=N(r,[0,500],[0,-60]),l=N(r,[0,500],[0,34]),h=N(r,[0,600],[0,120]),d=N(r,[0,420],[1,0]),i=c||t,f=i?void 0:{y:p},y=i?void 0:{y:l,opacity:d},v=i?void 0:{y:h},w=o.useRef(null),C=A(w);return o.useEffect(()=>{const I=window.matchMedia("(prefers-reduced-motion: reduce)"),j=()=>{const M=z();n(M),s(window.innerWidth<768)};return j(),I.addEventListener("change",j),window.addEventListener("resize",j),()=>{I.removeEventListener("change",j),window.removeEventListener("resize",j)}},[]),o.useEffect(()=>{P({title:"Healthcare Redesign | UX Case Study | Matthias Schaefle",description:"UX case study of a plastic surgeon website redesigned for trust, clear treatment information, and independent client maintenance.",path:"/doctor",ogTitle:"Healthcare Website Redesign | UX Case Study",ogDescription:"A research-led digital presence designed to help plastic surgery patients find clear, trustworthy information."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
* {
box-sizing: border-box;
}

html {
scroll-behavior: smooth;
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
margin-top: 28px;
padding-top: 24px;
border-top: var(--hairline);
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
scroll-margin-top: 140px;
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
padding: 20px 0 0;
border-top: var(--hairline);
}

.research-number {
font-family: var(--font-display);
font-size: 30px;
font-weight: 600;
line-height: 1.1;
letter-spacing: -0.02em;
color: var(--ink-900);
margin-bottom: 10px;
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
margin-top: 20px;
}

.style-guide-image-inner {
background: #FFFFFF;
border: var(--hairline);
border-radius: 16px;
overflow: hidden;
}

.style-guide-image-inner img {
width: 100%;
height: auto;
display: block;
}

.style-guide-logo-grid {
margin-top: 20px;
display: grid;
grid-template-columns: repeat(2, minmax(0, 1fr));
gap: 16px;
}

.style-guide-logo-card {
background: #FFFFFF;
border: var(--hairline);
border-radius: 16px;
padding: 32px 24px;
display: flex;
align-items: center;
justify-content: center;
aspect-ratio: 1 / 1;
min-height: 0;
}

.style-guide-logo-card img {
max-width: 100%;
max-height: 100%;
width: auto;
height: auto;
display: block;
object-fit: contain;
}

/* Native Doctor style guide. These are real interface elements rather than
   screenshots of the handoff board, so they stay crisp and responsive. */
.doctor-system-preview {
margin-top: 22px;
border: 1px solid #D9DDE1;
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

.doctor-system-mark {
width: 34px;
height: 34px;
display: inline-flex;
align-items: center;
justify-content: center;
border: 1px solid #092C4C;
border-radius: 50%;
font-family: "Barlow", var(--font-display);
font-size: 12px;
font-weight: 700;
letter-spacing: 0.04em;
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
border: var(--hairline);
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

.doctor-type-head p {
margin: 2px 0 0;
font: inherit;
font-size: 10px;
line-height: 1.4;
color: #828282;
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
font-size: 10px;
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
border: 1px solid rgba(9,44,76,0.12);
border-radius: 10px;
}

.doctor-swatch-name {
font-family: "Montserrat", var(--font-body);
font-size: 11px;
font-weight: 600;
color: #092C4C;
}

.doctor-swatch-token,
.doctor-swatch-hex {
overflow-wrap: anywhere;
font-family: var(--font-mono);
font-size: 9px;
line-height: 1.4;
color: var(--ink-600);
}

.doctor-swatch-hex { color: #995F00; }

@media (max-width: 768px){
.style-guide-logo-grid {
grid-template-columns: 1fr;
}

.doctor-system-nav { display: none; }
.doctor-system-topbar { gap: 12px; }
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

/* MOBILE VERSION – SnapGallery spacing */
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

`}),e.jsx(R,{}),e.jsx(H,{sections:se}),e.jsx("main",{id:"main",className:"page",children:e.jsxs("div",{className:"page-inner",children:[e.jsxs("section",{className:"case-hero",children:[e.jsx(a.div,{className:"case-hero-backdrop","aria-hidden":"true",style:v}),e.jsxs(a.div,{style:y,children:[e.jsx("p",{className:"case-label",children:"CASE STUDY / HEALTHCARE"}),e.jsx("h1",{className:"case-title-main",children:"The Doctor's New Digital Presence"}),e.jsx("p",{className:"case-subtitle",children:"A website redesign for a plastic surgeon in Sao Paulo, focused on clearer information, a warmer visual language and a smoother path from first visit to booking."})]}),e.jsxs("div",{className:"case-meta-grid",children:[e.jsx(a.div,{className:"case-meta-motion",...k(0,t),children:e.jsxs("div",{className:"case-meta-item",children:[e.jsx("div",{className:"case-meta-label",children:"Team"}),e.jsx("div",{className:"case-meta-value",children:"Matthias Karl Schaefle / Leticia Magri"})]})}),e.jsx(a.div,{className:"case-meta-motion",...k(1,t),children:e.jsxs("div",{className:"case-meta-item",children:[e.jsx("div",{className:"case-meta-label",children:"Scope of work"}),e.jsx("div",{className:"case-meta-value",children:"User research, wireframes, UI design, prototyping"})]})}),e.jsx(a.div,{className:"case-meta-motion",...k(2,t),children:e.jsxs("div",{className:"case-meta-item",children:[e.jsx("div",{className:"case-meta-label",children:"Role"}),e.jsx("div",{className:"case-meta-value",children:"UX/UI Designer"})]})}),e.jsx(a.div,{className:"case-meta-motion",...k(3,t),children:e.jsxs("div",{className:"case-meta-item",children:[e.jsx("div",{className:"case-meta-label",children:"Year"}),e.jsx("div",{className:"case-meta-value",children:"2024"})]})})]}),e.jsxs("div",{className:"in-short",children:[e.jsxs("div",{className:"in-short-item",children:[e.jsx("div",{className:"in-short-label",children:"Problem"}),e.jsx("p",{className:"in-short-text",children:"Patients arrived with the same questions before booking: procedures, prices, insurance."})]}),e.jsxs("div",{className:"in-short-item",children:[e.jsx("div",{className:"in-short-label",children:"My role"}),e.jsx("p",{className:"in-short-text",children:"UX/UI design from research to handoff: IA, page system, mobile."})]}),e.jsxs("div",{className:"in-short-item",children:[e.jsx("div",{className:"in-short-label",children:"Result"}),e.jsx("p",{className:"in-short-text",children:"Live since 2024; the client maintains and evolves the site independently."})]})]}),e.jsx("div",{className:"case-hero-mockup-wrap","aria-hidden":"true",ref:w,children:e.jsx(a.div,{style:f,children:e.jsx(a.div,{className:"case-hero-mockup",variants:L,animate:!t&&C?"animate":void 0,children:e.jsx("img",{src:"/assets/portfolio/2025/11/mockup-helio.png",alt:"Website redesign mockup for Dr. Hélio",loading:"eager",decoding:"async",width:"1200",height:"760"})})})})]}),e.jsx(_,{steps:[{id:"context",label:"Context",title:"The website was not supporting patient decisions",body:"The existing site had unclear navigation, inconsistent hierarchy, and gaps in the information patients expected before booking.",img:"/assets/portfolio/2025/08/doctor-evaluation.webp",alt:"Previous Doctor homepage evaluated against patient needs"},{id:"research",label:"Research",title:"Five patient interviews mapped the questions before booking",body:"Interviews and Instagram question stickers revealed recurring doubts about insurance, pricing, payment, procedures, and recovery.",img:"/assets/portfolio/2025/09/doctor-consultation.webp",alt:"First-consultation page shaped by patient research"},{id:"insight",label:"Insight",title:"The same doubts kept returning",body:"Patients needed clearer answers, stronger trust signals, and content structured around the questions they ask before contacting a clinic.",img:"/assets/portfolio/2025/09/doctor-faq.webp",alt:"FAQ page organized around recurring patient questions"},{id:"solution",label:"Solution",title:"A calmer page system built around patient questions",body:"We reorganized the information architecture and designed responsive pages that made services, consultation details, and credentials easier to understand.",img:"/assets/portfolio/2025/09/doctor-redesign-home.webp",alt:"Redesigned Doctor homepage"}]}),e.jsx("div",{className:"case-layout",children:e.jsxs("div",{className:"case-content-column",children:[e.jsxs(a.section,{id:"overview",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Overview"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Background"}),e.jsx("p",{children:"The doctor is a plastic surgeon in Sao Paulo, Brazil, with 16 years of experience. Specializing in corrective body surgeries, his website showcases his expertise, attracts new patients, and provides detailed service information."}),e.jsx("h3",{className:"case-subsection-title",children:"Problem"}),e.jsx("p",{children:"The existing website had unclear navigation, inconsistent visual hierarchy, and gaps in the information patients expected to find before booking. The result was a digital experience that did not fully reflect the doctor's expertise or support the trust-building process patients need in a healthcare context."}),e.jsx("h3",{className:"case-subsection-title",children:"My role"}),e.jsx("p",{children:"I designed the information architecture and the page system, synthesized the patient research into content priorities, and created the visual identity, including the logo. I also prepared the style guide and the handoff documentation."}),e.jsxs("p",{children:[e.jsx("strong",{children:"Highlights"}),e.jsx("br",{}),"We reorganized information around patient questions, created a calmer visual system, and designed responsive pages that made services, consultation details, and the doctor's credentials easier to understand."]})]})]}),e.jsxs(a.section,{id:"research",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Research"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Exploring needs and perspectives"}),e.jsx("p",{children:"The stakeholder interview helped us understand the business goals, the doctor's differentiators, and which parts of the old website were no longer supporting the clinic's growth."})]}),e.jsx("div",{className:"research-full",children:e.jsxs("div",{className:"research-grid",children:[e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"01"}),e.jsx("h4",{className:"research-title",children:"Primary objectives"}),e.jsx("p",{className:"research-text",children:"Present the doctor's expertise clearly, attract new patients, keep existing clients informed, and strengthen the clinic's online presence."})]}),e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"02"}),e.jsx("h4",{className:"research-title",children:"Highlighting medical innovations"}),e.jsx("p",{className:"research-text",children:"The doctor wanted his technique and specialization to be easier to understand and more visible in the experience."})]}),e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"03"}),e.jsx("h4",{className:"research-title",children:"Blue as part of the brand"}),e.jsx("p",{className:"research-text",children:"Blue was important to the stakeholder, so we kept it as part of the system while making the palette calmer and more consistent."})]})]})}),e.jsxs("div",{className:"case-section-body case-section-body-secondary",children:[e.jsx("h3",{className:"case-subsection-title",children:"Understanding patient needs"}),e.jsx("p",{children:"To understand what patients look for before contacting a clinic, I interviewed five patients and mapped their most frequent questions."}),e.jsx("p",{children:"Together with the social media and marketing team, we used Instagram question stickers to collect common doubts quickly and then grouped them into themes."})]}),e.jsx("div",{className:"research-full",children:e.jsxs("div",{className:"case-gallery",children:[e.jsxs("div",{className:"case-gallery-grid",children:[e.jsx(u,{src:"/assets/portfolio/2025/08/Feedback-Insurance-1.png",alt:"Feedback about insurance information",zoom:!0,caption:{text:"Insurance feedback"}}),e.jsx(u,{src:"/assets/portfolio/2025/08/Feedback-Prices-768x726.png",alt:"Feedback about prices",zoom:!0,caption:{text:"Price feedback"}}),e.jsx(u,{src:"/assets/portfolio/2025/08/Feedback-Information-1-768x726.png",alt:"Feedback about information clarity",zoom:!0,caption:{text:"Information feedback"}}),e.jsx(u,{src:"/assets/portfolio/2025/08/Feedback-Others-768x722.png",alt:"Other qualitative feedback",zoom:!0,caption:{text:"Other insights"}})]}),e.jsx("p",{className:"case-gallery-hint",children:"Click any screen to see it in detail."})]})}),e.jsx("div",{className:"case-section-body case-section-body-secondary",children:e.jsx("p",{children:"These methods revealed recurring patterns in patient doubts and expectations. Those patterns shaped the new website structure, content hierarchy, and visual priorities."})}),e.jsx("div",{className:"research-full",children:e.jsxs("div",{className:"research-grid",children:[e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"01"}),e.jsx("h4",{className:"research-title",children:"Common inquiries"}),e.jsx("p",{className:"research-text",children:"Patients often have recurring questions about insurance, pricing and payment. Making this information easy to find became a priority."})]}),e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"02"}),e.jsx("h4",{className:"research-title",children:"Transparency and feedback"}),e.jsx("p",{className:"research-text",children:"Testimonials and visual proof are strong decision drivers. At the same time, the content must respect local regulations on before-and-after photos."})]}),e.jsxs("article",{className:"research-card",children:[e.jsx("div",{className:"research-number",children:"03"}),e.jsx("h4",{className:"research-title",children:"Pre-procedure research"}),e.jsx("p",{className:"research-text",children:"Many patients study blogs and posts before booking, looking for indications, risks, recovery and realistic results. The website needed to support this journey with clearer, structured content."})]})]})})]}),e.jsxs(a.section,{id:"evaluation",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Evaluation"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Analyzing the current interface"}),e.jsx("p",{children:"I reviewed the current homepage against the research findings, looking for places where navigation, trust signals, and content hierarchy could better support patient decisions."})]}),e.jsx("div",{className:"research-full",children:e.jsx(ne,{})})]}),e.jsxs(a.section,{id:"wireframes",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Wireframes"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Turning research into page structure"}),e.jsx("p",{className:"case-wireframes-text",children:"The wireframes helped translate patient questions into clear page flows before visual design decisions took over."})]}),e.jsx("div",{className:"research-full",children:e.jsx("div",{className:"case-wireframes",children:e.jsxs(a.div,{className:"case-wireframes-grid",variants:D,children:[e.jsx(u,{src:"/assets/portfolio/2025/12/Wireframe-Agendar-consulta.png",alt:"Wireframe – appointment booking flow",zoom:!0,variants:F(-1.2,t)}),e.jsx(u,{src:"/assets/portfolio/2025/12/Wireframe-Procedure-2.png",alt:"Wireframe – procedure detail page",zoom:!0,variants:F(0,t)}),e.jsx(u,{src:"/assets/portfolio/2025/12/Wireframe-Landing-Page-1.png",alt:"Wireframe – landing page structure",zoom:!0,variants:F(1.2,t)})]})})})]}),e.jsxs(a.section,{id:"ia",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,lineBreakAfter:"Information",children:"Information architecture"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Restructuring navigation"}),e.jsx("p",{children:"We redesigned the website structure so patients could move from general interest to specific procedures, consultation details, and contact information with fewer detours."})]}),e.jsx("div",{className:"research-full",children:e.jsx("div",{className:"case-ia",children:e.jsx(u,{src:"/assets/portfolio/2025/12/IA-image.png",alt:"Information architecture diagram for the redesigned website",zoom:!0})})})]}),e.jsxs(a.section,{id:"style-guide",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Style guide"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h4",{className:"case-subsection-title",children:"One reference for the whole team"}),e.jsx("p",{children:"I put together a structured style guide so future pages could follow the same visual logic. It gave the team a shared reference for spacing, typography, colors, and core components."}),e.jsx(te,{}),e.jsx("h3",{className:"case-subsection-title",children:"Brand identity"}),e.jsx("p",{children:"I designed the logo to feel professional, personal, and appropriate for a healthcare context, then used it as a core element of the visual system."}),e.jsxs("div",{className:"style-guide-logo-grid",children:[e.jsx("div",{className:"style-guide-logo-card",children:e.jsx("img",{src:"/assets/portfolio/2025/12/Logo-Vertical.png",alt:"Vertical logo for the plastic surgeon brand",loading:"lazy",decoding:"async",width:"1200",height:"800"})}),e.jsx("div",{className:"style-guide-logo-card",children:e.jsx("img",{src:"/assets/portfolio/2025/12/Logo-horizontal.png",alt:"Horizontal logo for the plastic surgeon brand",loading:"lazy",decoding:"async",width:"1200",height:"800"})})]}),e.jsx("p",{children:"The identity was also prepared for physical touchpoints, including items given to patients."}),e.jsx("div",{className:"style-guide-image",children:e.jsx("div",{className:"style-guide-image-inner",children:e.jsx("img",{src:"/assets/portfolio/2025/09/Logobags-image.png",alt:"Brand applied to physical items such as bags given to patients",loading:"lazy",decoding:"async",width:"1200",height:"800"})})}),e.jsx("h3",{className:"case-subsection-title",children:"Typography"}),e.jsx("p",{children:"We chose Barlow for the header for its modern aesthetic and clean lines, and Montserrat for the body text for its legibility on various devices."}),e.jsx(ie,{}),e.jsx("h3",{className:"case-subsection-title",children:"Colors"}),e.jsx("p",{children:"Blue, requested by the stakeholder, for trust and professionalism; gray for an elegant backdrop; and orange for dynamic contrast and attention."}),e.jsx(ae,{})]})]}),e.jsxs(a.section,{id:"the-redesign",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"The redesign"}),e.jsxs("div",{className:"case-section-body",children:[e.jsx("h3",{className:"case-subsection-title",children:"Crafting a Cohesive Experience"}),e.jsx("p",{children:"The redesign makes the site feel calmer, easier to scan, and more aligned with the level of trust patients need before booking a consultation."}),e.jsx("p",{className:"case-disclaimer",children:"Please note that I am not responsible for implementing the website, and the current live version is not under my control."})]}),e.jsx("div",{className:"research-full",style:{marginTop:"24px"},children:e.jsx(re,{})}),e.jsx("div",{className:"case-section-body case-section-body-secondary",style:{marginTop:"32px"},children:e.jsx("h3",{className:"case-subsection-title",children:"Subpages"})}),e.jsx("div",{className:"research-full",style:{marginTop:"16px"},children:e.jsx(oe,{})}),e.jsx("div",{className:"research-full",style:{marginTop:"24px"},children:e.jsx(ce,{})}),e.jsx("div",{className:"research-full",style:{marginTop:"24px"},children:e.jsx(le,{})}),e.jsx("div",{className:"research-full",style:{marginTop:"24px"},children:e.jsx(de,{})}),e.jsx("div",{className:"case-section-body case-section-body-secondary",style:{marginTop:"32px"},children:e.jsx("h3",{className:"case-subsection-title",children:"Mobile version"})}),e.jsx("div",{className:"research-full mobile-gallery-shell",children:e.jsx("div",{className:"mobile-version-block",children:e.jsx(W,{label:"Mobile screens",items:Z,className:"ms-snap--exported ms-snap--large ms-snap--depth"})})})]}),e.jsxs(a.section,{id:"outcome",className:"case-section",variants:g,initial:"hidden",whileInView:"visible",viewport:m,children:[e.jsx(x,{prefersReducedMotion:t,children:"Outcome"}),e.jsx("div",{className:"case-section-body",children:e.jsx("p",{children:"The redesign was delivered as a complete handoff: a new information architecture, a page system covering the homepage and the key subpages, a mobile version, and a style guide documenting the visual system. The site has been live since 2024. Since then, the client has maintained and evolved the website independently, including updates driven by changes in Brazilian legislation. The screens shown here reflect the design as handed off."})})]}),e.jsx("section",{className:"case-pagination","aria-label":"Next and previous case",children:e.jsxs("div",{className:"case-pagination-inner",children:[e.jsxs(S,{to:"/delivery",className:"case-pagination-card case-pagination-prev",children:[e.jsx("div",{className:"case-pagination-label",children:"Previous case"}),e.jsxs("div",{className:"case-pagination-title",children:[e.jsx("span",{className:"case-pagination-arrow",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M15 18l-6-6 6-6",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})})}),"The New Delivery Experience"]}),e.jsx("div",{className:"case-pagination-desc",children:"Redesigning the delivery confirmation flow for drivers."})]}),e.jsxs(S,{to:"/duopet",className:"case-pagination-card case-pagination-next",children:[e.jsx("div",{className:"case-pagination-label",children:"Next case"}),e.jsxs("div",{className:"case-pagination-title",children:["DuoPet",e.jsx("span",{className:"case-pagination-arrow",children:e.jsx("svg",{width:"14",height:"14",viewBox:"0 0 24 24",fill:"none",children:e.jsx("path",{d:"M9 18l6-6-6-6",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),e.jsx("div",{className:"case-pagination-desc",children:"Making veterinary appointment scheduling stress-free."})]})]})})]})})]})}),e.jsx(q,{tagline:"Thanks for visiting. Research, interface design, and prototyping."})]})}export{ne as AnimatedBullets,xe as default};
