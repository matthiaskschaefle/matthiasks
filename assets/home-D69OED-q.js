import{r as s,j as e,L as z,N as T,m as f,u as D}from"./vendor-_eVBy7WR.js";const v={fast:.25,base:.4,slow:.6,float:3},x={out:[.2,0,0,1],inOut:[.4,0,.2,1]},F={fast:.08,base:.1},ye={hidden:{opacity:0,y:16},visible:{opacity:1,y:0,transition:{duration:v.base,ease:x.out}}},ve=(t=0,i=!1)=>({initial:i?{opacity:0}:{opacity:0,y:12},animate:i?{opacity:1}:{opacity:1,y:0},transition:{duration:i?.1:v.base,ease:x.out,delay:i?0:t*F.base}}),G={hidden:{opacity:0},visible:{opacity:1,transition:{duration:v.slow,ease:x.out}}},be={hidden:{opacity:0,scale:.97},visible:{opacity:1,scale:1,transition:{duration:v.slow,ease:x.out}}},ke={animate:{y:[0,-10,0],transition:{duration:v.float,ease:x.inOut,repeat:1/0,repeatType:"loop"}}},je={hidden:{opacity:0},visible:{opacity:1,transition:{duration:v.slow,ease:x.out,staggerChildren:.12,delayChildren:.05}}},Ne={hidden:{},visible:{transition:{staggerChildren:F.fast}}},Ce=(t=0,i=!1)=>({hidden:i?{opacity:0}:{opacity:0,y:36,rotate:t*2.5,scale:.97},visible:{opacity:1,...i?{}:{y:0,rotate:t,scale:1},transition:{duration:v.slow,ease:x.out}}}),Se=(t=!1)=>({hidden:t?{}:{scaleX:0},visible:{scaleX:1,transition:{duration:.9,ease:x.out,delay:.15}}}),q={once:!0,amount:"some",margin:"0px 0px 20% 0px"},Ie=()=>typeof window>"u"?!1:window.matchMedia("(prefers-reduced-motion: reduce)").matches,V="https://matthiasks.com",X=`${V}/assets/portfolio/og-cover-2026-07.png`;function l(t,i,o,r){let n=document.head.querySelector(t);n||(n=document.createElement("meta"),n.setAttribute(i,o),document.head.appendChild(n)),n.setAttribute("content",r)}function K(t){let i=document.head.querySelector('link[rel="canonical"]');i||(i=document.createElement("link"),i.setAttribute("rel","canonical"),document.head.appendChild(i)),i.setAttribute("href",t)}function Z({title:t,description:i,path:o="/",ogTitle:r=t,ogDescription:n=i,robots:p="index, follow"}){const a=o==="/"?`${V}/`:`${V}${o}`;document.title=t,l('meta[name="description"]',"name","description",i),l('meta[name="author"]',"name","author","Matthias Schaefle"),l('meta[name="robots"]',"name","robots",p),l('meta[property="og:title"]',"property","og:title",r),l('meta[property="og:description"]',"property","og:description",n),l('meta[property="og:type"]',"property","og:type","website"),l('meta[property="og:locale"]',"property","og:locale","en_US"),l('meta[property="og:site_name"]',"property","og:site_name","Matthias Schaefle"),l('meta[property="og:url"]',"property","og:url",a),l('meta[property="og:image"]',"property","og:image",X),l('meta[property="og:image:width"]',"property","og:image:width","1200"),l('meta[property="og:image:height"]',"property","og:image:height","630"),l('meta[property="og:image:alt"]',"property","og:image:alt","Matthias Schaefle UX/UI design portfolio"),l('meta[name="twitter:card"]',"name","twitter:card","summary_large_image"),l('meta[name="twitter:title"]',"name","twitter:title",r),l('meta[name="twitter:description"]',"name","twitter:description",n),l('meta[name="twitter:image"]',"name","twitter:image",X),l('meta[name="twitter:image:alt"]',"name","twitter:image:alt","Matthias Schaefle UX/UI design portfolio"),K(a)}const J=88,Q=45,ee=1500,te=260,ie=50;function oe(t,{enabled:i,paused:o}){const[r,n]=s.useState(0),[p,a]=s.useState(0),[m,h]=s.useState(!1),[b,k]=s.useState(0),[j,w]=s.useState({phraseIndex:0,value:0}),c=s.useRef(null),y=s.useRef({remaining:null,startedAt:null}),u=s.useRef(null),g=s.useRef(null),N=s.useRef(null),S=s.useRef(o),U=s.useRef(0),M=t[r]??t[0]??"";s.useEffect(()=>{if(!i||o)return;const d=y.current,C=t[r]??t[0]??"",E=p===C.length,P=p===0,B=m?P?te:Q:E?ee:J,_=d.remaining??B;d.remaining=_,d.startedAt=performance.now();const A=window.setTimeout(()=>{if(c.current=null,d.remaining=null,d.startedAt=null,!m&&E){h(!0);return}if(m&&P){h(!1),n(I=>(I+1)%t.length);return}a(I=>I+(m?-1:1))},_);return c.current=A,()=>{if(window.clearTimeout(A),c.current===A&&(c.current=null),d.startedAt!==null){const I=performance.now()-d.startedAt;d.remaining=Math.max(0,(d.remaining??B)-I),d.startedAt=null}}},[b,p,i,m,o,r,t]),s.useEffect(()=>{S.current=o,U.current=M.length*133+1760},[M.length,o]),s.useEffect(()=>{if(!i){u.current!==null&&g.current===null&&(g.current=performance.now());return}if(N.current!==r){N.current=r,u.current=performance.now(),g.current=o?performance.now():null;return}o&&g.current===null?g.current=performance.now():!o&&g.current!==null&&(u.current+=performance.now()-g.current,g.current=null)},[i,o,r]),s.useEffect(()=>{if(!i)return;const d=window.setInterval(()=>{if(S.current||u.current===null)return;const C=performance.now()-u.current;w({phraseIndex:N.current,value:Math.min(1,C/U.current)})},ie);return()=>window.clearInterval(d)},[i]);const O=s.useCallback(d=>{if(t.length===0)return;const C=(d%t.length+t.length)%t.length;c.current!==null&&(window.clearTimeout(c.current),c.current=null),y.current.remaining=null,y.current.startedAt=null,N.current=C,u.current=performance.now(),g.current=i&&!o?null:performance.now(),a(0),h(!1),n(C),w({phraseIndex:C,value:0}),k(E=>E+1)},[i,o,t.length]);return i?{text:M.slice(0,p),phraseIndex:r,progress:j.phraseIndex===r?j.value:0,goTo:O}:{text:t[0]??"",phraseIndex:0,progress:1,goTo:O}}const re="data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20width='64'%20height='64'%20viewBox='0%200%2064%2064'%20fill='none'%3e%3cg%20clip-path='url(%23clip0_2017_3006)'%3e%3ccircle%20cx='32'%20cy='32'%20r='30.1538'%20stroke='%23202124'%20stroke-width='3.69231'/%3e%3cpath%20d='M13.8852%2024.8497H17.8768C18.0571%2025.506%2018.1869%2026.1514%2018.2662%2026.786C18.4681%2025.9783%2018.8071%2025.4339%2019.2831%2025.1526C19.6292%2024.9507%2020.2061%2024.8497%2021.0138%2024.8497C21.4826%2024.8497%2021.8792%2024.8714%2022.2037%2024.9146C22.7302%2024.9868%2023.1484%2025.2644%2023.4585%2025.7476C23.5956%2025.9711%2023.7254%2026.3173%2023.848%2026.786C24.0499%2026.0721%2024.3131%2025.5889%2024.6376%2025.3365C25.0559%2025.012%2025.7446%2024.8497%2026.7037%2024.8497C27.36%2024.8497%2027.8648%2024.9038%2028.2181%2025.012C28.6869%2025.1634%2029.0186%2025.5204%2029.2133%2026.0829C29.3287%2026.4074%2029.3864%2026.9663%2029.3864%2027.7596V39.6154H25.4273V29.6418C25.4273%2029.2163%2025.3984%2028.9243%2025.3407%2028.7656C25.2254%2028.4194%2024.9838%2028.2464%2024.616%2028.2464C24.2049%2028.2464%2023.9489%2028.4591%2023.848%2028.8846C23.8119%2029.036%2023.7939%2029.2884%2023.7939%2029.6418V39.6154H19.8347V29.393C19.8347%2028.6069%2019.5643%2028.2139%2019.0234%2028.2139C18.4826%2028.2139%2018.2121%2028.625%2018.2121%2029.4471V39.6154H14.253V28.2139C14.253%2026.988%2014.1304%2025.8666%2013.8852%2024.8497ZM30.8251%2024.8497H34.7843V30.6262H35.3684C35.7073%2030.619%2035.9453%2030.5541%2036.0823%2030.4315C36.2698%2030.2512%2036.3852%2029.923%2036.4285%2029.4471C36.4501%2029.2884%2036.4609%2028.9639%2036.4609%2028.4735V26.786C36.4609%2026.0216%2036.5727%2025.3762%2036.7963%2024.8497H40.7338C40.5895%2025.2247%2040.503%2025.5348%2040.4742%2025.78C40.4453%2025.9747%2040.4273%2026.4471%2040.4201%2027.1971V28.9387C40.4201%2029.6021%2040.3912%2030.0529%2040.3335%2030.2908C40.146%2031.0697%2039.6448%2031.5889%2038.8299%2031.8485C38.6136%2031.9062%2038.2494%2031.9855%2037.7374%2032.0865C37.9754%2032.1298%2038.1304%2032.155%2038.2025%2032.1622C39.0319%2032.2848%2039.6268%2032.5841%2039.9874%2033.0601C40.2758%2033.4711%2040.4201%2034.0805%2040.4201%2034.8882V36.9543C40.4201%2037.6538%2040.4417%2038.1803%2040.485%2038.5336C40.5282%2038.8581%2040.6112%2039.2187%2040.7338%2039.6154H36.9369C36.735%2039.2476%2036.6052%2038.8906%2036.5475%2038.5444C36.4898%2038.155%2036.4609%2037.6502%2036.4609%2037.03V35.6779C36.4609%2035.1947%2036.4393%2034.8774%2036.396%2034.7259C36.2446%2034.1418%2035.8804%2033.8461%2035.3035%2033.8389H34.7843V39.6154H30.8251V24.8497ZM48.8684%2024.8497V28.0625H45.3852V30.6262H46.0992C46.979%2030.6334%2047.5992%2030.7235%2047.9597%2030.8966C48.5294%2031.1562%2048.9117%2031.6899%2049.1064%2032.4976C49.2073%2032.9086%2049.2614%2033.5901%2049.2686%2034.542V35.4507C49.2398%2036.6983%2049.1893%2037.4375%2049.1172%2037.6682C48.9081%2038.7139%2048.378%2039.3305%2047.527%2039.518C47.2458%2039.5685%2046.4633%2039.6009%2045.1797%2039.6154H41.4802V36.4026H45.2013V33.8389H44.5847C43.8492%2033.8389%2043.3227%2033.7848%2043.0054%2033.6767C42.515%2033.5108%2042.1581%2033.2584%2041.9345%2032.9194C41.6677%2032.4868%2041.5054%2031.881%2041.4477%2031.1021C41.4333%2030.8642%2041.4261%2030.4279%2041.4261%2029.7932V28.8846C41.4405%2027.6298%2041.5415%2026.7752%2041.729%2026.3209C41.9309%2025.7656%2042.2193%2025.387%2042.5943%2025.1851C42.9261%2024.9904%2043.4417%2024.8822%2044.1412%2024.8605C44.3936%2024.8533%2044.8299%2024.8497%2045.4501%2024.8497H48.8684ZM52.1136%2036.5324C52.6544%2036.5324%2053.1016%2036.7307%2053.4549%2037.1274C53.7073%2037.4158%2053.8335%2037.7404%2053.8335%2038.1009C53.8335%2038.4759%2053.7073%2038.8005%2053.4549%2039.0745C53.0944%2039.4711%2052.6364%2039.6694%2052.0811%2039.6694C51.5258%2039.6694%2051.0643%2039.4711%2050.6965%2039.0745C50.4441%2038.8005%2050.3179%2038.4795%2050.3179%2038.1118C50.3179%2037.7295%2050.4441%2037.4014%2050.6965%2037.1274C51.0643%2036.7307%2051.5367%2036.5324%2052.1136%2036.5324Z'%20fill='%23202124'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_2017_3006'%3e%3crect%20width='64'%20height='64'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";function ae(){return s.useEffect(()=>{const t=document.querySelector(".js-hide-on-scroll");if(!t)return;let i=window.pageYOffset||document.documentElement.scrollTop||0;const o=4;function r(){const n=window.pageYOffset||document.documentElement.scrollTop||0,p=n>i+o,a=n<i-o;n<=10?t.classList.remove("is-hidden"):p?t.classList.add("is-hidden"):a&&t.classList.remove("is-hidden"),i=n}return window.addEventListener("scroll",r,{passive:!0}),()=>window.removeEventListener("scroll",r)},[]),e.jsxs(e.Fragment,{children:[e.jsx("a",{href:"#main",className:"skip-link",children:"Skip to content"}),e.jsx("header",{className:"site-header js-hide-on-scroll",children:e.jsxs("div",{className:"site-header-pill",children:[e.jsx(z,{className:"site-header-logo",to:"/","aria-label":"Go to home",children:e.jsx("img",{src:re,alt:"mks. logo",width:"34",height:"34"})}),e.jsxs("nav",{className:"site-nav","aria-label":"Main navigation",children:[e.jsx(T,{to:"/",className:({isActive:t})=>t?"is-active":void 0,children:"work"}),e.jsx(T,{to:"/about",className:({isActive:t})=>t?"is-active":void 0,children:"about"})]}),e.jsx(T,{className:({isActive:t})=>t?"btn btn--primary btn--sm site-header-cta is-active":"btn btn--primary btn--sm site-header-cta",to:"/resume",children:"resume"})]})})]})}function ne({className:t}){return e.jsx(f.span,{className:t,"aria-hidden":"true",initial:{opacity:1},animate:{opacity:[0,1,1,0]},transition:{duration:.85,repeat:1/0,repeatDelay:.12,times:[0,.08,.58,1]}})}const se={hidden:{opacity:1},visible:{opacity:1,transition:{delayChildren:0,staggerChildren:.09}}},le={hidden:{opacity:1},visible:{opacity:1}},ce={hidden:{opacity:0,y:2},visible:{opacity:1,y:0,transition:{duration:.04}}},de={hidden:{opacity:0,y:2},visible:(t=0)=>({opacity:1,y:0,transition:{delay:t*.09,duration:.04}})},W={hidden:{opacity:0},visible:(t=0)=>({opacity:[0,1,1,0,1,0],transition:{delay:t*.09+.08,duration:1.05,times:[0,.08,.38,.5,.78,1]}})};function Y({children:t,className:i="case-section-label",id:o,lineBreakAfter:r,prefersReducedMotion:n,standalone:p=!1}){const a=String(t),m=r?a.indexOf(r)+r.length:-1,h=m>0&&m<a.length,b=h?[a.slice(0,m),a.slice(m).trimStart()]:[a],k=`${i}${h?" case-section-label--multiline":""}`,j=`${i} case-section-label--typed${h?" case-section-label--multiline":""}`,w=p?{initial:"hidden",whileInView:"visible",viewport:q}:{};return n?e.jsx(f.h2,{className:k,id:o,variants:G,...w,children:b.map(c=>e.jsx("span",{className:"case-section-label-line",children:c},c))}):h?e.jsx(f.h2,{className:j,id:o,variants:le,"aria-label":a,...w,children:e.jsx("span",{className:"case-section-label-text case-section-label-text--multiline","aria-hidden":"true",children:b.map((c,y)=>{const u=y===0?0:m+1,g=y===b.length-1;return e.jsxs("span",{className:"case-section-label-line",children:[[...c].map((N,S)=>e.jsx(f.span,{className:"case-section-label-character",variants:de,custom:u+S,children:N===" "?" ":N},`${a}-${u+S}`)),g&&e.jsx(f.span,{className:"case-section-label-caret",variants:W,custom:a.length})]},c)})})}):e.jsxs(f.h2,{className:j,id:o,variants:se,"aria-label":a,...w,children:[e.jsx("span",{className:"case-section-label-text","aria-hidden":"true",children:[...a].map((c,y)=>e.jsx(f.span,{className:"case-section-label-character",variants:ce,children:c===" "?" ":c},`${a}-${y}`))}),e.jsx(f.span,{className:"case-section-label-caret",variants:W,custom:a.length,"aria-hidden":"true"})]})}const R={heroLine:"UX/UI designer open to product roles in Berlin/EU.",heroMethod:"Research first, prototype close to the build.",seoTitle:"Matthias Schaefle — UX/UI Designer in Berlin"};function pe(){const t=window.matchMedia("(prefers-reduced-motion: reduce)").matches;window.scrollTo({top:0,behavior:t?"auto":"smooth"})}function me({tagline:t="Research, interface design, and prototyping."}){return e.jsxs("footer",{className:"site-footer",children:[e.jsxs("div",{className:"site-footer-inner",children:[e.jsxs("div",{className:"footer-left",children:[e.jsx("div",{className:"footer-email-label",children:"Contact"}),e.jsx("a",{className:"footer-email",href:"mailto:matthias.k.schaefle@gmail.com",children:"matthias.k.schaefle@gmail.com"}),e.jsx(z,{className:"footer-email",to:"/resume",children:"Resume"})]}),e.jsx("div",{className:"footer-center",children:t}),e.jsxs("div",{className:"footer-right",children:[e.jsxs("a",{className:"btn btn--secondary btn--sm",href:"https://www.linkedin.com/in/matthiasks/",target:"_blank",rel:"noopener noreferrer",children:[e.jsx("span",{className:"footer-linkedin-icon","aria-hidden":"true",children:e.jsx("svg",{viewBox:"0 0 448 512",xmlns:"http://www.w3.org/2000/svg",children:e.jsx("path",{d:"M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"})})}),"LinkedIn"]}),e.jsxs("button",{className:"btn btn--secondary btn--sm",type:"button",onClick:pe,children:["Back to top",e.jsx("span",{className:"footer-back-top-icon","aria-hidden":"true",children:e.jsx("svg",{width:"12",height:"12",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2.5",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("path",{d:"M18 15l-6-6-6 6"})})})]})]})]}),e.jsxs("div",{className:"footer-bottom-row",children:[e.jsxs("div",{children:["© ",new Date().getFullYear()," Matthias Karl Schaefle"]}),e.jsx("div",{children:"Berlin, DE"})]})]})}const he=f.create(z),L=[{href:"/delivery",index:"01",context:"Product redesign, Field research, 2025",title:"The New Delivery Experience",description:"Drivers were losing seconds at every stop on information the system already had. Two days in the field found what no survey would.",result:"7 to 8s faster per stop, 92%→98% record compliance",imageSrc:"/assets/portfolio/2026/03/Mockup-Hero-scaled.png",imageAlt:"Delivery experience mockup",featured:!0},{href:"/doctor",index:"02",context:"Client project, Research, UI design, 2024",title:"A healthcare website patients can trust",description:"Patients arrived with the same questions before booking: procedures, prices, insurance. Research, IA and a page system that answers them, designed for a plastic surgeon.",result:"Live since 2024, maintained by the client.",imageSrc:"/assets/portfolio/2025/08/Macbook.png",imageAlt:"Website redesign mockup"},{href:"/duopet",index:"03",context:"Course project, UX/UI, 2023",title:"DuoPet",description:"A faster, clearer way to book veterinary appointments without WhatsApp back-and-forth.",result:"15.9% faster in the course usability test",imageSrc:"/assets/portfolio/2024/05/iPhone-12-Pro.png",imageAlt:"DuoPet prototype mockup"}];function ge(){return D()?e.jsx("img",{className:"hero-video",src:"/assets/hero-poses/hero-home-poster-2026.webp",alt:"Illustration of Matthias typing on a laptop"}):e.jsx("video",{className:"hero-video",src:"/assets/hero-poses/hero-home-loop-2026.mp4",poster:"/assets/hero-poses/hero-home-poster-2026.webp",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,"aria-label":"Animated illustration of Matthias typing on a laptop"})}const $=["Matthias Schaefle","UX/UI Designer","Based in Berlin"];function ue({shouldReduceMotion:t}){const{text:i}=oe($,{enabled:!t,paused:!1});return t?e.jsx("h1",{className:"hero-title",children:$[0]}):e.jsxs("h1",{className:"hero-title hero-title--typed","aria-label":"Matthias Schaefle, UX/UI Designer, Based in Berlin",children:[e.jsx("span",{className:"hero-title-text","aria-hidden":"true",children:i}),e.jsx(ne,{className:"hero-title-caret"})]})}function fe(){return e.jsx("span",{className:"work-arrow","aria-hidden":"true",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"none",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"9 18 15 12 9 6"})})})}function H({href:t,index:i,context:o,title:r,description:n,result:p,imageSrc:a,imageAlt:m,featured:h,order:b=0}){const k=D(),j=k?{opacity:0}:{opacity:0,y:20},w=k?{opacity:1}:{opacity:1,y:0};return e.jsxs(he,{to:t,className:h?"work-item work-item--featured":"work-item",initial:j,whileInView:w,viewport:{once:!0,amount:"some"},transition:{duration:v.slow,ease:x.out,delay:k?0:b*F.base},children:[e.jsx("div",{className:"work-media",children:e.jsx("div",{className:"work-media-motion",children:e.jsx("img",{src:a,alt:m,loading:h?"eager":"lazy",decoding:"async"})})}),e.jsxs("div",{className:"work-row",children:[e.jsxs("div",{className:"work-info",children:[e.jsx("span",{className:"work-index",children:i}),e.jsx("span",{className:"work-context",children:o})]}),e.jsxs("div",{className:"work-main",children:[e.jsxs("h2",{className:"work-title",children:[r,e.jsx(fe,{})]}),e.jsx("p",{className:"work-desc",children:n}),p?e.jsx("p",{className:"work-result",children:p}):null]})]})]})}function xe(){const t=D();return s.useEffect(()=>{Z({title:R.seoTitle,description:"Portfolio of Matthias Schaefle, a UX/UI Designer in Berlin focused on user research, interface design, prototyping, and design systems.",path:"/",ogDescription:"Research-driven UX/UI design, from user insights and wireframes to polished prototypes."})},[]),e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
  background: #FAFAF9;
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

/* Multiply makes the near-white source background resolve to the Home token. */
.hero-video {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  mix-blend-mode: multiply;
}

.hero-content {
  flex: 1 1 auto;
  display: flex;
  flex-direction: column;
  gap: 18px;
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

.hero-title--typed {
  display: flex;
  align-items: baseline;
  min-height: 1.02em;
  white-space: nowrap;
}

.hero-title-text {
  display: inline-block;
  white-space: nowrap;
}

.hero-title-caret {
  display: inline-block;
  width: 0.065em;
  height: 0.82em;
  margin-left: 0.09em;
  flex: 0 0 auto;
  border-radius: 999px;
  background: var(--brand-600);
  transform: translateY(0.05em);
}

.hero-subtitle {
  font-family: var(--font-body);
  font-size: 17px;
  line-height: 1.65;
  font-weight: 400;
  max-width: 460px;
  color: var(--ink-600);
}

@media (max-width: 1024px) { .hero-title { font-size: 52px; } }

@media (max-width: 768px) {
  .hero { flex-direction: column; align-items: center; gap: 32px; margin-bottom: 72px; }
  .hero-visual { width: 220px; height: 220px; }
  .hero-badge-ring svg { width: 210px; height: 210px; }
  .hero-peeps { inset: 16%; }
  .hero-peeps .hero-video { width: 100%; height: 100%; }
  .hero-title { font-size: 40px; line-height: 1.08; overflow-wrap: break-word; word-break: break-word; hyphens: none; }
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
  transform: none;
  transition: transform .4s cubic-bezier(0.2, 0, 0, 1);
  will-change: transform;
}

.work-item:hover .work-media-motion,
.work-item:focus-visible .work-media-motion {
  transform: perspective(1100px) rotateX(2.5deg) rotateY(-4deg) rotate(0.4deg);
}

@media (hover: none), (prefers-reduced-motion: reduce) {
  .work-media-motion { transform: none; transition: none; }
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

/* Typographic row under the media */
.work-row {
  display: grid;
  grid-template-columns: minmax(150px, 220px) minmax(0, 1fr);
  gap: 12px 40px;
  margin-top: 22px;
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
}

.work-title {
  font-family: var(--font-display);
  font-size: 30px;
  font-weight: 600;
  letter-spacing: -0.015em;
  line-height: 1.15;
  margin: 0;
  color: var(--ink-900);
  display: flex;
  align-items: center;
  gap: 12px;
  transition: color .18s ease;
}

.work-pair .work-title { font-size: 22px; gap: 10px; }

.work-item:hover .work-title,
.work-item:focus-visible .work-title { color: var(--brand-700); }

.work-arrow {
  display: inline-flex;
  align-items: center;
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
`}),e.jsx(ae,{active:"work"}),e.jsx("main",{id:"main",className:"page home-page",children:e.jsxs("div",{className:"page-inner",children:[e.jsxs("section",{className:"hero",children:[e.jsxs("div",{className:"hero-visual",children:[e.jsx("div",{className:"hero-badge-ring","aria-hidden":"true",children:e.jsxs("svg",{viewBox:"0 0 238 238",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("defs",{children:e.jsx("path",{id:"badge-circle",d:"M 119,119 m 0,-92 a 92,92 0 1,1 0,184 a 92,92 0 1,1 0,-184",fill:"none"})}),e.jsx("text",{fontFamily:"'JetBrains Mono', ui-monospace, monospace",fontSize:"10",fontWeight:"500",fill:"#1A1815",letterSpacing:"0.16em",children:e.jsx("textPath",{href:"#badge-circle",startOffset:"0",textLength:"578",lengthAdjust:"spacing",children:"MATTHIAS SCHAEFLE / UX/UI DESIGNER IN BERLIN / RESEARCH / INTERFACE DESIGN / PROTOTYPING / DESIGN SYSTEMS /"})})]})}),e.jsx("div",{className:"hero-peeps",children:e.jsx(ge,{})})]}),e.jsxs("div",{className:"hero-content",children:[e.jsx(ue,{shouldReduceMotion:t}),e.jsxs("p",{className:"hero-subtitle",children:[R.heroLine," ",R.heroMethod]})]})]}),e.jsxs("section",{className:"work","aria-label":"Selected work",children:[e.jsxs("div",{className:"section-header",children:[e.jsx(Y,{className:"section-label",prefersReducedMotion:t,standalone:!0,children:"Selected work"}),e.jsx("span",{className:"section-line"})]}),e.jsx(H,{...L[0],order:0}),e.jsxs("div",{className:"work-pair",children:[e.jsx(H,{...L[1],order:0}),e.jsx(H,{...L[2],order:1})]})]}),e.jsxs("section",{className:"tools-strip","aria-label":"Tools I use",children:[e.jsxs("div",{className:"section-header",children:[e.jsx(Y,{className:"section-label",prefersReducedMotion:t,standalone:!0,children:"Tools I use"}),e.jsx("span",{className:"section-line"})]}),e.jsxs("div",{className:"tools-row","aria-label":"Tools",children:[e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"0 0 38 57",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("path",{d:"M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z",fill:"#1ABCFE"}),e.jsx("path",{d:"M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z",fill:"#0ACF83"}),e.jsx("path",{d:"M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z",fill:"#FF7262"}),e.jsx("path",{d:"M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z",fill:"#F24E1E"}),e.jsx("path",{d:"M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z",fill:"#A259FF"})]}),e.jsx("span",{className:"tool-label",children:"Figma"})]}),e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"-11.5 -10.232 23 20.463",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("circle",{r:"2.05",fill:"#61DAFB"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none",transform:"rotate(60)"}),e.jsx("ellipse",{rx:"11",ry:"4.2",stroke:"#61DAFB",strokeWidth:"1",fill:"none",transform:"rotate(120)"})]}),e.jsx("span",{className:"tool-label",children:"React"})]}),e.jsxs("div",{className:"tool-item",children:[e.jsxs("svg",{className:"tool-icon",viewBox:"0 0 24 24",fill:"none",xmlns:"http://www.w3.org/2000/svg",children:[e.jsx("rect",{width:"24",height:"24",rx:"6",fill:"#1A1815"}),e.jsx("path",{d:"M7 8l5 4-5 4",stroke:"#FFFFFF",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"}),e.jsx("path",{d:"M13 16h4",stroke:"#FFFFFF",strokeWidth:"2",strokeLinecap:"round"})]}),e.jsx("span",{className:"tool-label",children:"Cursor"})]})]})]})]})}),e.jsx(me,{})]})}const Ee=Object.freeze(Object.defineProperty({__proto__:null,default:xe},Symbol.toStringTag,{value:"Module"}));export{v as D,x as E,Ee as H,ae as S,Y as T,ye as a,Z as b,ve as c,ke as d,me as e,G as f,be as g,Ne as h,Se as i,oe as j,ne as k,je as s,Ce as t,Ie as u,q as v};
