import{r as c,j as e,L,N as z,m as w,u as R}from"./vendor-_JLX-0fG.js";const y={fast:.25,base:.4,slow:.6,float:3},u={out:[.2,0,0,1],inOut:[.4,0,.2,1]},D={fast:.08,base:.1},je={hidden:{opacity:0,y:16},visible:{opacity:1,y:0,transition:{duration:y.base,ease:u.out}}},Ne=(t=0,i=!1)=>({initial:i?{opacity:0}:{opacity:0,y:12},animate:i?{opacity:1}:{opacity:1,y:0},transition:{duration:i?.1:y.base,ease:u.out,delay:i?0:t*D.base}}),te={hidden:{opacity:0},visible:{opacity:1,transition:{duration:y.slow,ease:u.out}}},Ce={hidden:{opacity:0,scale:.97},visible:{opacity:1,scale:1,transition:{duration:y.slow,ease:u.out}}},Se={animate:{y:[0,-10,0],transition:{duration:y.float,ease:u.inOut,repeat:1/0,repeatType:"loop"}}},Ie={hidden:{opacity:0},visible:{opacity:1,transition:{duration:y.slow,ease:u.out,staggerChildren:.12,delayChildren:.05}}},Ee={hidden:{},visible:{transition:{staggerChildren:D.fast}}},Me=(t=0,i=!1)=>({hidden:i?{opacity:0}:{opacity:0,y:36,rotate:t*2.5,scale:.97},visible:{opacity:1,...i?{}:{y:0,rotate:t,scale:1},transition:{duration:y.slow,ease:u.out}}}),Le=(t=!1)=>({hidden:t?{}:{scaleX:0},visible:{scaleX:1,transition:{duration:.9,ease:u.out,delay:.15}}}),ie={once:!0,amount:"some",margin:"0px 0px 20% 0px"},Ve=()=>typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,A="https://matthiasks.com",U=`${A}/assets/portfolio/og-cover-2026-07.png`;function l(t,i,o,n){let s=document.head.querySelector(t);s||(s=document.createElement("meta"),s.setAttribute(i,o),document.head.appendChild(s)),s.setAttribute("content",n)}function oe(t){let i=document.head.querySelector('link[rel="canonical"]');i||(i=document.createElement("link"),i.setAttribute("rel","canonical"),document.head.appendChild(i)),i.setAttribute("href",t)}function ae({title:t,description:i,path:o="/",ogTitle:n=t,ogDescription:s=i,robots:p="index, follow"}){const r=o==="/"?`${A}/`:`${A}${o}`;document.title=t,l('meta[name="description"]',"name","description",i),l('meta[name="author"]',"name","author","Matthias Schaefle"),l('meta[name="robots"]',"name","robots",p),l('meta[property="og:title"]',"property","og:title",n),l('meta[property="og:description"]',"property","og:description",s),l('meta[property="og:type"]',"property","og:type","website"),l('meta[property="og:locale"]',"property","og:locale","en_US"),l('meta[property="og:site_name"]',"property","og:site_name","Matthias Schaefle"),l('meta[property="og:url"]',"property","og:url",r),l('meta[property="og:image"]',"property","og:image",U),l('meta[property="og:image:width"]',"property","og:image:width","1200"),l('meta[property="og:image:height"]',"property","og:image:height","630"),l('meta[property="og:image:alt"]',"property","og:image:alt","Matthias Schaefle UX/UI design portfolio"),l('meta[name="twitter:card"]',"name","twitter:card","summary_large_image"),l('meta[name="twitter:title"]',"name","twitter:title",n),l('meta[name="twitter:description"]',"name","twitter:description",s),l('meta[name="twitter:image"]',"name","twitter:image",U),l('meta[name="twitter:image:alt"]',"name","twitter:image:alt","Matthias Schaefle UX/UI design portfolio"),oe(r)}const se="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_2017_3006)'%3e%3ccircle%20cx='32'%20cy='32'%20r='30.1538'%20stroke='%23202124'%20stroke-width='3.69231'/%3e%3cpath%20d='M13.8852%2024.8497H17.8768C18.0571%2025.506%2018.1869%2026.1514%2018.2662%2026.786C18.4681%2025.9783%2018.8071%2025.4339%2019.2831%2025.1526C19.6292%2024.9507%2020.2061%2024.8497%2021.0138%2024.8497C21.4826%2024.8497%2021.8792%2024.8714%2022.2037%2024.9146C22.7302%2024.9868%2023.1484%2025.2644%2023.4585%2025.7476C23.5956%2025.9711%2023.7254%2026.3173%2023.848%2026.786C24.0499%2026.0721%2024.3131%2025.5889%2024.6376%2025.3365C25.0559%2025.012%2025.7446%2024.8497%2026.7037%2024.8497C27.36%2024.8497%2027.8648%2024.9038%2028.2181%2025.012C28.6869%2025.1634%2029.0186%2025.5204%2029.2133%2026.0829C29.3287%2026.4074%2029.3864%2026.9663%2029.3864%2027.7596V39.6154H25.4273V29.6418C25.4273%2029.2163%2025.3984%2028.9243%2025.3407%2028.7656C25.2254%2028.4194%2024.9838%2028.2464%2024.616%2028.2464C24.2049%2028.2464%2023.9489%2028.4591%2023.848%2028.8846C23.8119%2029.036%2023.7939%2029.2884%2023.7939%2029.6418V39.6154H19.8347V29.393C19.8347%2028.6069%2019.5643%2028.2139%2019.0234%2028.2139C18.4826%2028.2139%2018.2121%2028.625%2018.2121%2029.4471V39.6154H14.253V28.2139C14.253%2026.988%2014.1304%2025.8666%2013.8852%2024.8497ZM30.8251%2024.8497H34.7843V30.6262H35.3684C35.7073%2030.619%2035.9453%2030.5541%2036.0823%2030.4315C36.2698%2030.2512%2036.3852%2029.923%2036.4285%2029.4471C36.4501%2029.2884%2036.4609%2028.9639%2036.4609%2028.4735V26.786C36.4609%2026.0216%2036.5727%2025.3762%2036.7963%2024.8497H40.7338C40.5895%2025.2247%2040.503%2025.5348%2040.4742%2025.78C40.4453%2025.9747%2040.4273%2026.4471%2040.4201%2027.1971V28.9387C40.4201%2029.6021%2040.3912%2030.0529%2040.3335%2030.2908C40.146%2031.0697%2039.6448%2031.5889%2038.8299%2031.8485C38.6136%2031.9062%2038.2494%2031.9855%2037.7374%2032.0865C37.9754%2032.1298%2038.1304%2032.155%2038.2025%2032.1622C39.0319%2032.2848%2039.6268%2032.5841%2039.9874%2033.0601C40.2758%2033.4711%2040.4201%2034.0805%2040.4201%2034.8882V36.9543C40.4201%2037.6538%2040.4417%2038.1803%2040.485%2038.5336C40.5282%2038.8581%2040.6112%2039.2187%2040.7338%2039.6154H36.9369C36.735%2039.2476%2036.6052%2038.8906%2036.5475%2038.5444C36.4898%2038.155%2036.4609%2037.6502%2036.4609%2037.03V35.6779C36.4609%2035.1947%2036.4393%2034.8774%2036.396%2034.7259C36.2446%2034.1418%2035.8804%2033.8461%2035.3035%2033.8389H34.7843V39.6154H30.8251V24.8497ZM48.8684%2024.8497V28.0625H45.3852V30.6262H46.0992C46.979%2030.6334%2047.5992%2030.7235%2047.9597%2030.8966C48.5294%2031.1562%2048.9117%2031.6899%2049.1064%2032.4976C49.2073%2032.9086%2049.2614%2033.5901%2049.2686%2034.542V35.4507C49.2398%2036.6983%2049.1893%2037.4375%2049.1172%2037.6682C48.9081%2038.7139%2048.378%2039.3305%2047.527%2039.518C47.2458%2039.5685%2046.4633%2039.6009%2045.1797%2039.6154H41.4802V36.4026H45.2013V33.8389H44.5847C43.8492%2033.8389%2043.3227%2033.7848%2043.0054%2033.6767C42.515%2033.5108%2042.1581%2033.2584%2041.9345%2032.9194C41.6677%2032.4868%2041.5054%2031.881%2041.4477%2031.1021C41.4333%2030.8642%2041.4261%2030.4279%2041.4261%2029.7932V28.8846C41.4405%2027.6298%2041.5415%2026.7752%2041.729%2026.3209C41.9309%2025.7656%2042.2193%2025.387%2042.5943%2025.1851C42.9261%2024.9904%2043.4417%2024.8822%2044.1412%2024.8605C44.3936%2024.8533%2044.8299%2024.8497%2045.4501%2024.8497H48.8684ZM52.1136%2036.5324C52.6544%2036.5324%2053.1016%2036.7307%2053.4549%2037.1274C53.7073%2037.4158%2053.8335%2037.7404%2053.8335%2038.1009C53.8335%2038.4759%2053.7073%2038.8005%2053.4549%2039.0745C53.0944%2039.4711%2052.6364%2039.6694%2052.0811%2039.6694C51.5258%2039.6694%2051.0643%2039.4711%2050.6965%2039.0745C50.4441%2038.8005%2050.3179%2038.4795%2050.3179%2038.1118C50.3179%2037.7295%2050.4441%2037.4014%2050.6965%2037.1274C51.0643%2036.7307%2051.5367%2036.5324%2052.1136%2036.5324Z'%20fill='%23202124'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2017_3006'%3e%3crect%20width='64'%20height='64'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";function re(){return c.useEffect(()=>{const t=document.querySelector(".js-hide-on-scroll");if(!t)return;let i=window.pageYOffset||document.documentElement.scrollTop||0;const o=4;function n(){const s=window.pageYOffset||document.documentElement.scrollTop||0,p=s>i+o,r=s<i-o;s<=10?t.classList.remove("is-hidden"):p?t.classList.add("is-hidden"):r&&t.classList.remove("is-hidden"),i=s}return window.addEventListener("scroll",n,{passive:!0}),()=>window.removeEventListener("scroll",n)},[]),e.jsxs(e.Fragment,{children:[e.jsx("a",{href:"#main",className:"skip-link",children:"Skip to content"}),e.jsx("header",{className:"site-header js-hide-on-scroll",children:e.jsxs("div",{className:"site-header-pill",children:[e.jsx(L,{className:"site-header-logo",to:"/","aria-label":"Go to home",children:e.jsx("img",{src:se,alt:"mks. logo",width:"34",height:"34"})}),e.jsxs("nav",{className:"site-nav","aria-label":"Main navigation",children:[e.jsx(z,{to:"/",className:({isActive:t})=>t?"is-active":void 0,children:"work"}),e.jsx(z,{to:"/about",className:({isActive:t})=>t?"is-active":void 0,children:"about"})]}),e.jsx(z,{className:({isActive:t})=>t?"btn btn--primary btn--sm site-header-cta is-active":"btn btn--primary btn--sm site-header-cta",to:"/resume",children:"resume"})]})})]})}const ne={hidden:{opacity:1},visible:{opacity:1,transition:{delayChildren:0,staggerChildren:.09}}},le={hidden:{opacity:1},visible:{opacity:1}},ce={hidden:{opacity:0,y:2},visible:{opacity:1,y:0,transition:{duration:.04}}},de={hidden:{opacity:0,y:2},visible:(t=0)=>({opacity:1,y:0,transition:{delay:t*.09,duration:.04}})},O={hidden:{opacity:0},visible:(t=0)=>({opacity:[0,1,1,0,1,0],transition:{delay:t*.09+.08,duration:1.05,times:[0,.08,.38,.5,.78,1]}})};function B({children:t,className:i="case-section-label",id:o,lineBreakAfter:n,prefersReducedMotion:s,standalone:p=!1}){const r=String(t),m=n?r.indexOf(n)+n.length:-1,h=m>0&&m<r.length,g=h?[r.slice(0,m),r.slice(m).trimStart()]:[r],b=`${i}${h?" case-section-label--multiline":""}`,x=`${i} case-section-label--typed${h?" case-section-label--multiline":""}`,f=p?{initial:"hidden",whileInView:"visible",viewport:ie}:{};return s?e.jsx(w.h2,{className:b,id:o,variants:te,...f,children:g.map(d=>e.jsx("span",{className:"case-section-label-line",children:d},d))}):h?e.jsx(w.h2,{className:x,id:o,variants:le,"aria-label":r,...f,children:e.jsx("span",{className:"case-section-label-text case-section-label-text--multiline","aria-hidden":"true",children:g.map((d,k)=>{const C=k===0?0:m+1,V=k===g.length-1;return e.jsxs("span",{className:"case-section-label-line",children:[[...d].map((j,S)=>e.jsx(w.span,{className:"case-section-label-character",variants:de,custom:C+S,children:j===" "?" ":j},`${r}-${C+S}`)),V&&e.jsx(w.span,{className:"case-section-label-caret",variants:O,custom:r.length})]},d)})})}):e.jsxs(w.h2,{className:x,id:o,variants:ne,"aria-label":r,...f,children:[e.jsx("span",{className:"case-section-label-text","aria-hidden":"true",children:[...r].map((d,k)=>e.jsx(w.span,{className:"case-section-label-character",variants:ce,children:d===" "?" ":d},`${r}-${k}`))}),e.jsx(w.span,{className:"case-section-label-caret",variants:O,custom:r.length,"aria-hidden":"true"})]})}const N={roleShort:"UX/UI Designer",heroLine:"I design clear interfaces informed by user research.",heroMethod:"Based in Berlin. Open to UX/UI and Product Design roles in Germany.",seoTitle:"Matthias Schaefle: UX/UI Designer in Berlin",seoDescription:"Portfolio of Matthias Schaefle, a Berlin-based UX/UI Designer working across user research, interaction design, high-fidelity UI, validation, and responsive implementation.",ogDescription:"Research-led UX/UI design for product flows and service experiences."};function pe(){const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:t?"auto":"smooth"})}function he({tagline:t="Research, interface design, and prototyping."}){return e.jsxs("footer",{className:"site-footer",children:[e.jsxs("div",{className:"site-footer-inner",children:[e.jsxs("div",{className:"footer-left",children:[e.jsx("div",{className:"footer-email-label",children:"Contact"}),e.jsx("a",{className:"footer-email",href:"mailto:matthias.k.schaefle@gmail.com",children:"matthias.k.schaefle@gmail.com"}),e.jsx(L,{className:"footer-email",to:"/resume",children:"Resume"})]}),e.jsx("div",{className:"footer-center",children:t}),e.jsxs("div",{className:"footer-right",children:[e.jsxs("a",{className:"btn btn--secondary btn--sm",href:"https://www.linkedin.com/in/matthiasks/",target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{className:"footer-linkedin-icon","aria-hidden":"true",children:e.jsx("svg",{viewBox:"0 0 448 512",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"})})}),"LinkedIn"]}),e.jsxs("button",{className:"btn btn--secondary btn--sm",type:"button",onClick:pe,children:["Back to top",e.jsx("span",{className:"footer-back-top-icon","aria-hidden":"true",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M18 15l-6-6-6 6"})})})]})]})]}),e.jsxs("div",{className:"footer-bottom-row",children:[e.jsxs("div",{children:["© ",new Date().getFullYear()," Matthias Karl Schaefle"]}),e.jsxs("div",{className:"footer-bottom-links",children:[e.jsx(L,{className:"footer-legal-link",to:"/legal",children:"Impressum"}),e.jsx("span",{children:"Berlin, DE"})]})]})]})}function me({sources:t=[],poster:i,endFrame:o,alt:n,threshold:s=.5,controls:p=!1,reducedMotion:r="still",tracks:m=[],requireScroll:h=!1,className:g,...b}){const x=c.useRef(null),f=c.useRef(null),[d,k]=c.useState(!1),[C,V]=c.useState(!1),[j,S]=c.useState(!h),[W,_]=c.useState(!1),[$,X]=c.useState(!1),[I,G]=c.useState(!1),[E,q]=c.useState(!0);c.useEffect(()=>{const a=window.matchMedia("(prefers-reduced-motion: reduce)"),M=()=>q(a.matches);return M(),a.addEventListener("change",M),()=>a.removeEventListener("change",M)},[]),c.useEffect(()=>{if(j)return;const a=()=>S(!0);return window.addEventListener("scroll",a,{passive:!0,once:!0}),()=>window.removeEventListener("scroll",a)},[j]);const v=C&&j;c.useEffect(()=>{if(E||d||I||v)return;const a=x.current;if(!a||typeof IntersectionObserver>"u")return;const J=a.getBoundingClientRect().height/window.innerHeight>.9?Math.min(s,.6):s,P=new IntersectionObserver(Q=>{Q.some(ee=>ee.isIntersecting)&&V(!0)},{threshold:J});return P.observe(a),()=>P.disconnect()},[E,d,I,v,s]),c.useEffect(()=>{v&&f.current?.load()},[v]);const Y=()=>{if(!v)return;const a=f.current?.play();a&&typeof a.catch=="function"&&a.catch(()=>X(!0))},Z=I||E&&r==="still",H=p&&(W||E||$);if(Z)return e.jsx("div",{ref:x,className:g,...b,children:e.jsx("img",{className:"play-once-media",src:I?i:o||i,alt:n,loading:"lazy",decoding:"async"})});const K=v||H;return e.jsxs("div",{ref:x,className:g,...b,children:[e.jsxs("video",{ref:f,className:"play-once-media",poster:i,preload:"none",muted:!0,playsInline:!0,controls:H,disablePictureInPicture:!H,"aria-label":n,onLoadedData:Y,onPlaying:()=>_(!0),onEnded:()=>k(!0),onError:()=>G(!0),children:[K?t.map(a=>e.jsx("source",{src:a.src,type:a.type},a.src)):null,m.map(a=>e.jsx("track",{kind:a.kind||"captions",srcLang:a.srcLang,label:a.label,src:a.src},a.src))]}),!v&&!p?e.jsxs("span",{className:"play-once-hint","aria-hidden":"true",children:[e.jsx("svg",{viewBox:"0 0 12 14",width:"9",height:"11",focusable:"false",children:e.jsx("path",{d:"M0 0 L12 7 L0 14 Z",fill:"currentColor"})}),"video"]}):null]})}const xe=w.create(L),T=[{href:"/delivery",index:"01",context:"Paid client work · Product redesign · Field research · 2025",title:"The New Delivery Experience",description:"Customers were disputing deliveries they had paid for, and the records could not settle it. Two days in the field found what no survey would.",result:"7 to 8s faster per stop, 92%→98% record compliance",imageSrc:"/assets/portfolio/2026/03/Mockup-Hero-scaled.png",imageAlt:"Clip from the Delivery case film: the confirmation form arriving already filled from route data",video:{sources:[{src:"/media/delivery-short.webm",type:"video/webm"},{src:"/media/delivery-short.mp4",type:"video/mp4"}],poster:"/media/delivery-poster.jpg",endFrame:"/media/delivery-endframe.jpg"},featured:!0},{href:"/doctor",index:"02",context:"Paid client work · Research · UI design · 2024",title:"The questions patients asked before booking",description:"A plastic surgeon's site rebuilt around what patients actually wanted to know. Research, IA, UI, and the brand it runs on.",result:"Logo and palette still in use, two years on.",imageSrc:"/assets/portfolio/2025/11/mockup-helio.png",imageAlt:"The redesigned Dr. Hélio homepage on desktop and mobile"},{href:"/duopet",index:"03",context:"Educational project · UX/UI · 2023",title:"DuoPet",description:"A faster, clearer way to book veterinary appointments without WhatsApp back-and-forth.",result:"164 survey responses · 2 usability-testing rounds",imageSrc:"/assets/portfolio/2024/05/iPhone-12-Pro.png",imageAlt:"DuoPet prototype mockup"}];function ge(){return typeof document>"u"?!0:!!document.createElement("video").canPlayType('video/webm; codecs="vp9"')}function fe(){const t=R(),[i,o]=c.useState(ge);return t?e.jsx("img",{className:"hero-video",src:"/assets/hero-poses/hero-home-poster-2026.webp",alt:"Illustration of Matthias typing on a laptop"}):i?e.jsx("video",{className:"hero-video",poster:"/assets/hero-poses/hero-home-poster-2026.webp",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":"Animated illustration of Matthias typing on a laptop",onError:()=>o(!1),children:e.jsx("source",{src:"/assets/hero-poses/hero-home-loop-2026.webm",type:"video/webm"})}):e.jsx("img",{className:"hero-video",src:"/assets/hero-poses/hero-home-loop-2026.webp",alt:"Animated illustration of Matthias typing on a laptop"})}function ue(){return e.jsx("span",{className:"work-arrow","aria-hidden":"true",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})})}function we(t){const i="Product Design",o=t.indexOf(i);return o<0?t:e.jsxs(e.Fragment,{children:[t.slice(0,o),e.jsx("span",{className:"hero-nowrap",children:i}),t.slice(o+i.length)]})}function ye({title:t}){const i=t.split(" "),o=i.pop();return e.jsxs("h2",{className:"work-title",children:[i.length>0?`${i.join(" ")} `:null,e.jsxs("span",{className:"work-title-end",children:[o,e.jsx(ue,{})]})]})}function ve({context:t}){const i=t.split(" · ");return e.jsx("span",{className:"work-context",children:i.map((o,n)=>e.jsxs("span",{className:"work-context-seg",children:[o,n<i.length-1?" · ":""]},`${o}-${n}`))})}function F({href:t,index:i,context:o,title:n,description:s,result:p,imageSrc:r,imageAlt:m,video:h,featured:g,order:b=0}){const x=R(),f=x?{opacity:0}:{opacity:0,y:20},d=x?{opacity:1}:{opacity:1,y:0};return e.jsxs(xe,{to:t,className:g?"work-item work-item--featured":"work-item",initial:f,whileInView:d,viewport:{once:!0,amount:"some"},transition:{duration:y.slow,ease:u.out,delay:x?0:b*D.base},children:[e.jsx("div",{className:"work-media",children:e.jsx("div",{className:"work-media-motion",children:h?e.jsx(me,{className:"work-media-video",sources:h.sources,poster:h.poster,endFrame:h.endFrame,alt:m}):e.jsx("img",{src:r,alt:m,loading:g?"eager":"lazy",decoding:"async"})})}),e.jsxs("div",{className:"work-row",children:[e.jsxs("div",{className:"work-info",children:[e.jsx("span",{className:"work-index",children:i}),e.jsx(ve,{context:o})]}),e.jsxs("div",{className:"work-main",children:[e.jsx(ye,{title:n}),e.jsx("p",{className:"work-desc",children:s}),p?e.jsx("p",{className:"work-result",children:p}):null]})]})]})}function be(){const t=R();return c.useEffect(()=>{ae({title:N.seoTitle,description:N.seoDescription,path:"/",ogDescription:N.ogDescription})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
* { box-sizing: border-box; }

html { scroll-behavior: smooth; }

body {
  margin: 0;
  padding: 0;
  font-family: var(--font-body);
  color: var(--ink-900);
  background: var(--bg);
  min-height: 100vh;
  overflow-x: hidden;
}

a { color: inherit; text-decoration: none; }

img { max-width: 100%; display: block; }

.page {
  min-height: 100vh;
  width: 100%;
  padding: 140px 16px 104px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.page-inner {
  width: 100%;
  max-width: 872px;
}

/* Warm editorial backdrop used only on the work index. The quiet grid fades
   before the project list so the mockups remain the visual focus. */
.home-page {
  position: relative;
  isolation: isolate;
  background-color: var(--bg);
  background-image:
    radial-gradient(circle at 12% 4%, rgba(201, 169, 110, 0.14), transparent 31rem),
    radial-gradient(circle at 88% 10%, rgba(95, 142, 82, 0.12), transparent 34rem),
    linear-gradient(180deg, rgba(250, 250, 249, 0) 0%, var(--bg) 64%);
}

.home-page::before {
  content: "";
  position: absolute;
  inset: 0 0 auto;
  height: 760px;
  z-index: -1;
  pointer-events: none;
  opacity: 0.34;
  background-image:
    linear-gradient(rgba(26, 24, 21, 0.055) 1px, transparent 1px),
    linear-gradient(90deg, rgba(26, 24, 21, 0.055) 1px, transparent 1px);
  background-size: 48px 48px;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 88%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 88%);
}

@media (max-width: 768px) {
  .page { min-height: auto; padding-top: 112px; padding-inline: 12px; padding-bottom: 120px; }
  .hero-title { word-break: break-word; }
}

/* HERO */
.hero {
  display: flex;
  gap: 48px;
  margin-bottom: 96px;
  align-items: center;
}

.hero-visual {
  flex: 0 0 auto;
  position: relative;
  width: 260px; height: 260px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-badge-ring {
  position: absolute; inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  /* static typographic seal; stays in front of the video */
  z-index: 2;
  pointer-events: none;
}

.hero-badge-ring svg {
  width: 238px; height: 238px;
  transform-origin: center;
  animation: spin-slow 18s linear infinite;
}

@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@media (prefers-reduced-motion: reduce) {
  .hero-badge-ring svg { animation-play-state: paused; }
}

/* Circular viewport centers the square video inside the typographic seal. */
.hero-peeps {
  position: absolute;
  inset: 17%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 50%;
  background: transparent;
  z-index: 1;
}

.hero-peeps .hero-video {
  position: static;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transform: translateX(6px) scale(1.02);
}

.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 4px 6px rgba(26, 24, 21, 0.12));
}

.hero-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 64px;
  font-weight: 700;
  color: var(--ink-900);
  margin: 0;
  line-height: 1.02;
  letter-spacing: -0.025em;
}

.hero-role {
  margin: 0;
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--brand-600);
}

