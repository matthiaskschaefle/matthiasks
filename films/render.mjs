// Estúdio de filmes dos cases.
//
// Cada filme vive em films/<nome>/film.json: tema (cores e marca), tamanho e
// uma lista de cenas. Cada cena é desenhada em HTML com as fontes do site,
// filmada quadro a quadro no navegador e codificada com ffmpeg. As cenas são
// juntadas sem nova codificação, e o roteiro vira também a legenda (.vtt).
//
// Rodar:   node films/render.mjs mappe
// Só uma cena (para ajustar):   node films/render.mjs mappe --scene 3
// Só quadros de conferência, sem vídeo:   node films/render.mjs mappe --stills
//
// Cenas "demo" filmam o produto de verdade: o navegador abre a URL da cena,
// (notas com side: right, left ou below)
// um cursor desenhado anda até cada alvo, clica, digita e rola, e setas com
// notas apontam para o que importa. A página roda com movimento reduzido, então
// o que muda na tela muda num quadro só, e o ritmo vem do cursor.
//
// Saída: public/media/<nome>-film.mp4, <nome>-film.en.vtt e <nome>-film-poster.jpg.

import { spawn } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { chromium } from "playwright-core";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const FPS = 30;

const args = process.argv.slice(2);
const name = args.find((a) => !a.startsWith("--"));
if (!name) throw new Error("Diga o filme: node films/render.mjs <nome>");
const onlyScene = args.includes("--scene") ? Number(args[args.indexOf("--scene") + 1]) : null;
const stillsOnly = args.includes("--stills");

const filmDir = join(root, "films", name);
const film = JSON.parse(readFileSync(join(filmDir, "film.json"), "utf8"));
const [W, H] = film.size ?? [1280, 720];
const workDir = join(filmDir, ".work");
mkdirSync(workDir, { recursive: true });

async function ffmpegPath() {
  if (process.env.FFMPEG) return process.env.FFMPEG;
  try {
    return (await import("ffmpeg-static")).default;
  } catch {
    return "ffmpeg";
  }
}

function browserPath() {
  const candidates = [
    process.env.BROWSER,
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/usr/bin/google-chrome",
    "/usr/bin/chromium",
  ].filter(Boolean);
  const found = candidates.find((p) => existsSync(p));
  if (!found)
    throw new Error(
      "Nenhum navegador encontrado. Defina BROWSER com o caminho do Edge ou do Chrome.",
    );
  return found;
}

const fileUrl = (p) => pathToFileURL(p).href;
const esc = (s = "") =>
  String(s).replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const asset = (p) => fileUrl(join(filmDir, p));
const lines = (text, cls = "line") =>
  String(text)
    .split("\n")
    .map((l, i) => `<span class="${cls}" style="--i:${i}"><span>${esc(l)}</span></span>`)
    .join("");

// ── Cenas ────────────────────────────────────────────────────────────────

function statement(s) {
  return `
    <section class="scene ${s.dark ? "dark" : "light"} statement">
      ${s.logo ? `<img class="logo in" style="--d:0ms" src="${asset(s.logo)}" alt="">` : ""}
      ${s.eyebrow ? `<p class="eyebrow in" style="--d:100ms">${esc(s.eyebrow)}</p>` : ""}
      <h1 class="big">${lines(s.text)}</h1>
      ${s.sub ? `<p class="sub in" style="--d:700ms">${esc(s.sub)}</p>` : ""}
    </section>`;
}

function frameFor(shot) {
  const src = asset(shot.src);
  if (shot.frame === "plain") {
    return `<img class="plain" style="${shot.style ?? ""}" src="${src}" alt="">`;
  }
  if (shot.frame === "phone") {
    return `<div class="phone" style="${shot.style ?? ""}"><img src="${src}" alt=""></div>`;
  }
  return `<div class="browser" style="${shot.style ?? ""}">
      <div class="browser-bar"><i></i><i></i><i></i>${shot.url ? `<span>${esc(shot.url)}</span>` : ""}</div>
      <div class="browser-view" style="--pan:${shot.pan ?? 0}px"><img src="${src}" alt=""></div>
    </div>`;
}

