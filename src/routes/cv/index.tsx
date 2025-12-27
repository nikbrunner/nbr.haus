import { createFileRoute } from "@tanstack/react-router";

import { tech } from "@/config";
import profilePicture from "@/assets/images/profile_picture.jpg";
import { useTexts } from "@/i18n";

import { CvSection } from "@/components/cv/CvSection";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvJob } from "@/components/cv/CvJob";
import { CvProject } from "@/components/cv/CvProject";
import { CvSkills } from "@/components/cv/CvSkills";
import { CvPriorExperience } from "@/components/cv/CvPriorExperience";
import { CvInterests } from "@/components/cv/CvInterests";

export const Route = createFileRoute("/cv/")({
  component: Page
});

function Page() {
  const t = useTexts();
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="CV">
      <CvHeader
        name={t.shared.name}
        tagline={t.cv.tagline.replace("{years}", String(experienceInYears))}
        summary={t.cv.summary.replace("{years}", String(experienceInYears))}
        img={profilePicture}
        contact={{
          location: t.cv.contact.location,
          website: t.cv.contact.website,
          email: t.cv.contact.email,
          github: t.cv.contact.github,
          linkedin: t.cv.contact.linkedin
        }}
      />

      <CvSection title={t.shared.sections.workExperience}>
        <div className="flex flex-col gap-y-6">
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

      <CvSection title={t.shared.sections.sideProjects}>
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

      <CvSection title={t.shared.sections.technicalSkills}>
        <CvSkills
          categories={[
            { label: t.cv.skills.frontend, items: t.cv.skills.frontendList },
            { label: t.cv.skills.devTools, items: t.cv.skills.devToolsList },
            {
              label: t.cv.skills.architecture,
              items: t.cv.skills.architectureList
            },
            { label: t.cv.skills.languages, items: t.cv.skills.languagesList }
          ]}
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