.hero-copy {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-width: 460px;
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  font-weight: 400;
  margin: 0;
  color: var(--ink-600);
  overflow-wrap: break-word;
  text-wrap: wrap;
  text-wrap: pretty;
}

.hero-nowrap {
  white-space: nowrap;
}

@media (max-width: 1024px) { .hero-title { font-size: 52px; } }

@media (max-width: 768px) {
  .hero { flex-direction: column; align-items: center; gap: 32px; margin-bottom: 72px; }
  .hero-visual { width: 220px; height: 220px; }
  .hero-badge-ring svg { width: 210px; height: 210px; }
  .hero-peeps { inset: 16%; }
  .hero-peeps .hero-video { width: 100%; height: 100%; }
  .hero-content { width: 100%; min-width: 0; }
  .hero-copy { max-width: none; }
  .hero-title { font-size: 40px; line-height: 1.08; overflow-wrap: break-word; word-break: break-word; hyphens: none; }
  .hero-role { font-size: 14px; }
  .hero-subtitle { font-size: 15px; }
}

@media (max-width: 400px) {
  .hero-title { font-size: 34px; }
}

/* SECTION HEADER (shared by work + tools) */
.section-header { display: flex; align-items: center; gap: 14px; }

.section-label {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--ink-600);
  white-space: nowrap;
  margin: 0;
}