function shot(s) {
  const shots = Array.isArray(s.shots) ? s.shots : [s.shots];
  return `
    <section class="scene ${s.dark ? "dark" : "light"} shot">
      <div class="copy">
        ${s.eyebrow ? `<p class="eyebrow in" style="--d:0ms">${esc(s.eyebrow)}</p>` : ""}
        <h2 class="mid">${lines(s.text)}</h2>
        ${s.sub ? `<p class="sub in" style="--d:600ms">${esc(s.sub)}</p>` : ""}
      </div>
      <div class="stage">${shots.map((x, i) => `<div class="enter" style="--d:${200 + i * 250}ms">${frameFor(x)}</div>`).join("")}</div>
    </section>`;
}

function numbers(s) {
  return `
    <section class="scene ${s.dark ? "dark" : "light"} numbers">
      ${s.eyebrow ? `<p class="eyebrow in" style="--d:0ms">${esc(s.eyebrow)}</p>` : ""}
      <div class="nums">
        ${s.items
          .map(
            (n, i) => `<div class="num in" style="--d:${250 + i * 350}ms">
              ${n.text ? `<b>${esc(n.text)}</b>` : `<b class="count" style="--to:${n.value};--cd:${250 + i * 350}ms">${esc(n.prefix ?? "")}<span></span>${esc(n.suffix ?? "")}</b>`}
              <span>${esc(n.label)}</span></div>`,
          )
          .join("")}
      </div>
      ${s.sub ? `<p class="sub in" style="--d:${400 + s.items.length * 350}ms">${esc(s.sub)}</p>` : ""}
    </section>`;
}

function end(s) {
  return `
    <section class="scene ${s.dark ? "dark" : "light"} end">
      ${s.logo ? `<img class="logo big-logo in" style="--d:0ms" src="${asset(s.logo)}" alt="">` : ""}
      <h2 class="mid">${lines(s.text)}</h2>
      ${s.sub ? `<p class="eyebrow in" style="--d:700ms">${esc(s.sub)}</p>` : ""}
    </section>`;
}

const TYPES = { statement, shot, numbers, end };

function page(scene) {
  const t = film.theme;
  const fonts = join(root, "public", "assets", "fonts");
  return `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Display;src:url(${fileUrl(join(fonts, "mona-sans-latin-standard.woff2"))});font-weight:200 900;font-stretch:75% 125%}
@font-face{font-family:Body;src:url(${fileUrl(join(fonts, "figtree-latin-wght.woff2"))});font-weight:300 900}
@property --n{syntax:"<integer>";inherits:true;initial-value:0}
*{box-sizing:border-box;margin:0}
html,body{width:${W}px;height:${H}px;overflow:hidden}
body{font-family:Body,sans-serif;-webkit-font-smoothing:antialiased}
.scene{position:absolute;inset:0;padding:${H * 0.12}px ${W * 0.06}px;display:flex;flex-direction:column;justify-content:center}
.light{background:${t.light};color:${t.ink}}
.dark{background:radial-gradient(120% 90% at 30% 20%, ${t.darkTop}, ${t.dark});color:${t.onDark}}
.eyebrow{font:600 ${H * 0.019}px/1.2 Body;letter-spacing:.16em;text-transform:uppercase;opacity:.7;margin-bottom:${H * 0.025}px}
.big{font:800 ${H * 0.1}px/1.02 Display;font-stretch:112.5%;letter-spacing:-.025em}
.mid{font:750 ${H * 0.056}px/1.08 Display;font-stretch:112.5%;letter-spacing:-.02em}
.sub{font:500 ${H * 0.026}px/1.45 Body;opacity:.8;margin-top:${H * 0.03}px;max-width:34ch}
.dark .accent,.dark b.count{color:${t.onDark}}
.line{display:block;overflow:hidden;padding-bottom:.08em;margin-bottom:-.08em}
.line>span{display:inline-block;animation:rise 520ms cubic-bezier(.22,1,.36,1) both;animation-delay:calc(150ms + var(--i) * 120ms)}
.in{animation:fade 480ms cubic-bezier(.22,1,.36,1) both;animation-delay:var(--d)}
.enter{animation:enter 700ms cubic-bezier(.22,1,.36,1) both;animation-delay:var(--d)}
@keyframes rise{from{transform:translateY(110%)}to{transform:none}}
@keyframes fade{from{opacity:0;transform:translateY(12px)}}
@keyframes enter{from{opacity:0;transform:translateY(28px) scale(.98)}}
.logo{height:${H * 0.08}px;width:auto;margin-bottom:${H * 0.05}px;align-self:flex-start}
.big-logo{height:${H * 0.12}px}
.shot{flex-direction:row;align-items:center;gap:${W * 0.04}px}
.shot .copy{flex:0 0 30%}
.stage{position:relative;flex:1;height:100%;display:flex;align-items:center;justify-content:center}
.stage>.enter{position:absolute}
.stage>.enter:nth-child(2){right:-2%;bottom:6%}
.browser{width:${W * 0.6}px;border-radius:12px;overflow:hidden;background:#fff;box-shadow:0 30px 60px -20px rgba(20,18,40,.35),0 0 0 1px rgba(20,18,40,.06)}
.browser-bar{height:${H * 0.04}px;display:flex;align-items:center;gap:6px;padding:0 12px;background:#f1f1f3;font:500 ${H * 0.016}px Body;color:#666}
.browser-bar i{width:9px;height:9px;border-radius:50%;background:#d4d4d8}
.browser-bar span{margin-left:12px;padding:3px 10px;border-radius:6px;background:#fff}
.browser-view{max-height:${H * 0.62}px;overflow:hidden;background:#fff}
.browser-view img{width:100%;display:block;animation:pan 6000ms linear both;animation-delay:900ms}
@keyframes pan{to{transform:translateY(calc(var(--pan) * -1))}}
.plain{display:block;max-width:${W * 0.56}px;max-height:${H * 0.72}px;border-radius:10px;box-shadow:0 30px 60px -24px rgba(20,18,40,.35)}
.phone{width:${H * 0.36}px;border-radius:${H * 0.035}px;padding:${H * 0.008}px;background:#111;box-shadow:0 30px 60px -20px rgba(20,18,40,.45)}
.phone img{width:100%;display:block;border-radius:${H * 0.028}px}
.nums{display:flex;gap:${W * 0.08}px}
.num b{display:block;font:800 ${H * 0.2}px/1 Display;font-stretch:112.5%;letter-spacing:-.03em;font-variant-numeric:tabular-nums}
.num>span{display:block;font:600 ${H * 0.03}px/1.25 Body;max-width:16ch;margin-top:${H * 0.015}px}
.count span{counter-reset:n var(--n)}
.count span::after{content:counter(n)}
.count{animation:count 1100ms cubic-bezier(.22,1,.36,1) both;animation-delay:var(--cd)}
@keyframes count{from{--n:0}to{--n:var(--to)}}
.end{align-items:flex-start}
.end .eyebrow{margin:${H * 0.035}px 0 0}
${film.css ?? ""}
</style></head><body>${TYPES[scene.type](scene)}</body></html>`;
}

