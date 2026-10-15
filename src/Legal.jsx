import { motion } from "framer-motion";
import { fadeUp, gridStagger, sectionStagger, viewport as motionViewport } from "@/lib/animations";
import legalCss from "./styles/legal.css?inline";

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
  {
    value: "0",
    label: "third-party requests",
    note: "Fonts and media are served from this domain.",
  },
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
  return (
    <>
      <style>{legalCss}</style>

      <main id="main" className="page">
        <div className="page-inner">
          <motion.header
            className="legal-hero"
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <div className="legal-hero-backdrop" aria-hidden="true" />
            <p className="legal-eyebrow">Impressum &amp; Datenschutz</p>
            <h1 className="legal-title">Who runs this site, and what it does with your data</h1>
            <p className="legal-lead">
              Legal notice under §5 DDG. The data part is short, because this site collects nothing.
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
              There is no contact form. If you write to the address above, that email is processed
              by my mail provider for the purpose of answering you, and kept no longer than that
              correspondence requires.
            </p>
            <p className="legal-text">
              The site is served as static files. Standard server logs may record the request, and
              they are not used to build a profile or linked to anything else.
            </p>
            <p className="legal-text">
              Links to LinkedIn, Figma and other external sites are ordinary links. Nothing is sent
              to them until you choose to follow one, and from that point their own policies apply.
            </p>
          </LegalSection>

          <LegalSection label="Your rights">
            <p className="legal-text">
              Under the GDPR you can ask what personal data I hold about you, and ask for it to be
              corrected or deleted. Write to the address above. You also have the right to complain
              to a supervisory authority.
            </p>
          </LegalSection>

          <LegalSection label="Content">
            <p className="legal-text">
              Case studies are published with the permission of the clients involved. One case is
              covered by a non-disclosure agreement: the client name and visual identity in it have
              been altered, and the screens shown use placeholder data, not real customer records.
            </p>
            <p className="legal-updated">Last updated: September 2026</p>
          </LegalSection>
        </div>
      </main>
    </>
  );
}
