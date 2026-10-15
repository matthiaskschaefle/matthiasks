import { resume, RESUME_PDF_URL } from "@/lib/resumeData.js";
import resumeCss from "./styles/resume.css?inline";

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
        {job.bullets.map((b) => (
          <li key={b.slice(0, 40)}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Resume() {
  return (
    <>
      <style>{resumeCss}</style>

      <main id="main" className="page">
        <div className="page-inner">
          <article className="resume-doc">
            <div className="resume-actions">
              <p className="resume-actions-note">Full resume below. The PDF has selectable text.</p>
              <a className="btn btn--primary btn--sm" href={RESUME_PDF_URL} download>
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
                  <li key={c.value}>{c.href ? <a href={c.href}>{c.value}</a> : c.value}</li>
                ))}
                <li className="resume-site">
                  <a href={resume.site.href}>{resume.site.value}</a>
                </li>
              </ul>
            </header>

            <p className="resume-intro">{resume.intro}</p>

            <section className="resume-section" aria-labelledby="resume-exp">
              <h2 className="resume-label" id="resume-exp">
                Professional experience
              </h2>
              {resume.experience.map((job) => (
                <ResumeEntry key={job.title} job={job} />
              ))}
            </section>

            <section className="resume-section" aria-labelledby="resume-edu-projects">
              <h2 className="resume-label" id="resume-edu-projects">
                Selected educational project
              </h2>
              {resume.educationalProjects.map((job) => (
                <ResumeEntry key={job.title} job={job} />
              ))}
            </section>

            <div className="resume-section resume-cols">
              <section aria-labelledby="resume-skills">
                <h2 className="resume-label" id="resume-skills">
                  Skills
                </h2>
                {resume.skills.map((s) => (
                  <div className="resume-block" key={s.title}>
                    <h3 className="resume-block-title">{s.title}</h3>
                    <div className="resume-block-body">{s.body}</div>
                  </div>
                ))}
              </section>

              <section aria-labelledby="resume-edu">
                <h2 className="resume-label" id="resume-edu">
                  Education
                </h2>
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
    </>
  );
}
