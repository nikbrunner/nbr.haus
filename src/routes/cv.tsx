import { createFileRoute } from "@tanstack/react-router";

import profilePicture from "@/assets/images/profile_picture.jpg";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvInterests } from "@/components/cv/CvInterests";
import { CvJob } from "@/components/cv/CvJob";
import { CvPriorExperience } from "@/components/cv/CvPriorExperience";
import { CvProject } from "@/components/cv/CvProject";
import { CvSection } from "@/components/cv/CvSection";
import Flex from "@/components/Flex";
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

      <CvSection id="work-experience" title={t.shared.sections.workExperience}>
        <Flex direction="column" gap="8">
          <CvJob
            company={t.cv.jobs.dealerCenter.company}
            position={t.cv.jobs.dealerCenter.position}
            period={t.cv.jobs.dealerCenter.period}
            location={t.cv.jobs.dealerCenter.location}
            intro={t.cv.jobs.dealerCenter.intro}
            bullets={t.cv.jobs.dealerCenter.bullets}
            technologies={t.cv.jobs.dealerCenter.technologies}
          />

          <CvJob
            className="print-break-before-page"
            company={t.cv.jobs.divaE.company}
            position={t.cv.jobs.divaE.position}
            period={t.cv.jobs.divaE.period}
            location={t.cv.jobs.divaE.location}
            intro={t.cv.jobs.divaE.description}
            technologies={t.cv.jobs.divaE.technologies}
          />

          <CvJob
            company={t.cv.jobs.campudus.company}
            position={t.cv.jobs.campudus.position}
            period={t.cv.jobs.campudus.period}
            location={t.cv.jobs.campudus.location}
            intro={t.cv.jobs.campudus.description}
            technologies={t.cv.jobs.campudus.technologies}
          />
        </Flex>
      </CvSection>

      <CvSection id="side-projects" title={t.shared.sections.sideProjects}>
        <CvProject
          title={t.cv.projects.blackAtom.title}
          subtitle={t.cv.projects.blackAtom.subtitle}
          bullets={t.cv.projects.blackAtom.bullets}
        />
        <CvProject
          title={t.cv.projects.awdcs.title}
          subtitle={t.cv.projects.awdcs.subtitle}
          bullets={t.cv.projects.awdcs.bullets}
        />
        <CvProject
          title={t.cv.projects.koyo.title}
          subtitle={t.cv.projects.koyo.subtitle}
          bullets={t.cv.projects.koyo.bullets}
        />
      </CvSection>

      <CvSection id="prior-experience" title={t.shared.sections.priorExperience}>
        <CvPriorExperience
          title={t.cv.priorExperience.title}
          description={t.cv.priorExperience.description}
          educationLabel={t.shared.sections.education}
          education={t.cv.education}
        />
      </CvSection>

      <CvSection id="interests" title={t.shared.sections.interests}>
        <CvInterests interests={t.cv.interests} />
      </CvSection>
    </div>
  );
}
