import { createFileRoute } from "@tanstack/react-router";

import profilePicture from "@/assets/images/profile_picture.jpg";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvInterests } from "@/components/cv/CvInterests";
import { CvJob } from "@/components/cv/CvJob";
import { CvPriorExperience } from "@/components/cv/CvPriorExperience";
import { CvProject } from "@/components/cv/CvProject";
import { CvSection } from "@/components/cv/CvSection";
import Highlight from "@/components/Highlight";
import { tech } from "@/config";
import { Trans } from "@/i18n/Trans";
import { useTexts } from "@/i18n/useTexts";

export const Route = createFileRoute("/cv")({
  component: Page
});

function Page() {
  const t = useTexts();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="CvPage">
      <CvHeader
        name={t.shared.name}
        tagline={t.cv.tagline.replace("{years}", String(experienceInYears))}
        summary={t.cv.summary.replace("{years}", String(experienceInYears))}
        img={profilePicture}
        languages={t.cv.languages}
        contact={{
          location: t.cv.contact.location,
          website: t.cv.contact.website,
          email: t.cv.contact.email,
          github: t.cv.contact.github,
          linkedin: t.cv.contact.linkedin
        }}
      />

      <CvSection className="flex flex-col gap-2">
        <p>
          <strong>
            {t.about.greeting}
            <br />
            <br />
            <Trans
              text={t.about.intro.replace("{years}", String(experienceInYears))}
              components={{
                highlight: children => <Highlight>{children}</Highlight>
              }}
            />
          </strong>
        </p>
        <p>{t.about.ux}</p>
        <p>{t.about.independence}</p>
        <p>{t.about.passion}</p>
      </CvSection>

      <CvSection
        className="print-break-before-page"
        title={t.shared.sections.workExperience}
      >
        <div className="flex flex-col gap-y-8">
          <CvJob
            company={t.jobs.dealerCenter.company}
            position={t.jobs.dealerCenter.position}
            period={t.jobs.dealerCenter.period}
            location={t.jobs.dealerCenter.location}
            intro={t.jobs.dealerCenter.summary}
            bullets={t.jobs.dealerCenter.bullets}
            technologies={[
              tech.react,
              tech.typescript,
              tech.scss,
              tech.storybook,
              tech.tanstackRouter,
              tech.tanstackQuery,
              tech.tanstackForm,
              tech.redux,
              tech.graphql,
              tech.tailwind,
              tech.electron,
              tech.nodejs
            ].map(t => t.name)}
          />

          <CvJob
            company={t.jobs.divaE.company}
            position={t.jobs.divaE.position}
            period={t.jobs.divaE.period}
            location={t.jobs.divaE.location}
            intro={t.jobs.divaE.description}
            technologies={[tech.react, tech.typescript, tech.scss, tech.nodejs].map(
              t => t.name
            )}
          />

          <CvJob
            company={t.jobs.campudus.company}
            position={t.jobs.campudus.position}
            period={t.jobs.campudus.period}
            location={t.jobs.campudus.location}
            intro={t.jobs.campudus.description}
            technologies={[tech.react, tech.nodejs].map(t => t.name)}
          />
        </div>
      </CvSection>

      <CvSection
        className="print-break-before-page"
        title={t.shared.sections.sideProjects}
      >
        <CvProject
          title={t.projects.blackAtom.title}
          subtitle={t.projects.blackAtom.subtitle}
          bullets={t.projects.blackAtom.bullets}
        />
        <CvProject
          title={t.projects.awdcs.title}
          subtitle={t.projects.awdcs.subtitle}
          bullets={t.projects.awdcs.bullets}
        />
        <CvProject
          title={t.projects.koyo.title}
          subtitle={t.projects.koyo.subtitle}
          bullets={t.projects.koyo.bullets}
        />
      </CvSection>

      <CvSection title={t.shared.sections.priorExperience}>
        <CvPriorExperience
          title={t.cv.priorExperience.title}
          description={t.cv.priorExperience.description}
          educationLabel={t.shared.sections.education}
          education={t.cv.education}
        />
      </CvSection>

      <CvSection title={t.shared.sections.interests}>
        <CvInterests interests={t.cv.interests} />
      </CvSection>
    </div>
  );
}