// ── Demo: o produto em uso ────────────────────────────────────────────────

const OVERLAY = `
(() => {
  if (document.getElementById("__film")) return;
  const root = document.createElement("div");
  root.id = "__film";
  root.innerHTML = \`
    <style>
      #__film{position:fixed;inset:0;pointer-events:none;z-index:2147483647}
      #__cur{position:absolute;left:0;top:0;width:26px;height:26px;transform:translate(-3px,-2px);filter:drop-shadow(0 2px 3px rgba(0,0,0,.35))}
      #__rip{position:absolute;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;border:2.5px solid var(--film-accent);opacity:0}
      .__note{position:absolute;display:flex;align-items:center;gap:10px;opacity:0;transition:none}
      .__note b{font:700 15px/1.25 Figtree,system-ui,sans-serif;color:#fff;background:var(--film-accent);padding:8px 12px;border-radius:10px;max-width:260px;box-shadow:0 8px 20px -8px rgba(0,0,0,.4)}
      .__note svg{flex:none}
      .__ring{position:absolute;border:2.5px solid var(--film-accent);border-radius:12px;opacity:0}
    </style>
    <svg id="__cur" viewBox="0 0 26 26"><path d="M3 2l18 9.5-7.6 2.1L10 21z" fill="#111" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>
    <div id="__rip"></div>\`;
  document.body.appendChild(root);
})();`;

const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

async function centerOf(pg, selector) {
  const loc = pg.locator(selector).first();
  await loc.scrollIntoViewIfNeeded().catch(() => {});
  const box = await loc.boundingBox();
  if (!box) throw new Error(`Alvo não encontrado na tela: ${selector}`);
  return { x: box.x + box.width / 2, y: box.y + box.height / 2, box };
}

