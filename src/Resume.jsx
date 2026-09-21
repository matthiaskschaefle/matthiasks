import { useEffect } from "react";
import { applySeo } from "@/lib/seo";
import { resume, RESUME_PDF_URL } from "@/lib/resumeData.js";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";

/**
 * Pagina /resume: o curriculo legivel na tela, com o PDF como download.
 *
 * O conteudo vem de src/lib/resumeData.js, o mesmo modulo que alimenta o
 * gerador do PDF. Nao escrever texto de CV aqui: se duplicar, a pagina e o
 * PDF divergem sem ninguem perceber.
 *
 * Por que HTML e nao um <iframe> do PDF: navegador mobile em geral nao
 * renderiza PDF inline, e uma imagem do CV seria texto-como-imagem, que
 * reprova no WCAG AA. Aqui o texto e real, responsivo e selecionavel.
 */
function ResumeEntry({ job }) {
  return (
    <article className="resume-job">
      <div className="resume-job-head">
        <h3 className="resume-job-title">{job.title}</h3>
        <div className="resume-job-meta">
          <span>{job.kind}</span>
          <span>{job.period}</span>
        </div>
      </div>
      <p className="resume-job-summary">{job.summary}</p>
      <ul className="resume-bullets">
        {job.bullets.map((b) => <li key={b.slice(0, 40)}>{b}</li>)}
      </ul>
    </article>
  );
}

export default function Resume() {
  useEffect(() => {
    applySeo({
      title: "Resume | Matthias Schaefle | UX/UI Designer in Berlin",
      description:
        "Resume of Matthias Schaefle, UX/UI Designer based in Berlin. Research-led product design and prototyping in React and Vite.",
      path: "/resume",
      ogTitle: "Resume | Matthias Schaefle",
      ogDescription: "UX/UI Designer in Berlin. Research-led product design and technical prototyping.",
    });
  }, []);

  return (
    <>
      <style>{`
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
      `}</style>

      <SiteHeader active="resume" />

      <main id="main" className="page">
        <div className="page-inner">
          <article className="resume-doc">
            <div className="resume-actions">
              <p className="resume-actions-note">
                Full resume below. The PDF has selectable text.
              </p>
              <a
                className="btn btn--primary btn--sm"
                href={RESUME_PDF_URL}
                download
              >
                Download PDF
              </a>
            </div>

            <header className="resume-head">
              <div>
                <h1 className="resume-name">{resume.name}</h1>
                <div className="resume-role">{resume.role}</div>
              </div>
              <ul className="resume-contact">
                {resume.contact.map((c) => (
                  <li key={c.value}>
                    {c.href ? <a href={c.href}>{c.value}</a> : c.value}
                  </li>
                ))}
                <li className="resume-site">
                  <a href={resume.site.href}>{resume.site.value}</a>
                </li>
              </ul>
            </header>

            <p className="resume-intro">{resume.intro}</p>

            <section className="resume-section" aria-labelledby="resume-exp">
              <h2 className="resume-label" id="resume-exp">Professional experience</h2>
              {resume.experience.map((job) => (
                <ResumeEntry key={job.title} job={job} />
              ))}
            </section>

            <section className="resume-section" aria-labelledby="resume-edu-projects">
              <h2 className="resume-label" id="resume-edu-projects">Selected educational project</h2>
              {resume.educationalProjects.map((job) => (
                <ResumeEntry key={job.title} job={job} />
              ))}
            </section>

            <div className="resume-section resume-cols">
              <section aria-labelledby="resume-skills">
                <h2 className="resume-label" id="resume-skills">Skills</h2>
                {resume.skills.map((s) => (
                  <div className="resume-block" key={s.title}>
                    <h3 className="resume-block-title">{s.title}</h3>
                    <div className="resume-block-body">{s.body}</div>
                  </div>
                ))}
              </section>

              <section aria-labelledby="resume-edu">
                <h2 className="resume-label" id="resume-edu">Education</h2>
                {resume.education.map((e) => (
                  <div className="resume-edu" key={e.name}>
                    <h3 className="resume-edu-name">{e.name}</h3>
                    <div className="resume-edu-meta">
                      <span>{e.where}</span>
                      <span className="resume-edu-when">{e.when}</span>
                    </div>
                    {e.note && <p className="resume-edu-note">{e.note}</p>}
                  </div>
                ))}
              </section>
            </div>
          </article>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
