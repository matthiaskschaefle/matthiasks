import{r as i,j as e,m as T,u as L,A as U,L as B}from"./vendor-_JLX-0fG.js";import{E as P,D as H,b as C,S as F,T as A,d as G}from"./home-BS55cQ7z.js";const O=88,X=45,Y=1500,V=260,W=50;function _(t,{enabled:n,paused:a}){const[r,l]=i.useState(0),[v,N]=i.useState(0),[b,j]=i.useState(!1),[z,E]=i.useState(0),[k,I]=i.useState({phraseIndex:0,value:0}),h=i.useRef(null),f=i.useRef({remaining:null,startedAt:null}),u=i.useRef(null),c=i.useRef(null),w=i.useRef(null),M=i.useRef(a),R=i.useRef(0),d=t[r]??t[0]??"";i.useEffect(()=>{if(!n||a)return;const o=f.current,m=t[r]??t[0]??"",x=v===m.length,D=v===0,s=b?D?V:X:x?Y:O,y=o.remaining??s;o.remaining=y,o.startedAt=performance.now();const g=window.setTimeout(()=>{if(h.current=null,o.remaining=null,o.startedAt=null,!b&&x){j(!0);return}if(b&&D){j(!1),l(S=>(S+1)%t.length);return}N(S=>S+(b?-1:1))},y);return h.current=g,()=>{if(window.clearTimeout(g),h.current===g&&(h.current=null),o.startedAt!==null){const S=performance.now()-o.startedAt;o.remaining=Math.max(0,(o.remaining??s)-S),o.startedAt=null}}},[z,v,n,b,a,r,t]),i.useEffect(()=>{M.current=a,R.current=d.length*133+1760},[d.length,a]),i.useEffect(()=>{if(!n){u.current!==null&&c.current===null&&(c.current=performance.now());return}if(w.current!==r){w.current=r,u.current=performance.now(),c.current=a?performance.now():null;return}a&&c.current===null?c.current=performance.now():!a&&c.current!==null&&(u.current+=performance.now()-c.current,c.current=null)},[n,a,r]),i.useEffect(()=>{if(!n)return;const o=window.setInterval(()=>{if(M.current||u.current===null)return;const m=performance.now()-u.current;I({phraseIndex:w.current,value:Math.min(1,m/R.current)})},W);return()=>window.clearInterval(o)},[n]);const p=i.useCallback(o=>{if(t.length===0)return;const m=(o%t.length+t.length)%t.length;h.current!==null&&(window.clearTimeout(h.current),h.current=null),f.current.remaining=null,f.current.startedAt=null,w.current=m,u.current=performance.now(),c.current=n&&!a?null:performance.now(),N(0),j(!1),l(m),I({phraseIndex:m,value:0}),E(x=>x+1)},[n,a,t.length]);return n?{text:d.slice(0,v),phraseIndex:r,progress:k.phraseIndex===r?k.value:0,goTo:p}:{text:t[0]??"",phraseIndex:0,progress:1,goTo:p}}function K({className:t}){return e.jsx(T.span,{className:t,"aria-hidden":"true",initial:{opacity:1},animate:{opacity:[0,1,1,0]},transition:{duration:.85,repeat:1/0,repeatDelay:.12,times:[0,.08,.58,1]}})}const $={enter:t=>({x:t>0?"100%":"-100%"}),center:{x:"0%"},exit:t=>({x:t>0?"-100%":"100%"})};function J(t){if(t.length===0)return"";let n=t[0];for(const r of t.slice(1)){let l=0;for(;l<n.length&&l<r.length&&n[l]===r[l];)l++;n=n.slice(0,l)}const a=n.lastIndexOf(" ");return a>0?n.slice(0,a+1):n}function q({frames:t,heading:n}){const a=L(),[r,l]=i.useState(!1),[v,N]=i.useState(!1),[b,j]=i.useState(!1),[z,E]=i.useState(0),[k,I]=i.useState(1),h=(r||v)&&!b,f=i.useMemo(()=>J(t.map(s=>s.phrase)),[t]),u=i.useMemo(()=>t.map(s=>s.phrase.slice(f.length)),[t,f]),{text:c,phraseIndex:w,progress:M,goTo:R}=_(u,{enabled:!a,paused:h}),d=a?z:w,p=t[d],o=a?u[d]:c,m=`${t[0].phrase}.`,x=(s,y=!1)=>{const g=(d+s+t.length)%t.length;y&&j(!0),I(s>0?1:-1),R(g),a&&E(g)},D=s=>{s.key==="ArrowLeft"?(s.preventDefault(),x(-1)):s.key==="ArrowRight"&&(s.preventDefault(),x(1))};return e.jsxs("section",{className:"story-hero","aria-label":"Introduction",tabIndex:0,onMouseEnter:()=>l(!0),onMouseLeave:()=>{l(!1)},onFocus:()=>N(!0),onBlur:s=>{s.currentTarget.contains(s.relatedTarget)||(N(!1),j(!1))},onKeyDown:D,children:[e.jsx("style",{children:`
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
.story-hero-line--static { min-height:0; }
.story-hero-variable { color:var(--brand-600); }
.story-hero-caret { display:inline-block; width:0.55ch; height:1.05em; margin-left:2px; vertical-align:text-bottom; background:var(--brand-600); }
@media (max-width:768px) { .story-hero { margin-bottom:56px; } .story-hero-line { margin-top:18px; } }
      `}),e.jsx("div",{className:"story-hero-bars","aria-hidden":"true",children:t.map((s,y)=>{const g=a?0:y<d?100:y===d?M*100:0;return e.jsx("span",{className:"story-hero-bar",children:e.jsx("span",{className:"story-hero-bar-fill",style:{width:`${g}%`}})},s.phrase)})}),e.jsxs("div",{className:"story-hero-media",children:[a?e.jsx("img",{src:p.img,alt:p.alt,loading:d===0?"eager":"lazy",decoding:"async"},p.phrase):e.jsx(U,{mode:"popLayout",custom:k,children:e.jsx(T.img,{src:p.img,alt:p.alt,custom:k,variants:$,initial:"enter",animate:"center",exit:"exit",transition:{duration:H.base,ease:P.out},onAnimationComplete:()=>{k<0&&I(1)},loading:d===0?"eager":"lazy",decoding:"async"},p.phrase)}),e.jsx("button",{type:"button",className:"story-hero-nav story-hero-nav--previous","aria-label":"Previous photo",onClick:()=>x(-1,!0)}),e.jsx("button",{type:"button",className:"story-hero-nav story-hero-nav--next","aria-label":"Next photo",onClick:()=>x(1,!0)})]}),n?e.jsx("h1",{className:"story-hero-line story-hero-line--static",children:n}):e.jsxs("h1",{className:"story-hero-line",children:[e.jsx("span",{className:"sr-only-stable",style:{position:"absolute",width:1,height:1,overflow:"hidden",clip:"rect(0 0 0 0)",whiteSpace:"nowrap"},children:m}),e.jsxs("span",{"aria-hidden":"true",children:[f,e.jsx("span",{className:"story-hero-variable",children:o}),!a&&e.jsx(K,{className:"story-hero-caret"})]})]})]})}const Q=[{img:"/assets/portfolio/2026/07/story-berlin.webp",alt:"Matthias by the Spree river in Berlin on a sunny day",phrase:"Hi! I'm Matthias and I am a UX/UI Designer"},{img:"/assets/portfolio/2026/07/story-spitz-bridge.webp",alt:"Matthias with his German Spitz on a wooden bridge in a park",phrase:"Hi! I'm Matthias and I am German and Brazilian"},{img:"/assets/portfolio/2026/07/story-spitz-daisy.webp",alt:"Matthias's German Spitz sniffing a daisy in the grass",phrase:"Hi! I'm Matthias and I changed careers into UX/UI design"},{img:"/assets/portfolio/2026/07/story-cars.webp",alt:"Matthias sitting in front of classic sports cars at an exhibition",phrase:"Hi! I'm Matthias and I design in Figma and build in React"}];function te(){const t=L();return i.useEffect(()=>{C({title:"About Matthias Schaefle | UX/UI Designer in Berlin",description:"About Matthias Schaefle, a Brazilian-German UX/UI Designer in Berlin focused on user research, interface design, prototyping, and design systems.",path:"/about",ogTitle:"About Matthias Schaefle | UX/UI Designer in Berlin",ogDescription:"A research-driven UX/UI Designer in Berlin with a Brazilian-German background."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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

`}),e.jsx(F,{active:"about"}),e.jsx("main",{id:"main",className:"page",children:e.jsxs("div",{className:"page-inner",children:[e.jsx(q,{frames:Q,heading:"About Matthias Schaefle"}),e.jsxs("section",{className:"about-sections",children:[e.jsxs("div",{className:"about-row",children:[e.jsx(A,{className:"about-label",prefersReducedMotion:t,standalone:!0,children:"About"}),e.jsxs("div",{className:"about-body",children:[e.jsx("p",{children:"Today I work as a freelance UX/UI Designer in Berlin. My work covers user research, interaction design, interface design, and implementation for selected web projects."}),e.jsx("p",{children:"I am looking for a product team where I can contribute across discovery and delivery, while continuing to deepen my experience in digital products."})]})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(A,{className:"about-label",lineBreakAfter:"Brazil",prefersReducedMotion:t,standalone:!0,children:"From Brazil to Berlin"}),e.jsx("div",{className:"about-body",children:e.jsx("p",{children:"I first lived in Germany during a two-year academic exchange in Munich. I now live in Berlin and hold German and Brazilian citizenship. Working across Portuguese, English, and German environments has made me comfortable adapting to different teams and contexts."})})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(A,{className:"about-label",lineBreakAfter:"differentiates",prefersReducedMotion:t,standalone:!0,children:"What differentiates me as a designer"}),e.jsx("div",{className:"about-body",children:e.jsxs("div",{className:"about-highlights",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"Research grounded in real workflows"}),e.jsxs("div",{className:"about-highlight-text",children:["For ",e.jsx(B,{to:"/delivery",children:"Delivery"}),", I observed routes and interviewed couriers handling 80 to 130 stops a day before defining the redesigned flow."]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"Design clients can maintain"}),e.jsxs("div",{className:"about-highlight-text",children:["For ",e.jsx(B,{to:"/doctor",children:"Doctor"}),", I delivered a website and visual identity that the client has maintained independently since 2024."]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-highlight-title",children:"Prototypes close to implementation"}),e.jsxs("div",{className:"about-highlight-text",children:["I use React and Vite to prototype and build responsive interfaces, including ",e.jsx("a",{href:"#colophon",children:"this portfolio"}),"."]})]})]})})]}),e.jsxs("div",{className:"about-row",children:[e.jsx(A,{className:"about-label",prefersReducedMotion:t,standalone:!0,children:"Skills and tools"}),e.jsxs("div",{className:"about-body",children:[e.jsx("p",{className:"about-skills-subtitle",children:"What I use today."}),e.jsxs("div",{className:"about-skill-groups",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Design"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"User research"}),e.jsx("li",{className:"about-skill-chip",children:"Interviews"}),e.jsx("li",{className:"about-skill-chip",children:"Field observation"}),e.jsx("li",{className:"about-skill-chip",children:"Wireframing"}),e.jsx("li",{className:"about-skill-chip",children:"Prototyping"}),e.jsx("li",{className:"about-skill-chip",children:"Design systems"}),e.jsx("li",{className:"about-skill-chip",children:"Accessibility fundamentals"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Build"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"Figma"}),e.jsx("li",{className:"about-skill-chip",children:"React"}),e.jsx("li",{className:"about-skill-chip",children:"Vite"}),e.jsx("li",{className:"about-skill-chip",children:"framer-motion"}),e.jsx("li",{className:"about-skill-chip",children:"HTML/CSS"}),e.jsx("li",{className:"about-skill-chip",children:"JavaScript"}),e.jsx("li",{className:"about-skill-chip",children:"Git"})]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Currently studying"}),e.jsx("p",{className:"about-skill-note",children:"I am completing the German B2 phase of a WBS Weiterbildung. The front-end and AI technical curriculum begins afterward."})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"about-skill-title",children:"Languages"}),e.jsxs("ul",{className:"about-skill-list",children:[e.jsx("li",{className:"about-skill-chip",children:"Portuguese (native)"}),e.jsx("li",{className:"about-skill-chip",children:"English"}),e.jsx("li",{className:"about-skill-chip",children:"German (B1 certified; B2 professional course in progress)"})]})]})]})]})]})]}),e.jsx("section",{className:"about-colophon",id:"colophon","aria-labelledby":"colophon-heading",children:e.jsxs("div",{className:"about-row",children:[e.jsx(A,{className:"about-label",id:"colophon-heading",lineBreakAfter:"site",prefersReducedMotion:t,standalone:!0,children:"How this site was built"}),e.jsx("div",{className:"about-body",children:e.jsxs("ul",{className:"about-colophon-list",children:[e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Stack:"})," ","React 19, Vite 7, framer-motion 12"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Styling:"})," ","custom design tokens, no UI framework"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Motion:"})," ","respects prefers-reduced-motion in CSS and in components"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Imagery:"})," ","custom mockup components, no stock screenshots"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Loading:"})," ","code-splitting per route"]}),e.jsxs("li",{children:[e.jsx("span",{className:"about-colophon-key",children:"Deploy:"})," ","build pushed to a deploy branch, published automatically"]})]})})]})})]})}),e.jsx(G,{})]})}export{te as default};