async function recordDemo(scene, push) {
  const vp = scene.viewport ?? [W, H];
  const ctx2 = await browser.newContext({
    viewport: { width: vp[0], height: vp[1] },
    deviceScaleFactor: W / vp[0],
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const pg = await ctx2.newPage();
  // Um arquivo da pasta do filme (um protótipo, por exemplo) também serve de url.
  const url = /^(https?|file):/.test(scene.url)
    ? scene.url
    : fileUrl(join(filmDir, scene.url.split("#")[0])) +
      (scene.url.includes("#") ? `#${scene.url.split("#")[1]}` : "");
  await pg.goto(url, { waitUntil: "networkidle" });
  await pg.addStyleTag({ content: `:root{--film-accent:${film.theme.accent ?? "#4b37d1"}}` });
  // "pointer": "touch" troca a seta por um dedo, para telas de celular.
  if (scene.pointer === "touch")
    await pg.addStyleTag({
      content:
        "#__film #__cur{width:30px;height:30px;transform:translate(-15px,-15px);border-radius:50%;background:rgba(17,24,39,.32);border:2px solid rgba(255,255,255,.95);filter:none;box-shadow:0 2px 6px rgba(0,0,0,.25)}#__film #__cur path{display:none}",
    });
  await pg.evaluate(OVERLAY);
  await pg.waitForTimeout(scene.settle ?? 1200);

  let cur = { x: vp[0] * 0.62, y: vp[1] * 0.7 };
  const setCursor = (p) =>
    pg.evaluate(({ x, y }) => {
      const c = document.getElementById("__cur");
      c.style.left = `${x}px`;
      c.style.top = `${y}px`;
    }, p);
  const frame = async () => push(await pg.screenshot({ type: "jpeg", quality: 92 }));
  const hold = async (seconds) => {
    const buf = await pg.screenshot({ type: "jpeg", quality: 92 });
    for (let i = 0; i < Math.round(seconds * FPS); i += 1) push(buf);
  };
  const moveTo = async (to, seconds = 0.7) => {
    const n = Math.max(1, Math.round(seconds * FPS));
    const from = { ...cur };
    for (let i = 1; i <= n; i += 1) {
      const t = ease(i / n);
      cur = { x: from.x + (to.x - from.x) * t, y: from.y + (to.y - from.y) * t };
      await setCursor(cur);
      await frame();
    }
  };
  const ripple = async () => {
    for (let i = 0; i <= 8; i += 1) {
      await pg.evaluate(
        ({ x, y, k }) => {
          const r = document.getElementById("__rip");
          r.style.left = `${x}px`;
          r.style.top = `${y}px`;
          r.style.opacity = String(1 - k);
          r.style.transform = `scale(${0.4 + k * 0.9})`;
        },
        { ...cur, k: i / 8 },
      );
      await frame();
    }
  };
  const note = async (step) => {
    const { box } = await centerOf(pg, step.note);
    await pg.evaluate(
      ({ box, text, side, id }) => {
        const root = document.getElementById("__film");
        const ring = document.createElement("div");
        ring.className = "__ring";
        ring.dataset.n = id;
        Object.assign(ring.style, {
          left: `${box.x - 6}px`,
          top: `${box.y - 6}px`,
          width: `${box.width + 12}px`,
          height: `${box.height + 12}px`,
        });
        const n = document.createElement("div");
        n.className = "__note";
        n.dataset.n = id;
        const arrow =
          side === "left"
            ? '<svg width="46" height="20" viewBox="0 0 46 20"><path d="M2 10h38m-8-7 8 7-8 7" fill="none" stroke="var(--film-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            : '<svg width="46" height="20" viewBox="0 0 46 20"><path d="M44 10H6m8-7-8 7 8 7" fill="none" stroke="var(--film-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        const up =
          '<svg width="20" height="34" viewBox="0 0 20 34"><path d="M10 32V6M3 13l7-8 7 8" fill="none" stroke="var(--film-accent)" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
        if (side === "below") {
          n.style.flexDirection = "column";
          n.style.alignItems = "flex-start";
          n.innerHTML = `${up}<b>${text}</b>`;
        } else {
          n.innerHTML = side === "left" ? `<b>${text}</b>${arrow}` : `${arrow}<b>${text}</b>`;
        }
        root.append(ring, n);
        const r = n.getBoundingClientRect();
        let y = box.y + box.height / 2 - r.height / 2;
        let x = side === "left" ? box.x - 12 - r.width : box.x + box.width + 12;
        if (side === "below") {
          x = box.x + 24;
          y = box.y + box.height + 10;
        }
        Object.assign(n.style, { left: `${Math.max(8, x)}px`, top: `${Math.max(8, y)}px` });
      },
      { box, text: step.text, side: step.side ?? "right", id: String(step.note) },
    );
    for (let i = 1; i <= 9; i += 1) {
      await pg.evaluate(
        ({ id, k }) => {
          for (const el of document.querySelectorAll(`[data-n="${CSS.escape(id)}"]`))
            el.style.opacity = String(k);
        },
        { id: String(step.note), k: i / 9 },
      );
      await frame();
    }
  };
  const clearNotes = () =>
    pg.evaluate(() => document.querySelectorAll(".__note,.__ring").forEach((e) => e.remove()));

  await setCursor(cur);
  await hold(0.3);
  for (const step of scene.steps) {
    if (step.move) await moveTo(await centerOf(pg, step.move), step.seconds);
    else if (step.click) {
      const target = await centerOf(pg, step.click);
      await moveTo(target, step.seconds);
      await ripple();
      await pg.mouse.click(target.x, target.y);
      await pg.waitForTimeout(step.settle ?? 400);
      await pg.evaluate(OVERLAY);
      await setCursor(cur);
      await frame();
    } else if (step.type) {
      const target = await centerOf(pg, step.type);
      await moveTo(target, step.seconds);
      await pg.mouse.click(target.x, target.y);
      for (const ch of step.text) {
        await pg.keyboard.type(ch);
        await frame();
        await frame();
      }
    } else if (step.scroll !== undefined) {
      const n = Math.round((step.seconds ?? 1) * FPS);
      const start = await pg.evaluate(() => window.scrollY);
      for (let i = 1; i <= n; i += 1) {
        await pg.evaluate((y) => window.scrollTo(0, y), start + step.scroll * ease(i / n));
        await frame();
      }
    } else if (step.note) await note(step);
    else if (step.clearNotes) await clearNotes();
    else if (step.key) {
      await pg.keyboard.press(step.key);
      await pg.waitForTimeout(300);
      await frame();
    }
    if (step.hold) await hold(step.hold);
  }
  await hold(scene.tail ?? 0.6);
  await ctx2.close();
}

// ── Captura e montagem ───────────────────────────────────────────────────

function run(bin, argv, input) {
  return new Promise((ok, fail) => {
    const p = spawn(bin, argv, { stdio: [input ? "pipe" : "ignore", "ignore", "pipe"] });
    let err = "";
    p.stderr.on("data", (d) => (err += d));
    p.on("close", (code) =>
      code === 0 ? ok() : fail(new Error(`${bin} saiu com ${code}\n${err.slice(-800)}`)),
    );
    if (input) input(p.stdin);
  });
}

async function seek(pageObj, ms) {
  await pageObj.evaluate((t) => {
    for (const a of document.getAnimations()) {
      a.pause();
      a.currentTime = t;
    }
  }, ms);
}

const ffmpeg = await ffmpegPath();
const browser = await chromium.launch({
  executablePath: browserPath(),
  args: ["--allow-file-access-from-files"],
});
const ctx = await browser.newContext({ viewport: { width: W, height: H }, deviceScaleFactor: 1 });
const tab = await ctx.newPage();

const parts = [];
let clock = 0;
const cues = [];

try {
  for (const [index, scene] of film.scenes.entries()) {
    const out = join(workDir, `scene-${String(index).padStart(2, "0")}.mp4`);
    parts.push(out);
    if (scene.type === "demo") {
      if (onlyScene !== null && onlyScene !== index) {
        throw new Error("--scene ainda não sabe pular cenas demo: rode o filme inteiro.");
      }
      const bufs = [];
      await recordDemo(scene, (b) => bufs.push(b));
      if (stillsOnly) {
        for (const at of [0.35, 0.7, 0.98]) {
          writeFileSync(
            join(workDir, `still-${index}-${Math.round(at * 100)}.jpg`),
            bufs[Math.floor((bufs.length - 1) * at)],
          );
        }
        continue;
      }
      const dur = bufs.length / FPS;
      cues.push({ start: clock, end: clock + dur, text: scene.caption ?? "" });
      clock += dur;
      const bg = film.theme.light.replace("#", "0x");
      const tmp = out.replace(/\.mp4$/, ".tmp.mp4");
      await run(
        ffmpeg,
        [
          "-y",
          "-f",
          "image2pipe",
          "-framerate",
          String(FPS),
          "-c:v",
          "mjpeg",
          "-i",
          "-",
          "-vf",
          `fade=t=in:st=0:d=0.25:color=${bg},fade=t=out:st=${Math.max(0, dur - 0.3)}:d=0.3:color=${bg}`,
          "-c:v",
          "libx264",
          "-crf",
          "18",
          "-preset",
          "veryfast",
          "-pix_fmt",
          "yuv420p",
          "-r",
          String(FPS),
          tmp,
        ],
        async (stdin) => {
          for (const b of bufs)
            if (!stdin.write(b)) await new Promise((r) => stdin.once("drain", r));
          stdin.end();
        },
      );
      renameSync(tmp, out);
      console.log(`cena ${index} (demo) pronta (${dur.toFixed(1)}s)`);
      continue;
    }
    const dur = scene.duration;
    cues.push({ start: clock, end: clock + dur, text: scene.caption ?? scene.text });
    clock += dur;
    if (onlyScene !== null && onlyScene !== index) continue;

    const htmlPath = join(workDir, `scene-${index}.html`);
    writeFileSync(htmlPath, page(scene));
    await tab.goto(fileUrl(htmlPath), { waitUntil: "load" });
    await tab.evaluate(() => document.fonts.ready);

    if (stillsOnly) {
      for (const at of [0.35, 0.7, 0.98]) {
        await seek(tab, dur * at * 1000);
        await tab.screenshot({
          path: join(workDir, `still-${index}-${Math.round(at * 100)}.jpg`),
          type: "jpeg",
          quality: 85,
        });
      }
      continue;
    }

    const frames = Math.round(dur * FPS);
    const fadeOut = scene.fadeOut ?? 0.35;
    // Fade to the scene's own background, not to black, so cuts between light scenes stay light.
    const bg = (scene.dark ? film.theme.dark : film.theme.light).replace("#", "0x");
    const tmp = out.replace(/\.mp4$/, ".tmp.mp4");
    await run(
      ffmpeg,
      [
        "-y",
        "-f",
        "image2pipe",
        "-framerate",
        String(FPS),
        "-c:v",
        "mjpeg",
        "-i",
        "-",
        "-vf",
        `fade=t=in:st=0:d=0.25:color=${bg},fade=t=out:st=${Math.max(0, dur - fadeOut)}:d=${fadeOut}:color=${bg}`,
        "-c:v",
        "libx264",
        "-crf",
        "18",
        "-preset",
        "veryfast",
        "-pix_fmt",
        "yuv420p",
        "-r",
        String(FPS),
        tmp,
      ],
      async (stdin) => {
        for (let f = 0; f < frames; f += 1) {
          await seek(tab, (f / FPS) * 1000);
          const buf = await tab.screenshot({ type: "jpeg", quality: 92 });
          if (!stdin.write(buf)) await new Promise((r) => stdin.once("drain", r));
        }
        stdin.end();
      },
    );
    renameSync(tmp, out);
    console.log(`cena ${index} pronta (${dur}s)`);
  }

  if (!stillsOnly && onlyScene === null) {
    const list = join(workDir, "list.txt");
    writeFileSync(list, parts.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"));
    const media = join(root, "public", "media");
    const finalTmp = join(media, `${name}-film.tmp.mp4`);
    await run(ffmpeg, [
      "-y",
      "-f",
      "concat",
      "-safe",
      "0",
      "-i",
      list,
      "-c",
      "copy",
      "-movflags",
      "+faststart",
      finalTmp,
    ]);
    renameSync(finalTmp, join(media, `${name}-film.mp4`));

    const stamp = (s) => {
      const m = Math.floor(s / 60);
      return `${String(m).padStart(2, "0")}:${(s - m * 60).toFixed(3).padStart(6, "0")}`;
    };
    writeFileSync(
      join(media, `${name}-film.en.vtt`),
      `WEBVTT\n\n${cues.map((c) => `${stamp(c.start)} --> ${stamp(c.end)}\n${c.text}`).join("\n\n")}\n`,
    );
    const poster = film.poster ?? { scene: 1, at: 0.9 };
    const posterAt =
      cues[poster.scene].start + (cues[poster.scene].end - cues[poster.scene].start) * poster.at;
    await run(ffmpeg, [
      "-y",
      "-ss",
      String(posterAt),
      "-i",
      join(media, `${name}-film.mp4`),
      "-frames:v",
      "1",
      "-q:v",
      "3",
      join(media, `${name}-film-poster.jpg`),
    ]);
    rmSync(workDir, { recursive: true, force: true });
    console.log(`pronto: public/media/${name}-film.mp4 (${clock.toFixed(1)}s)`);
  }
} finally {
  await browser.close();
}
