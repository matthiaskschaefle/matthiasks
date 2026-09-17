import{r as n,j as e,m as l}from"./vendor-_JLX-0fG.js";import{b as s,S as d,a as o,g as c,d as p,v as g,s as m}from"./home-BS55cQ7z.js";const a={name:"Matthias Karl Schaefle",street:"Albrechtstraße 35",postal:"12167",city:"Berlin",country:"Germany",email:"matthias.k.schaefle@gmail.com",phone:"+49 1520 5830511",phoneHref:"tel:+4915205830511"},h=[{value:"0",label:"cookies",note:"None are set, so no banner is needed."},{value:"0",label:"trackers",note:"No analytics, no pixels, no session recording."},{value:"0",label:"third-party requests",note:"Fonts and media are served from this domain."}];function i({label:t,children:r}){return e.jsxs(l.section,{className:"legal-section",variants:m,initial:"hidden",whileInView:"visible",viewport:g,children:[e.jsx("h2",{className:"legal-section-label",children:t}),e.jsx("div",{className:"legal-section-body",children:r})]})}function v(){return n.useEffect(()=>{s({title:"Impressum and Privacy | Matthias Schaefle",description:"Legal notice under §5 DDG and privacy information for matthiasks.com. The site sets no cookies, uses no analytics and loads no third-party resources.",path:"/legal",ogTitle:"Impressum and Privacy",ogDescription:"Legal notice and privacy information for matthiasks.com."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
/* .page e .page-inner nao sao globais: cada pagina declara os seus dentro do
   proprio <style>. Sem isto o header flutuante cobre o topo do conteudo. */
.page { min-height: 100vh; width: 100%; padding: 140px 16px 96px; display: flex; flex-direction: column; align-items: center; }
.page-inner { width: 100%; max-width: 872px; }
@media (max-width: 900px) { .page { padding: 120px 16px 64px; } }

/* ── HERO ── */
.legal-hero { position: relative; margin-bottom: 8px; }
.legal-hero-backdrop {
  position: absolute; top: -160px; right: -200px; width: 520px; height: 520px;
  border-radius: 50%; pointer-events: none; z-index: 0;
  background: radial-gradient(circle at 35% 35%, rgba(var(--accent-rgb),0.10) 0%, rgba(var(--accent-rgb),0.045) 40%, transparent 70%);
}
@media (max-width: 900px) { .legal-hero-backdrop { display: none; } }
.legal-eyebrow {
  position: relative; z-index: 1;
  font-family: var(--font-mono); font-size: var(--label-1-size);
  text-transform: uppercase; letter-spacing: var(--label-1-track);
  color: var(--ink-600); margin: 0 0 14px;
}
.legal-title {
  position: relative; z-index: 1;
  font-family: var(--font-display); font-size: 40px; font-weight: 500;
  letter-spacing: -0.02em; line-height: 1.1; margin: 0 0 14px; color: var(--ink);
}
.legal-lead {
  position: relative; z-index: 1;
  font-family: var(--font-body); font-size: 17px; line-height: 1.7;
  color: var(--ink-600); margin: 0; max-width: 46ch;
}

/* ── SECOES: mesma grade de rotulo + corpo dos cases ── */
.legal-section {
  display: grid; grid-template-columns: minmax(120px, 190px) minmax(0, 1fr);
  gap: 20px 40px; padding-block: 36px; border-top: var(--hairline);
}
.legal-section:first-of-type { margin-top: 40px; }
.legal-section-label {
  align-self: start; margin: 0; padding-top: 4px;
  font-family: var(--font-mono); font-size: var(--label-2-size); font-weight: 400;
  text-transform: uppercase; letter-spacing: var(--label-2-track);
  color: var(--ink-600); opacity: 0.75;
}
.legal-section-body { min-width: 0; max-width: var(--measure-body); }
.legal-h3 {
  font-family: var(--font-display); font-size: 21px; font-weight: 500;
  letter-spacing: -0.01em; margin: 0 0 12px; color: var(--ink);
}
.legal-text {
  font-family: var(--font-body); font-size: 16px; line-height: 1.8;
  color: var(--ink-800); margin: 0 0 14px;
}
.legal-text:last-child { margin-bottom: 0; }
.legal-text a { color: var(--ink-900); text-decoration: underline; text-underline-offset: 3px; text-decoration-color: var(--ink-300); }
.legal-text a:hover { text-decoration-color: var(--brand-600); }

/* ── CARTAO DO ENDERECO ── */
.legal-card {
  border: 1px solid rgba(168,163,153,0.28); border-radius: 20px;
  padding: 28px 32px; background: linear-gradient(140deg, var(--ink-50) 0%, rgba(var(--accent-rgb),0.035) 100%);
}
.legal-address { font-style: normal; margin: 0; }
.legal-address-name {
  font-family: var(--font-display); font-size: 19px; font-weight: 500;
  color: var(--ink); margin-bottom: 10px;
}
.legal-address-lines {
  font-family: var(--font-body); font-size: 16px; line-height: 1.7; color: var(--ink-700);
}
.legal-address-contact {
  margin-top: 18px; padding-top: 16px; border-top: 1px solid rgba(168,163,153,0.28);
  display: flex; flex-direction: column; gap: 6px;
}
.legal-address-contact a {
  font-family: var(--font-body); font-size: 15px; color: var(--ink-900);
  text-decoration: none; width: fit-content; position: relative;
  border-bottom: 1px solid var(--ink-300); padding-bottom: 1px;
  transition: border-color .16s ease, color .16s ease;
}
.legal-address-contact a::before { content: ""; position: absolute; inset: -10px -6px; }
.legal-address-contact a:hover,
.legal-address-contact a:focus-visible { color: var(--brand-700); border-color: var(--brand-600); }
@media (max-width: 768px) { .legal-card { padding: 22px 20px; } }

/* ── FATOS DE PRIVACIDADE ── */
.legal-facts {
  display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px; margin: 4px 0 24px;
}
.legal-fact { padding-top: 14px; border-top: var(--hairline); min-width: 0; }
.legal-fact-value {
  font-family: var(--font-display); font-size: 38px; font-weight: 600; line-height: 1;
  color: var(--brand-700); letter-spacing: -0.02em;
}
.legal-fact-label {
  font-family: var(--font-mono); font-size: 12px; font-weight: 600;
  color: var(--ink-900); letter-spacing: 0.01em; margin-top: 8px;
}
.legal-fact-note {
  font-family: var(--font-body); font-size: 13px; line-height: 1.6;
  color: var(--ink-600); margin-top: 5px;
}
@media (max-width: 900px) { .legal-facts { grid-template-columns: 1fr; gap: 14px; } }

.legal-updated {
  font-family: var(--font-mono); font-size: var(--label-1-size);
  text-transform: uppercase; letter-spacing: var(--label-1-track);
  color: var(--ink-600); margin: 36px 0 0; padding-top: 20px; border-top: var(--hairline);
}

@media (max-width: 900px) {
  .legal-section { grid-template-columns: 1fr; gap: 14px; padding-block: 30px; }
  .legal-title { font-size: 32px; }
  .legal-lead { font-size: 16px; }
}
      `}),e.jsx(d,{}),e.jsx("main",{id:"main",className:"page",children:e.jsxs("div",{className:"page-inner",children:[e.jsxs(l.header,{className:"legal-hero",initial:"hidden",animate:"visible",variants:o,children:[e.jsx("div",{className:"legal-hero-backdrop","aria-hidden":"true"}),e.jsx("p",{className:"legal-eyebrow",children:"Impressum & Datenschutz"}),e.jsx("h1",{className:"legal-title",children:"Who runs this site, and what it does with your data"}),e.jsx("p",{className:"legal-lead",children:"Legal notice under §5 DDG. The data part is short, because this site collects nothing."})]}),e.jsx(i,{label:"Responsible for content",children:e.jsx("div",{className:"legal-card",children:e.jsxs("address",{className:"legal-address",children:[e.jsx("div",{className:"legal-address-name",children:a.name}),e.jsxs("div",{className:"legal-address-lines",children:[a.street,e.jsx("br",{}),a.postal," ",a.city,e.jsx("br",{}),a.country]}),e.jsxs("div",{className:"legal-address-contact",children:[e.jsx("a",{href:`mailto:${a.email}`,children:a.email}),e.jsx("a",{href:a.phoneHref,children:a.phone})]})]})})}),e.jsxs(i,{label:"Privacy",children:[e.jsx("h3",{className:"legal-h3",children:"Nothing to opt out of"}),e.jsx(l.div,{className:"legal-facts",variants:c,children:h.map(t=>e.jsxs(l.div,{className:"legal-fact",variants:o,children:[e.jsx("div",{className:"legal-fact-value",children:t.value}),e.jsx("div",{className:"legal-fact-label",children:t.label}),e.jsx("p",{className:"legal-fact-note",children:t.note})]},t.label))}),e.jsx("p",{className:"legal-text",children:"There is no contact form. If you write to the address above, that email is processed by my mail provider for the purpose of answering you, and kept no longer than that correspondence requires."}),e.jsx("p",{className:"legal-text",children:"The site is served as static files. Standard server logs may record the request, and they are not used to build a profile or linked to anything else."}),e.jsx("p",{className:"legal-text",children:"Links to LinkedIn, Figma and other external sites are ordinary links. Nothing is sent to them until you choose to follow one, and from that point their own policies apply."})]}),e.jsx(i,{label:"Your rights",children:e.jsx("p",{className:"legal-text",children:"Under the GDPR you can ask what personal data I hold about you, and ask for it to be corrected or deleted. Write to the address above. You also have the right to complain to a supervisory authority."})}),e.jsxs(i,{label:"Content",children:[e.jsx("p",{className:"legal-text",children:"Case studies are published with the permission of the clients involved. One case is covered by a non-disclosure agreement: the client name and visual identity in it have been altered, and the screens shown use placeholder data, not real customer records."}),e.jsx("p",{className:"legal-updated",children:"Last updated: September 2026"})]})]})}),e.jsx(p,{tagline:"Legal notice and privacy."})]})}export{v as default};