.section-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, var(--ink-300), rgba(210, 207, 200, 0.08));
}

/* WORK INDEX (editorial, no cards) */
.work {
  display: flex;
  flex-direction: column;
  gap: 72px;
  padding-bottom: 24px;
}

.work-pair {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 40px;
}

.work-item {
  display: block;
  text-decoration: none;
  cursor: pointer;
}

/* Media stage: tinted panel, no border; flat by default, subtle 3D tilt on hover */
.work-media {
  position: relative;
  overflow: hidden;
  border-radius: 16px;
  background: linear-gradient(140deg, var(--ink-100) 0%, var(--brand-50) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 36px;
}

.work-item--featured .work-media { min-height: 380px; }

.work-media-motion {
  display: flex;
  align-items: center;
  justify-content: center;
}

.work-media img {
  width: 100%;
  max-width: 560px;
  height: auto;
  max-height: 340px;
  object-fit: contain;
  filter: drop-shadow(0 22px 36px rgba(15, 14, 12, 0.2));
}

.work-pair .work-media { padding: 28px 24px; min-height: 260px; }
.work-pair .work-media img { max-height: 220px; }

/* The film is 16:9 and letterboxes badly inside the contain box the mockups
   use, so it gets its own frame with the aspect ratio reserved up front. */
.work-media-video {
  position: relative;
  width: 100%;
  max-width: 560px;
  aspect-ratio: 16 / 9;
  border-radius: 10px;
  overflow: hidden;
  background: var(--ink-950);
  box-shadow: 0 22px 36px rgba(15, 14, 12, 0.2);
}

.work-media-video .play-once-media {
  width: 100%;
  height: 100%;
  max-width: none;
  max-height: none;
  object-fit: cover;
  display: block;
  filter: none;
}

.play-once-hint {
  position: absolute;
  right: 10px;
  bottom: 10px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(15, 14, 12, 0.62);
  color: var(--ink-50);
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  pointer-events: none;
}

/* Typographic row under the media */
.work-row {
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  gap: 12px 40px;
  margin-top: 22px;
  min-width: 0;
}

.work-pair .work-row {
  grid-template-columns: 1fr;
  gap: 8px;
  margin-top: 18px;
}

.work-info {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
}

.work-pair .work-info {
  flex-direction: row;
  align-items: baseline;
  gap: 12px;
}

.work-index {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  color: var(--gold-600);
}

.work-context {
  font-family: var(--font-mono);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  line-height: 1.7;
  color: var(--ink-600);
  display: flex;
  flex-wrap: wrap;
  min-width: 0;
}

.work-context-seg {
  white-space: nowrap;
}

.work-title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin: 0;
  color: var(--ink-900);
  transition: color .18s ease;
  overflow-wrap: break-word;
  text-wrap: wrap;
  text-wrap: pretty;
}

