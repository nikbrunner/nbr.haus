import { createFileRoute } from "@tanstack/react-router";

import { tech } from "@/config";
import profilePicture from "@/assets/images/profile_picture.jpg";
import { useSharedTexts, useTexts } from "@/i18n";

import { texts as en } from "./cv.en";
import { texts as de } from "./cv.de";

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
  const sharedTexts = useSharedTexts();
  const texts = useTexts({ en, de });
  const experienceInYears = new Date().getFullYear() - 2020;

  return (
    <div className="CV">
      <CvHeader
        name={sharedTexts.name}
        tagline={texts.tagline.replace("{years}", String(experienceInYears))}
        summary={texts.summary.replace("{years}", String(experienceInYears))}
        img={profilePicture}
        contact={{
          location: texts.contact.location,
          website: texts.contact.website,
          email: texts.contact.email,
          github: texts.contact.github,
          linkedin: texts.contact.linkedin
        }}
      />

      <CvSection title={texts.sections.workExperience} breakInside="auto">
        <div className="flex flex-col gap-y-6">
          <CvJob
            company={texts.jobs.dealerCenter.company}
            position={texts.jobs.dealerCenter.position}
            period={texts.jobs.dealerCenter.period}
            location={texts.jobs.dealerCenter.location}
            intro={texts.jobs.dealerCenter.description}
            bullets={texts.jobs.dealerCenter.bullets}
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
            ].map(tech => tech.name)}
          />

          <CvJob
            company={texts.jobs.divaE.company}
            position={texts.jobs.divaE.position}
            period={texts.jobs.divaE.period}
            location={texts.jobs.divaE.location}
            intro={texts.jobs.divaE.description}
            technologies={[tech.react, tech.typescript, tech.scss, tech.nodejs].map(
              tech => tech.name
            )}
          />

          <CvJob
            company={texts.jobs.campudus.company}
            position={texts.jobs.campudus.position}
            period={texts.jobs.campudus.period}
            location={texts.jobs.campudus.location}
            intro={texts.jobs.campudus.description}
            technologies={[tech.react, tech.nodejs].map(tech => tech.name)}
          />
        </div>
      </CvSection>

      <CvSection title={texts.sections.sideProjects} breakInside="auto">
        <CvProject
          title="Black Atom"
          subtitle={texts.projects.blackAtom.subtitle}
          bullets={texts.projects.blackAtom.bullets}
        />
        <CvProject
          title="AWDCS"
          subtitle={texts.projects.awdcs.subtitle}
          bullets={texts.projects.awdcs.bullets}
        />
        <CvProject
          title="kōyō"
          subtitle={texts.projects.koyo.subtitle}
          bullets={texts.projects.koyo.bullets}
        />
      </CvSection>

      <CvSection title={texts.sections.technicalSkills}>
        <CvSkills
          categories={[
            { label: texts.skills.frontend, items: texts.skills.frontendList },
            { label: texts.skills.devTools, items: texts.skills.devToolsList },
            {
              label: texts.skills.architecture,
              items: texts.skills.architectureList
            },
            { label: texts.skills.languages, items: texts.skills.languagesList }
          ]}
        />
      </CvSection>

      <CvSection title={texts.sections.priorExperience}>
        <CvPriorExperience
          title={texts.priorExperience.title}
          description={texts.priorExperience.description}
          educationLabel={texts.sections.education}
          education={texts.education}
        />
      </CvSection>

      <CvSection title={texts.sections.interests}>
        <CvInterests interests={texts.interests} />
      </CvSection>
    </div>
  );
}
