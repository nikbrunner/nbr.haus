import { createFileRoute } from "@tanstack/react-router";
import { Github, Globe, Linkedin, Mail, MapPin } from "lucide-react";

import profilePicture from "@/assets/images/profile_picture.jpg";
import { tech } from "@/config";
import { useTranslation } from "@/i18n";
import { PrintSection } from "../components/PrintSection";

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

export const Route = createFileRoute("/cv")({
  component: CVPage
});

function CVPage() {
  const { t } = useTranslation();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="CV">
      {/* Header */}
      <header className="CV__header">
        <div className="CV__header-content">
          <h1 className="CV__name">Nikolaus Brunner</h1>
          <p className="CV__tagline">
            {t.cv.tagline.replace("{years}", String(experienceInYears))}
          </p>
          <p className="CV__summary">
            {t.cv.summary.replace("{years}", String(experienceInYears))}
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
        <h2 className="CV__section-title">{t.cv.sections.workExperience}</h2>

        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.index.jobs.dealerCenter.position}</h3>
            <span className="CV__job-company">
              {t.index.jobs.dealerCenter.company} •{" "}
              {t.index.jobs.dealerCenter.period} • Landshut, Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong> {jobTech.dealerCenter.map(t => t.name).join(", ")}
            </span>
          </div>
          <p className="CV__job-intro">{t.cv.jobs.dealerCenter.intro}</p>
          <ul className="CV__job-list">
            {t.cv.jobs.dealerCenter.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.index.jobs.divaE.position}</h3>
            <span className="CV__job-company">
              {t.index.jobs.divaE.company} • {t.index.jobs.divaE.period} • Munich,
              Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong> {jobTech.divaE.map(t => t.name).join(", ")}
            </span>
          </div>
          <ul className="CV__job-list">
            {t.cv.jobs.divaE.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
        <article className="CV__job">
          <div className="CV__job-header">
            <h3 className="CV__job-title">{t.index.jobs.campudus.position}</h3>
            <span className="CV__job-company">
              {t.index.jobs.campudus.company} • {t.index.jobs.campudus.period} •
              Landshut, Germany
            </span>
            <span className="CV__job-tech">
              <strong>Tech:</strong> {jobTech.campudus.map(t => t.name).join(", ")}
            </span>
          </div>
          <ul className="CV__job-list">
            {t.cv.jobs.campudus.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      </PrintSection>

      {/* Side Projects */}
      <PrintSection breakInside="auto">
        <h2 className="CV__section-title">{t.cv.sections.sideProjects}</h2>

        <article className="CV__project">
          <h3 className="CV__project-title">Black Atom</h3>
          <span className="CV__project-subtitle">
            {t.cv.projects.blackAtom.subtitle}
          </span>
          <ul className="CV__project-list">
            {t.cv.projects.blackAtom.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__project">
          <h3 className="CV__project-title">AWDCS</h3>
          <span className="CV__project-subtitle">
            {t.cv.projects.awdcs.subtitle}
          </span>
          <ul className="CV__project-list">
            {t.cv.projects.awdcs.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>

        <article className="CV__project">
          <h3 className="CV__project-title">kōyō</h3>
          <span className="CV__project-subtitle">{t.cv.projects.koyo.subtitle}</span>
          <ul className="CV__project-list">
            {t.cv.projects.koyo.bullets.map((bullet, i) => (
              <li key={i}>{bullet}</li>
            ))}
          </ul>
        </article>
      </PrintSection>

      {/* Technical Skills */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.cv.sections.technicalSkills}</h2>
        <div className="CV__skills">
          <p>
            <strong>{t.cv.skills.frontend}:</strong> {t.cv.skills.frontendList}
          </p>
          <p>
            <strong>{t.cv.skills.devTools}:</strong> {t.cv.skills.devToolsList}
          </p>
          <p>
            <strong>{t.cv.skills.architecture}:</strong>{" "}
            {t.cv.skills.architectureList}
          </p>
        </div>
      </PrintSection>

      {/* Prior Experience */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.cv.sections.priorExperience}</h2>
        <p className="CV__prior">
          <strong>{t.cv.priorExperience.title}</strong>{" "}
          {t.cv.priorExperience.description}
        </p>
        <p className="CV__education">
          <strong>{t.cv.sections.education}:</strong> {t.cv.education}
        </p>
      </PrintSection>

      {/* Interests */}
      <PrintSection breakInside="avoid">
        <h2 className="CV__section-title">{t.cv.sections.interests}</h2>
        <p className="CV__interests">{t.cv.interests}</p>
      </PrintSection>
    </div>
  );
}
