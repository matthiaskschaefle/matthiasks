import { useEffect } from "react";
import { motion } from "framer-motion";
import { applySeo } from "@/lib/seo";
import { fadeUp, gridStagger, sectionStagger, viewport as motionViewport } from "@/lib/animations";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

// Impressum (§5 DDG) e a nota de privacidade. Uma pagina so: os dois textos
// sao curtos e um recrutador procura os dois no mesmo lugar.
//
// O endereco fica aqui e em nenhum outro lugar. Nao duplicar no resumeData:
// o CV nao leva endereco de rua e nao deve passar a levar por copia.
//
// Formato postal alemao: rua e numero na mesma linha sem virgula, CEP antes
// da cidade, e sem o bairro. O CEP ja identifica Steglitz, e acrescentar o
// bairro nao e usado em endereco postal.
const IMPRESSUM = {
  name: "Matthias Karl Schaefle",
  street: "Albrechtstraße 35",
  postal: "12167",
  city: "Berlin",
  country: "Germany",
  email: "matthias.k.schaefle@gmail.com",
  phone: "+49 1520 5830511",
  phoneHref: "tel:+4915205830511",
};

// A privacidade deste site e um argumento, nao um aviso. Estes tres fatos sao
// o que um recrutador alemao quer ver, entao ganham forma de dado.
const PRIVACY_FACTS = [
  { value: "0", label: "cookies", note: "None are set, so no banner is needed." },
  { value: "0", label: "trackers", note: "No analytics, no pixels, no session recording." },
  { value: "0", label: "third-party requests", note: "Fonts and media are served from this domain." },
];

function LegalSection({ label, children }) {
  return (
    <motion.section
      className="legal-section"
      variants={sectionStagger}
      initial="hidden"
      whileInView="visible"
      viewport={motionViewport}
    >
      <h2 className="legal-section-label">{label}</h2>
      <div className="legal-section-body">{children}</div>
    </motion.section>
  );
}

export default function Legal() {
  useEffect(() => {
    applySeo({
      title: "Impressum and Privacy | Matthias Schaefle",
      description:
        "Legal notice under §5 DDG and privacy information for matthiasks.com. The site sets no cookies, uses no analytics and loads no third-party resources.",
      path: "/legal",
      ogTitle: "Impressum and Privacy",
      ogDescription: "Legal notice and privacy information for matthiasks.com.",
    });
  }, []);

  return (
    <>
      <style>{`
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
      `}</style>

      <SiteHeader />

      <main id="main" className="page">
        <div className="page-inner">
          <motion.header className="legal-hero" initial="hidden" animate="visible" variants={fadeUp}>
            <div className="legal-hero-backdrop" aria-hidden="true" />
            <p className="legal-eyebrow">Impressum &amp; Datenschutz</p>
            <h1 className="legal-title">Who runs this site, and what it does with your data</h1>
            <p className="legal-lead">
              Legal notice under §5 DDG. The data part is short, because this
              site collects nothing.
            </p>
          </motion.header>

          <LegalSection label="Responsible for content">
            <div className="legal-card">
              <address className="legal-address">
                <div className="legal-address-name">{IMPRESSUM.name}</div>
                <div className="legal-address-lines">
                  {IMPRESSUM.street}
                  <br />
                  {IMPRESSUM.postal} {IMPRESSUM.city}
                  <br />
                  {IMPRESSUM.country}
                </div>
                <div className="legal-address-contact">
                  <a href={`mailto:${IMPRESSUM.email}`}>{IMPRESSUM.email}</a>
                  <a href={IMPRESSUM.phoneHref}>{IMPRESSUM.phone}</a>
                </div>
              </address>
            </div>
          </LegalSection>

          <LegalSection label="Privacy">
            <h3 className="legal-h3">Nothing to opt out of</h3>
            <motion.div className="legal-facts" variants={gridStagger}>
              {PRIVACY_FACTS.map((fact) => (
                <motion.div className="legal-fact" key={fact.label} variants={fadeUp}>
                  <div className="legal-fact-value">{fact.value}</div>
                  <div className="legal-fact-label">{fact.label}</div>
                  <p className="legal-fact-note">{fact.note}</p>
                </motion.div>
              ))}
            </motion.div>
            <p className="legal-text">
              There is no contact form. If you write to the address above, that
              email is processed by my mail provider for the purpose of
              answering you, and kept no longer than that correspondence
              requires.
            </p>
            <p className="legal-text">
              The site is served as static files. Standard server logs may
              record the request, and they are not used to build a profile or
              linked to anything else.
            </p>
            <p className="legal-text">
              Links to LinkedIn, Figma and other external sites are ordinary
              links. Nothing is sent to them until you choose to follow one, and
              from that point their own policies apply.
            </p>
          </LegalSection>

          <LegalSection label="Your rights">
            <p className="legal-text">
              Under the GDPR you can ask what personal data I hold about you,
              and ask for it to be corrected or deleted. Write to the address
              above. You also have the right to complain to a supervisory
              authority.
            </p>
          </LegalSection>

          <LegalSection label="Content">
            <p className="legal-text">
              Case studies are published with the permission of the clients
              involved. One case is covered by a non-disclosure agreement: the
              client name and visual identity in it have been altered, and the
              screens shown use placeholder data, not real customer records.
            </p>
            <p className="legal-updated">Last updated: September 2026</p>
          </LegalSection>
        </div>
      </main>

      <SiteFooter tagline="Legal notice and privacy." />
    </>
  );
}
