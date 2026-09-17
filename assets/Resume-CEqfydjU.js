import{r,j as e}from"./vendor-_JLX-0fG.js";import{b as n,S as o,d as l}from"./home-BS55cQ7z.js";const m="/assets/portfolio/2026/07/CV_Matthias_Schaefle_2026-07.pdf",t={name:"Matthias Karl Schaefle",role:"UX/UI Designer",contact:[{label:"Phone",value:"+49 1520 5830511",href:"tel:+4915205830511"},{label:"Email",value:"matthias.k.schaefle@gmail.com",href:"mailto:matthias.k.schaefle@gmail.com"},{label:"Location",value:"Berlin, Germany"}],site:{value:"www.matthiasks.com",href:"https://matthiasks.com"},intro:"UX/UI Designer based in Berlin with paid client experience in operational product flows and service websites. I work across research, interaction design, high-fidelity UI, validation, and responsive implementation in React and Vite.",experience:[{title:"UX/UI Designer: Delivery workflow",kind:"Paid freelance client project · Vulpes Studio",period:"2025",summary:"Redesign of a delivery confirmation flow for a small freight company in Barbacena, Brazil.",bullets:["Conducted field research with 5 couriers and piloted the redesigned confirmation flow with 12 drivers over three weeks.","Reduced task time by approximately 7 to 8 seconds per stop and increased record compliance from 92% to 98%. Pilot data supported a projected 30 to 40% reduction in proof-of-delivery disputes."]},{title:"UX/UI and Web Designer: Dr. Hélio",kind:"Paid freelance client project",period:"2024",summary:"Research, information architecture, visual identity, responsive UI, and website delivery for a plastic surgeon.",bullets:["Used patient interviews and recurring social-media questions to define the information architecture, content hierarchy, and responsive interface.","Created the visual identity and delivered the website for independent client updates; the identity remains in use."]}],educationalProjects:[{title:"DuoPet",kind:"Course project",period:"2023",summary:"Concept for veterinary appointment booking developed during UX training.",bullets:["Surveyed 164 pet owners, conducted 5 follow-up interviews, and completed two small-sample usability-testing rounds."]}],skills:[{title:"UX Design",body:"Product discovery, qualitative and quantitative research, usability testing, interaction design, prototyping, mobile UX, design systems."},{title:"Tools",body:"Figma, FigJam, React/Vite, HTML/CSS, Tailwind, Cursor, Notion, Linear."},{title:"Technical prototyping",body:"From Figma to responsive React prototypes used to explore and validate faster."},{title:"Languages",body:"Portuguese (native), English (fluent), German (B1 certified; B2 professional course in progress)."}],education:[{name:"Front-end Development and AI Weiterbildung",where:"WBS Coding School, Berlin",when:"2026 to present",note:"Current phase: three-month professional German B2 course. The front-end and AI technical curriculum begins afterward and has not started yet."},{name:"Google UX Design Certificate",where:"Professional Certificate, Coursera",when:"2025"},{name:"B.Sc. Biological Sciences",where:"Federal Institute of Southeast Minas Gerais",when:"2019"},{name:"Technical University of Munich",where:"Academic exchange",when:"2014 to 2016"}]};function s({job:i}){return e.jsxs("article",{className:"resume-job",children:[e.jsxs("div",{className:"resume-job-head",children:[e.jsx("h3",{className:"resume-job-title",children:i.title}),e.jsxs("div",{className:"resume-job-meta",children:[e.jsx("span",{children:i.kind}),e.jsx("span",{children:i.period})]})]}),e.jsx("p",{className:"resume-job-summary",children:i.summary}),e.jsx("ul",{className:"resume-bullets",children:i.bullets.map(a=>e.jsx("li",{children:a},a.slice(0,40)))})]})}function p(){return r.useEffect(()=>{n({title:"Resume | Matthias Schaefle | UX/UI Designer in Berlin",description:"Resume of Matthias Schaefle, UX/UI Designer based in Berlin. Research-led product design, prototyping in React/Vite, and design systems.",path:"/resume",ogTitle:"Resume | Matthias Schaefle",ogDescription:"UX/UI Designer in Berlin. Research-led product design and technical prototyping."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
/* .page nao e global: sem isto o header flutuante cobre o topo. */
.page { min-height: 100vh; width: 100%; padding: 140px 16px 96px; display: flex; flex-direction: column; align-items: center; }
.page-inner { width: 100%; max-width: 872px; }
@media (max-width: 720px) {
  .page { padding: 120px 16px 64px; }
}

.resume-doc { width: 100%; max-width: 820px; margin: 0 auto; }

/* Barra de acao: so na tela, nunca no PDF */
.resume-actions {
  display: flex; align-items: center; justify-content: space-between;
  gap: 16px; flex-wrap: wrap; margin-bottom: 40px;
}
.resume-actions-note {
  font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.02em;
  color: var(--ink-600); margin: 0;
}

/* Cabecalho */
.resume-head {
  display: flex; justify-content: space-between; align-items: flex-start;
  gap: 32px; flex-wrap: wrap;
}
.resume-name {
  font-family: var(--font-display); font-weight: 700;
  font-size: clamp(30px, 5vw, 42px); letter-spacing: -0.025em;
  color: var(--ink-900); margin: 0; line-height: 1.05;
}
.resume-role {
  margin-top: 8px; font-family: var(--font-mono); font-weight: 500;
  font-size: 12px; letter-spacing: 0.16em; text-transform: uppercase;
  color: var(--brand-600);
}
.resume-contact {
  list-style: none; margin: 0; padding: 0; text-align: right;
  font-size: 14px; line-height: 1.75; color: var(--ink-600);
}
.resume-contact a { color: inherit; text-decoration: none; }
.resume-contact a:hover { text-decoration: underline; }
.resume-site { margin-top: 8px; font-family: var(--font-mono); font-size: 12px; }

.resume-intro {
  margin: 28px 0 0; font-size: 16px; line-height: 1.7; color: var(--ink-700);
}

/* Rotulos de secao */
.resume-section { margin-top: 44px; }
.resume-label {
  font-family: var(--font-mono); font-weight: 500; font-size: 12px;
  letter-spacing: 0.16em; text-transform: uppercase; color: var(--brand-600);
  padding-bottom: 8px; border-bottom: var(--hairline); margin: 0 0 20px;
}

/* Experiencia */
.resume-job-head {
  display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap;
}
.resume-job-title {
  font-family: var(--font-display); font-weight: 700; font-size: 19px;
  letter-spacing: -0.015em; color: var(--ink-900); margin: 0;
  overflow-wrap: break-word; text-wrap: wrap; text-wrap: pretty;
}
.resume-job-meta {
  margin-left: auto; display: flex; gap: 20px;
  font-family: var(--font-mono); font-size: 12px; color: var(--ink-600);
}
.resume-job + .resume-job { margin-top: 28px; }
.resume-job-summary { margin: 8px 0 0; color: var(--ink-600); font-size: 15px; }
.resume-bullets { list-style: none; margin: 12px 0 0; padding: 0; }
.resume-bullets li {
  position: relative; padding-left: 18px; margin-bottom: 10px;
  font-size: 15px; line-height: 1.65; color: var(--ink-700);
}
.resume-bullets li::before {
  content: ""; position: absolute; left: 0; top: 0.62em;
  width: 8px; height: 1px; background: var(--ink-600);
}

/* Duas colunas */
.resume-cols { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; }
.resume-block { margin-bottom: 22px; }
.resume-block-title {
  font-family: var(--font-display); font-weight: 700; font-size: 16px;
  color: var(--ink-900); margin: 0 0 4px;
}
.resume-block-body { font-size: 15px; line-height: 1.65; color: var(--ink-600); }

.resume-edu { margin-bottom: 20px; }
.resume-edu-name {
  font-family: var(--font-display); font-weight: 700; font-size: 16px;
  color: var(--ink-900); margin: 0; line-height: 1.3;
}
.resume-edu-meta {
  margin-top: 4px; display: flex; justify-content: space-between; gap: 16px;
  font-family: var(--font-mono); font-size: 12px; color: var(--ink-600);
}
.resume-edu-when { white-space: nowrap; }
.resume-edu-note { margin-top: 6px; font-size: 14px; line-height: 1.6; color: var(--ink-600); }

@media (max-width: 720px) {
  .resume-cols { grid-template-columns: 1fr; gap: 0; }
  .resume-contact { text-align: left; }
  .resume-job-meta { margin-left: 0; width: 100%; }
}

/* Impressao: esta pagina E o PDF. branding/resume/capture.mjs imprime esta
   rota, entao o que muda aqui muda no arquivo baixado. Some o cromo do site
   e a escala cai para caber em uma folha A4. */
@page { size: A4; margin: 12mm 14mm; }

@media print {
  .site-header, .site-footer, .resume-actions, .skip-link { display: none !important; }
  .page { padding: 0 !important; min-height: 0 !important; display: block !important; }
  .page-inner { max-width: none !important; width: 100% !important; }
  .resume-doc { max-width: none; }

  .resume-name { font-size: 22pt; }
  .resume-role { font-size: 8.5pt; margin-top: 4px; }
  .resume-contact { font-size: 10pt; line-height: 1.5; }
  .resume-site { font-size: 8.5pt; margin-top: 5px; }
  .resume-intro { font-size: 10pt; line-height: 1.45; margin-top: 12px; }

  .resume-section { margin-top: 14px; }
  .resume-label {
    font-size: 8.5pt; padding-bottom: 4px; margin-bottom: 8px;
  }

  .resume-job + .resume-job { margin-top: 10px; }
  .resume-job-title { font-size: 11pt; }
  .resume-job-meta { font-size: 8.5pt; gap: 12px; }
  .resume-job-summary { font-size: 10pt; line-height: 1.45; margin-top: 4px; }
  .resume-bullets { margin-top: 5px; }
  .resume-bullets li {
    font-size: 10pt; line-height: 1.45; margin-bottom: 3px; padding-left: 12px;
  }
  .resume-bullets li:last-child { margin-bottom: 0; }
  .resume-bullets li::before { width: 4px; top: 0.52em; }

  .resume-cols { gap: 10mm; }
  .resume-block { margin-bottom: 10px; }
  .resume-block:last-child { margin-bottom: 0; }
  .resume-block-title { font-size: 10.5pt; margin-bottom: 2px; }
  .resume-block-body { font-size: 10pt; line-height: 1.45; }

  .resume-edu { margin-bottom: 9px; }
  .resume-edu:last-child { margin-bottom: 0; }
  .resume-edu-name { font-size: 10.5pt; }
  .resume-edu-meta { font-size: 8.5pt; margin-top: 2px; }
  .resume-edu-note { font-size: 10pt; line-height: 1.4; margin-top: 2px; }

  .resume-edu, .resume-block, .resume-job { break-inside: avoid; page-break-inside: avoid; }
}
      `}),e.jsx(o,{active:"resume"}),e.jsx("main",{id:"main",className:"page",children:e.jsx("div",{className:"page-inner",children:e.jsxs("article",{className:"resume-doc",children:[e.jsxs("div",{className:"resume-actions",children:[e.jsx("p",{className:"resume-actions-note",children:"Full resume below. The PDF has selectable text."}),e.jsx("a",{className:"btn btn--primary btn--sm",href:m,download:!0,children:"Download PDF"})]}),e.jsxs("header",{className:"resume-head",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"resume-name",children:t.name}),e.jsx("div",{className:"resume-role",children:t.role})]}),e.jsxs("ul",{className:"resume-contact",children:[t.contact.map(i=>e.jsx("li",{children:i.href?e.jsx("a",{href:i.href,children:i.value}):i.value},i.value)),e.jsx("li",{className:"resume-site",children:e.jsx("a",{href:t.site.href,children:t.site.value})})]})]}),e.jsx("p",{className:"resume-intro",children:t.intro}),e.jsxs("section",{className:"resume-section","aria-labelledby":"resume-exp",children:[e.jsx("h2",{className:"resume-label",id:"resume-exp",children:"Professional experience"}),t.experience.map(i=>e.jsx(s,{job:i},i.title))]}),e.jsxs("section",{className:"resume-section","aria-labelledby":"resume-edu-projects",children:[e.jsx("h2",{className:"resume-label",id:"resume-edu-projects",children:"Selected educational project"}),t.educationalProjects.map(i=>e.jsx(s,{job:i},i.title))]}),e.jsxs("div",{className:"resume-section resume-cols",children:[e.jsxs("section",{"aria-labelledby":"resume-skills",children:[e.jsx("h2",{className:"resume-label",id:"resume-skills",children:"Skills"}),t.skills.map(i=>e.jsxs("div",{className:"resume-block",children:[e.jsx("h3",{className:"resume-block-title",children:i.title}),e.jsx("div",{className:"resume-block-body",children:i.body})]},i.title))]}),e.jsxs("section",{"aria-labelledby":"resume-edu",children:[e.jsx("h2",{className:"resume-label",id:"resume-edu",children:"Education"}),t.education.map(i=>e.jsxs("div",{className:"resume-edu",children:[e.jsx("h3",{className:"resume-edu-name",children:i.name}),e.jsxs("div",{className:"resume-edu-meta",children:[e.jsx("span",{children:i.where}),e.jsx("span",{className:"resume-edu-when",children:i.when})]}),i.note&&e.jsx("p",{className:"resume-edu-note",children:i.note})]},i.name))]})]})]})})}),e.jsx(l,{})]})}export{p as default};
