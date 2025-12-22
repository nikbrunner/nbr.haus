import { createFileRoute } from "@tanstack/react-router";
import { Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";

import profilePicture from "@/assets/images/profile_picture.jpg";
import { tech } from "@/config";
import { useTexts } from "@/i18n";
import { PrintSection } from "@/components/PrintSection";
import { texts as en } from "./-cv.en";
import { texts as de } from "./-cv.de";

const jobTech = {
  dealerCenter: [
    tech.react,
    tech.typescript,
    tech.scss,
    tech.tanstackRouter,
    tech.tanstackQuery,
    tech.tanstackForm,
    tech.redux,
    tech.graphql,
    tech.tailwind,
    tech.electron,
    tech.nodejs
  ],
  divaE: [tech.react, tech.typescript, tech.scss, tech.nodejs],
  campudus: [tech.react, tech.nodejs]
};

export const Route = createFileRoute("/cv/")({
  component: CVPage
});

function CVPage() {
  const t = useTexts({ en, de });
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="CV">
      {/* Header */}
      <header className="CV__header">
        <div className="CV__header-content">
          <h1 className="CV__name">Nikolaus Brunner</h1>
          <p className="CV__tagline">
            {t.tagline.replace("{years}", String(experienceInYears))}
          </p>
          <p className="CV__summary">
            {t.summary.replace("{years}", String(experienceInYears))}
          </p>
        </div>
        <div className="CV__header-aside">
          <img src={profilePicture} alt="Nikolaus Brunner" className="CV__photo" />
          <div className="CV__contact">
            <span>
              <MapPin size={14} />
              Landshut, Germany
            </span>
            <span>
              <Globe size={14} />
              nbr.haus
            </span>
            <span>
              <Mail size={14} />
              nik@nbr.haus
            </span>
            <span>
              <Github size={14} />
              github.com/nikbrunner
            </span>
            <span>
              <Linkedin size={14} />
              linkedin.com/in/nbru
            </span>
          </div>
        </div>
      </header>

      <PrintSection breakInside="auto">
        {/* Work Experience */}
        <h2 className="CV__section-title">{t.sections.workExperience}</h2>

        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.jobs.dealerCenter.position}</h3>
            <span className="CV__job-company">
              {t.jobs.dealerCenter.company} • {t.jobs.dealerCenter.period} • Landshut,
              Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong>{" "}
              {jobTech.dealerCenter.map(tech => tech.name).join(", ")}
            </span>
          </div>
          <p className="CV__job-intro">{t.jobs.dealerCenter.intro}</p>
          <ul className="CV__job-list">
            {t.jobs.dealerCenter.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.jobs.divaE.position}</h3>
            <span className="CV__job-company">
              {t.jobs.divaE.company} • {t.jobs.divaE.period} • Munich, Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong> {jobTech.divaE.map(tech => tech.name).join(", ")}
            </span>
          </div>
          <ul className="CV__job-list">
            {t.jobs.divaE.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.jobs.campudus.position}</h3>
            <span className="CV__job-company">
              {t.jobs.campudus.company} • {t.jobs.campudus.period} • Landshut, Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong> {jobTech.campudus.map(tech => tech.name).join(", ")}
            </span>
          </div>
          <ul className="CV__job-list">
            {t.jobs.campudus.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      </PrintSection>

      {/* Side Projects */}
      <PrintSection breakInside="auto">
        <h2 className="CV__section-title">{t.sections.sideProjects}</h2>

        <article className="CV__project">
          <h3 className="CV__project-title">Black Atom</h3>
          <span className="CV__project-subtitle">
            {t.projects.blackAtom.subtitle}
          </span>
          <ul className="CV__project-list">
            {t.projects.blackAtom.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__project">
          <h3 className="CV__project-title">AWDCS</h3>
          <span className="CV__project-subtitle">{t.projects.awdcs.subtitle}</span>
          <ul className="CV__project-list">
            {t.projects.awdcs.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__project">
          <h3 className="CV__project-title">kōyō</h3>
          <span className="CV__project-subtitle">{t.projects.koyo.subtitle}</span>
          <ul className="CV__project-list">
            {t.projects.koyo.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      </PrintSection>

      {/* Technical Skills */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.sections.technicalSkills}</h2>
        <div className="CV__skills">
          <p>
            <strong>{t.skills.frontend}:</strong> {t.skills.frontendList}
          </p>
          <p>
            <strong>{t.skills.devTools}:</strong> {t.skills.devToolsList}
          </p>
          <p>
            <strong>{t.skills.architecture}:</strong> {t.skills.architectureList}
          </p>
          <p>
            <strong>{t.skills.languages}:</strong> {t.skills.languagesList}
          </p>
        </div>
      </PrintSection>

      {/* Prior Experience */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.sections.priorExperience}</h2>
        <p className="CV__prior">
          <strong>{t.priorExperience.title}</strong> {t.priorExperience.description}
        </p>
        <p className="CV__education">
          <strong>{t.sections.education}:</strong> {t.education}
        </p>
      </PrintSection>

      {/* Interests */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.sections.interests}</h2>
        <p className="CV__interests">{t.interests}</p>
      </PrintSection>
    </div>
  );
}