.work-title-end {
  white-space: nowrap;
}

.work-pair .work-title { font-size: 22px; }

.work-item:hover .work-title,
.work-item:focus-visible .work-title { color: var(--brand-700); }

/* The color shift alone is not a focus indicator: same ring as .btn. */
.work-item:focus-visible {
  outline: 2px solid var(--brand-400);
  outline-offset: 6px;
  border-radius: 20px;
}

.work-arrow {
  display: inline-flex;
  align-items: center;
  margin-left: 0.35em;
  vertical-align: -0.12em;
  transition: transform .2s ease;
}

.work-arrow svg {
  width: 20px;
  height: 20px;
  stroke: currentColor;
  fill: none;
}

.work-pair .work-arrow svg { width: 16px; height: 16px; }

.work-item:hover .work-arrow,
.work-item:focus-visible .work-arrow { transform: translateX(6px); }

.work-desc {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.7;
  color: var(--ink-600);
  margin: 10px 0 0;
  max-width: 56ch;
}

.work-result {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.04em;
  color: var(--brand-700);
  margin: 14px 0 0;
}

@media (max-width: 768px) {
  .work { gap: 56px; }
  .work-pair { grid-template-columns: 1fr; gap: 56px; }
  .work-item--featured .work-media { min-height: 0; }
  .work-media { padding: 24px 18px; }
  .work-row { grid-template-columns: 1fr; gap: 8px; margin-top: 16px; }
  .work-info { flex-direction: row; align-items: baseline; gap: 12px; }
  .work-context { flex: 1 1 0; }
  .work-title { font-size: 24px; }
  .work-pair .work-title { font-size: 22px; }
  .work-desc { font-size: 15px; }
}

