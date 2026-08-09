import{u as j,r as o,j as e,A as R,m as U,L as v}from"./vendor-_eVBy7WR.js";import{j as E,E as L,D as H,k as F,b as G,S as C,T as c,e as P}from"./home-D69OED-q.js";const O={enter:i=>({x:i>0?"100%":"-100%"}),center:{x:"0%"},exit:i=>({x:i>0?"-100%":"100%"})};function W(i){if(i.length===0)return"";let s=i[0];for(const r of i.slice(1)){let t=0;for(;t<s.length&&t<r.length&&s[t]===r[t];)t++;s=s.slice(0,t)}const d=s.lastIndexOf(" ");return d>0?s.slice(0,d+1):s}function X({frames:i}){const s=j(),[d,r]=o.useState(!1),[t,b]=o.useState(!1),[k,g]=o.useState(!1),[N,w]=o.useState(0),[x,f]=o.useState(1),I=(d||t)&&!k,m=o.useMemo(()=>W(i.map(a=>a.phrase)),[i]),y=o.useMemo(()=>i.map(a=>a.phrase.slice(m.length)),[i,m]),{text:S,phraseIndex:M,progress:B,goTo:z}=E(y,{enabled:!s,paused:I}),l=s?N:M,n=i[l],A=s?y[l]:S,D=`${i[0].phrase}.`,h=(a,p=!1)=>{const u=(l+a+i.length)%i.length;p&&g(!0),f(a>0?1:-1),z(u),s&&w(u)},T=a=>{a.key==="ArrowLeft"?(a.preventDefault(),h(-1)):a.key==="ArrowRight"&&(a.preventDefault(),h(1))};return e.jsxs("section",{className:"story-hero","aria-label":"Introduction",tabIndex:0,onMouseEnter:()=>r(!0),onMouseLeave:()=>{r(!1)},onFocus:()=>b(!0),onBlur:a=>{a.currentTarget.contains(a.relatedTarget)||(b(!1),g(!1))},onKeyDown:T,children:[e.jsx("style",{children:`
.story-hero { display:flex; flex-direction:column; align-items:center; margin-bottom:72px; outline:none; }
.story-hero:focus-visible { outline:2px solid var(--brand-400); outline-offset:6px; border-radius:16px; }
.story-hero-bars { display:flex; gap:6px; width:100%; max-width:420px; margin-bottom:14px; }
.story-hero-bar { flex:1; height:3px; overflow:hidden; border-radius:999px; background:var(--ink-200); }
.story-hero-bar-fill { display:block; width:0; height:100%; border-radius:inherit; background:var(--brand-600); }
.story-hero-media { position:relative; width:100%; max-width:420px; aspect-ratio:4/5; border-radius:12px; border:1px solid var(--ink-200); box-shadow:0 12px 32px rgba(15,14,12,0.10); overflow:hidden; background:var(--ink-100); }
.story-hero-media img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:50% 30%; pointer-events:none; user-select:none; }
.story-hero-nav { position:absolute; inset-block:0; z-index:2; width:30%; padding:0; border:0; border-radius:0; background:transparent; cursor:pointer; touch-action:manipulation; }
.story-hero-nav--previous { left:0; }
.story-hero-nav--next { right:0; }
.story-hero-nav:focus-visible { outline:3px solid var(--ink-900); outline-offset:-3px; box-shadow:inset 0 0 0 6px var(--bg); }
.story-hero-line { margin:22px 0 0; font-family:var(--font-mono); font-size:clamp(18px, 2.6vw, 24px); line-height:1.45; min-height:2.9em; text-align:center; max-width:640px; color:var(--ink-900); font-weight:500; }
.story-hero-variable { color:var(--brand-600); }
.story-hero-caret { display:inline-block; width:0.55ch; height:1.05em; margin-left:2px; vertical-align:text-bottom; background:var(--brand-600); }
@media (max-width:768px) { .story-hero { margin-bottom:56px; } .story-hero-line { margin-top:18px; } }
      `}),e.jsx("div",{className:"story-hero-bars","aria-hidden":"true",children:i.map((a,p)=>{const u=s?0:p<l?100:p===l?B*100:0;return e.jsx("span",{className:"story-hero-bar",children:e.jsx("span",{className:"story-hero-bar-fill",style:{width:`${u}%`}})},a.phrase)})}),e.jsxs("div",{className:"story-hero-media",children:[s?e.jsx("img",{src:n.img,alt:n.alt,loading:l===0?"eager":"lazy",decoding:"async"},n.phrase):e.jsx(R,{mode:"popLayout",custom:x,children:e.jsx(U.img,{src:n.img,alt:n.alt,custom:x,variants:O,initial:"enter",animate:"center",exit:"exit",transition:{duration:H.base,ease:L.out},onAnimationComplete:()=>{x<0&&f(1)},loading:l===0?"eager":"lazy",decoding:"async"},n.phrase)}),e.jsx("button",{type:"button",className:"story-hero-nav story-hero-nav--previous","aria-label":"Previous photo",onClick:()=>h(-1,!0)}),e.jsx("button",{type:"button",className:"story-hero-nav story-hero-nav--next","aria-label":"Next photo",onClick:()=>h(1,!0)})]}),e.jsxs("h1",{className:"story-hero-line",children:[e.jsx("span",{className:"sr-only-stable",style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)",whiteSpace:"nowrap"},children:D}),e.jsxs("span",{"aria-hidden":"true",children:[m,e.jsx("span",{className:"story-hero-variable",children:A}),!s&&e.jsx(F,{className:"story-hero-caret"})]})]})]})}const V=[{img:"/assets/portfolio/2026/07/story-berlin.webp",alt:"Matthias by the Spree river in Berlin on a sunny day",phrase:"Hi! I'm Matthias and I am a UX/UI Designer"},{img:"/assets/portfolio/2026/07/story-spitz-bridge.webp",alt:"Matthias with his German Spitz on a wooden bridge in a park",phrase:"Hi! I'm Matthias and I am German and Brazilian"},{img:"/assets/portfolio/2026/07/story-spitz-daisy.webp",alt:"Matthias's German Spitz sniffing a daisy in the grass",phrase:"Hi! I'm Matthias and I was a Biology teacher"},{img:"/assets/portfolio/2026/07/story-cars.webp",alt:"Matthias sitting in front of classic sports cars at an exhibition",phrase:"Hi! I'm Matthias and I design in Figma and build in React"}];function J(){const i=j();return o.useEffect(()=>{G({title:"About Matthias Schaefle | UX/UI Designer in Berlin",description:"About Matthias Schaefle, a Brazilian-German UX/UI Designer in Berlin focused on user research, interface design, prototyping, and design systems.",path:"/about",ogTitle:"About Matthias Schaefle | UX/UI Designer in Berlin",ogDescription:"A research-driven UX/UI Designer in Berlin with a Brazilian-German background."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

/* LAYOUT BASE */
.page {
min-height: 100vh;
width: 100%;
padding: 152px 16px 104px;
display: flex;
flex-direction: column;
align-items: center;
}

.page-inner {
width: 100%;
max-width: 872px;
}

@media (max-width: 768px) {
.page {
min-height: auto;
padding-top: 120px;
padding-inline: 12px;
padding-bottom: 120px;
}
}

/* Hero antigo (avatar circular) removido: o StoryHero traz seus proprios
   estilos co-localizados no componente. */

/* SEÇÕES ABOUT */
.about-sections {
display: flex;
flex-direction: column;
gap: 40px;
margin-bottom: 72px;
}

.about-row {
display: flex;
gap: 40px;
align-items: flex-start;
}

.about-label {
flex: 0 0 190px;
padding-top: 4px;
margin: 0;
font-family: var(--font-mono);
font-size: var(--label-2-size);
text-transform: uppercase;
letter-spacing: var(--label-2-track);
color: var(--ink-600);
}

.about-label.case-section-label--multiline,
.about-label .case-section-label-text--multiline,
.about-label .case-section-label-line {
align-items: flex-start;
justify-content: flex-start;
text-align: left;
}

.about-body {
flex: 1 1 auto;
font-size: 16px;
line-height: 1.7;
color: var(--ink-700);
}

.about-body p {
margin: 0 0 12px;
}

.about-body p:last-child {
margin-bottom: 0;
}

.about-body a {
color: var(--ink);
text-decoration: underline;
text-decoration-color: var(--ink-300);
text-underline-offset: 3px;
}

.about-body a:hover {
text-decoration-color: var(--ink);
}

.about-highlights {
display: flex;
flex-direction: column;
gap: 18px;
}

.about-highlight-title {
font-family: var(--font-display);
font-size: 16px;
font-weight: 600;
margin: 0;
margin-bottom: 4px;
}

.about-highlight-text {
font-size: 15px;
line-height: 1.7;
color: var(--ink-600);
}

.about-skills-subtitle {
font-size: 15px;
line-height: 1.6;
color: var(--ink-600);
}

.about-skill-groups {
display: flex;
flex-direction: column;
gap: 20px;
margin-top: 20px;
}

.about-skill-title {
margin: 0 0 9px;
font-family: var(--font-display);
font-size: 15px;
font-weight: 600;
color: var(--ink-900);
}

.about-skill-note {
margin: -2px 0 10px;
font-size: 13px;
line-height: 1.6;
color: var(--ink-600);
}

.about-skill-list {
list-style: none;
margin: 0;
padding: 0;
display: flex;
flex-wrap: wrap;
gap: 8px;
}

.about-skill-chip {
padding: 5px 9px;
border: var(--hairline);
border-radius: 999px;
font-family: var(--font-mono);
font-size: 11px;
line-height: 1.45;
color: var(--ink-700);
background: var(--ink-100);
}

@media (max-width: 768px) {
.about-row {
flex-direction: column;
gap: 12px;
}

.about-label {
flex: 0 0 auto;
font-size: 12px;
letter-spacing: var(--label-2-track);
}
.about-body {
font-size: 15px;
}
}

/* COLOPHON */
.about-colophon {
margin-top: 40px;
padding-top: 40px;
border-top: var(--hairline);
}

.about-colophon-list {
list-style: none;
margin: 0;
padding: 0;
display: flex;
flex-direction: column;
gap: 8px;
font-family: var(--font-mono);
font-size: 12px;
line-height: 1.7;
letter-spacing: 0.02em;
color: var(--ink-600);
}

.about-colophon-key {
color: var(--ink-700);
}

`}),e.jsx(C,{active:"about"}),e.jsx("main",{id:"main",className:"page",children:e.jsxs("div",{className:"page-inner",children:[e.jsx(X,{frames:V}),e.jsxs("section",{className:"about-sections",children:[e.jsxs("div",{className:"about-row",children:[e.jsx(c,{className:"about-label",prefersReducedMotion:i,standalone:!0,children:"About"}),e.jsxs("div",{className:"about-body",children:[e.jsx("p",{children:"I started in Biology, doing field research: watching what animals actually do instead of what the hypothesis predicts. It trained me to observe real behavior before drawing conclusions."}),e.jsx("p",{children:"When I moved into design I kept the method: research first, screens second. I work as a freelancer today and I am looking for a product team where research drives decisions."})]})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(c,{className:"about-label",lineBreakAfter:"Brazil",prefersReducedMotion:i,standalone:!0,children:"From Brazil to Berlin"}),e.jsx("div",{className:"about-body",children:e.jsx("p",{children:"I was selected in Brazil for a two-year exchange in Munich, studying Biology at TUM. I earned my German B1 certificate, improved my English, and got to know my German relatives. I live in Berlin now, and that time abroad is why I adapt fast and take different perspectives seriously."})})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(c,{className:"about-label",lineBreakAfter:"differentiates",prefersReducedMotion:i,standalone:!0,children:"What differentiates me as a designer"}),e.jsx("div",{className:"about-body",children:e.jsxs("div",{className:"about-highlights",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"Research in the field, not the deck"}),e.jsxs("div",{className:"about-highlight-text",children:[e.jsx(v,{to:"/delivery",children:"Delivery"})," started with driver routes and interviews in Barbacena, not with wireframes. The flows came from routes of 80 to 130 stops a day."]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"Design that survives the client"}),e.jsxs("div",{className:"about-highlight-text",children:["I designed and delivered the ",e.jsx(v,{to:"/doctor",children:"Doctor"})," ","site in 2024. The client has updated it on their own ever since."]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"I build what I design"}),e.jsxs("div",{className:"about-highlight-text",children:["This site is my own React build, from the design tokens to the deploy. The ",e.jsx("a",{href:"#colophon",children:"colophon below"})," lists the stack."]})]})]})})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(c,{className:"about-label",prefersReducedMotion:i,standalone:!0,children:"Skills and tools"}),e.jsxs("div",{className:"about-body",children:[e.jsx("p",{className:"about-skills-subtitle",children:"What I use today and what I am building next."}),e.jsxs("div",{className:"about-skill-groups",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Design"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"User research"}),e.jsx("li",{className:"about-skill-chip",children:"Interviews"}),e.jsx("li",{className:"about-skill-chip",children:"Field observation"}),e.jsx("li",{className:"about-skill-chip",children:"Wireframing"}),e.jsx("li",{className:"about-skill-chip",children:"Prototyping"}),e.jsx("li",{className:"about-skill-chip",children:"Design systems"}),e.jsx("li",{className:"about-skill-chip",children:"Accessibility (WCAG AA)"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Build"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"Figma"}),e.jsx("li",{className:"about-skill-chip",children:"React"}),e.jsx("li",{className:"about-skill-chip",children:"Vite"}),e.jsx("li",{className:"about-skill-chip",children:"framer-motion"}),e.jsx("li",{className:"about-skill-chip",children:"HTML/CSS"}),e.jsx("li",{className:"about-skill-chip",children:"JavaScript"}),e.jsx("li",{className:"about-skill-chip",children:"Git"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Skills in development"}),e.jsx("p",{className:"about-skill-note",children:"AI Software Development program at WBS Coding School. Berufssprachkurs B2 followed by the coding curriculum."}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"TypeScript"}),e.jsx("li",{className:"about-skill-chip",children:"Node.js"}),e.jsx("li",{className:"about-skill-chip",children:"Express"}),e.jsx("li",{className:"about-skill-chip",children:"MongoDB"}),e.jsx("li",{className:"about-skill-chip",children:"REST APIs"}),e.jsx("li",{className:"about-skill-chip",children:"LLM integration"}),e.jsx("li",{className:"about-skill-chip",children:"AI agents"}),e.jsx("li",{className:"about-skill-chip",children:"n8n automation"}),e.jsx("li",{className:"about-skill-chip",children:"AI-assisted development"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Languages"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"Portuguese (native)"}),e.jsx("li",{className:"about-skill-chip",children:"English"}),e.jsx("li",{className:"about-skill-chip",children:"German (B1)"})]})]})]})]})]})]}),e.jsx("section",{className:"about-colophon",id:"colophon","aria-labelledby":"colophon-heading",children:e.jsxs("div",{className:"about-row",children:[e.jsx(c,{className:"about-label",id:"colophon-heading",lineBreakAfter:"site",prefersReducedMotion:i,standalone:!0,children:"How this site was built"}),e.jsx("div",{className:"about-body",children:e.jsxs("ul",{className:"about-colophon-list",children:[e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Stack:"})," ","React 19, Vite 7, framer-motion 12"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Styling:"})," ","custom design tokens, no UI framework"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Motion:"})," ","respects prefers-reduced-motion in CSS and in components"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Imagery:"})," ","custom mockup components, no stock screenshots"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Loading:"})," ","code-splitting per route"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Deploy:"})," ","build pushed to a deploy branch, published automatically"]})]})})]})})]})}),e.jsx(P,{})]})}export{J as default};