/* TOOLS STRIP (quiet, below the work index) */
.tools-strip {
  margin-top: 96px;
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.tools-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: flex-start;
  gap: 24px 32px;
}
.tool-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  opacity: 0.8;
}
.tool-icon {
  width: 18px;
  height: 18px;
}
.tool-label {
  font-family: var(--font-mono);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--ink-600);
}

@media (max-width: 768px) {
  .tools-strip { margin-top: 72px; }
  .tools-row { gap: 14px 18px; }
  .tool-icon { width: 22px; height: 22px; }
  .tool-label { font-size: 12px; }
}
`}),e.jsx(re,{active:"work"}),e.jsx("main",{id:"main",className:"page home-page",children:e.jsxs("div",{className:"page-inner",children:[e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero-visual",children:[e.jsx("div",{className:"hero-badge-ring","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 238 238",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("defs",{children:e.jsx("path",{id:"badge-circle",d:"M 119,119 m 0,-92 a 92,92 0 1,1 0,184 a 92,92 0 1,1 0,-184",fill:"none"})}),e.jsx("text",{fontFamily:"'JetBrains Mono', ui-monospace, monospace",fontSize:"10",fontWeight:"500",fill:"#1A1815",letterSpacing:"0.16em",children:e.jsx("textPath",{href:"#badge-circle",startOffset:"0",textLength:"578",lengthAdjust:"spacing",children:"MATTHIAS SCHAEFLE / UX/UI DESIGNER IN BERLIN / RESEARCH / INTERFACE DESIGN / PROTOTYPING / DESIGN SYSTEMS /"})})]})}),e.jsx("div",{className:"hero-peeps",children:e.jsx(fe,{})})]}),e.jsxs("div",{className:"hero-content",children:[e.jsx("h1",{className:"hero-title",children:"Matthias Schaefle"}),e.jsx("p",{className:"hero-role",children:N.roleShort}),e.jsxs("div",{className:"hero-copy",children:[e.jsx("p",{className:"hero-subtitle",children:N.heroLine}),e.jsx("p",{className:"hero-subtitle",children:we(N.heroMethod)})]})]})]}),e.jsxs("section",{className:"work","aria-label":"Selected work",children:[e.jsxs("div",{className:"section-header",children:[e.jsx(B,{className:"section-label",prefersReducedMotion:t,standalone:!0,children:"Selected work"}),e.jsx("span",{className:"section-line"})]}),e.jsx(F,{...T[0],order:0}),e.jsxs("div",{className:"work-pair",children:[e.jsx(F,{...T[1],order:0}),e.jsx(F,{...T[2],order:1})]})]}),e.jsxs("section",{className:"tools-strip","aria-label":"Tools I use",children:[e.jsxs("div",{className:"section-header",children:[e.jsx(B,{className:"section-label",prefersReducedMotion:t,standalone:!0,children:"Tools I use"}),e.jsx("span",{className:"section-line"})]}),e.jsxs("div",{className:"tools-row","aria-label":"Tools",children:[e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"0 0 38 57",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z",fill:"#1ABCFE"}),e.jsx("path",{d:"M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z",fill:"#0ACF83"}),e.jsx("path",{d:"M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z",fill:"#FF7262"}),e.jsx("path",{d:"M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z",fill:"#F24E1E"}),e.jsx("path",{d:"M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z",fill:"#A259FF"})]}),e.jsx("span",{className:"tool-label",children:"Figma"})]}),e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"-11.5 -10.232 23 20.463",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{r:"2.05",fill:"#61DAFB"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none",transform:"rotate(60)"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none",transform:"rotate(120)"})]}),e.jsx("span",{className:"tool-label",children:"React"})]}),e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"24",height:"24",rx:"6",fill:"#1A1815"}),e.jsx("path",{d:"M7 8l5 4-5 4",stroke:"#FFFFFF",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13 16h4",stroke:"#FFFFFF",strokeWidth:"2",strokeLinecap:"round"})]}),e.jsx("span",{className:"tool-label",children:"Cursor"})]})]})]})]})}),e.jsx(he,{})]})}const He=Object.freeze(Object.defineProperty({__proto__:null,default:be},Symbol.toStringTag,{value:"Module"}));export{y as D,u as E,He as H,me as P,re as S,B as T,je as a,ae as b,Ne as c,he as d,Ce as e,te as f,Ee as g,Se as h,Le as i,Ie as s,Me as t,Ve as u,ie as v};
