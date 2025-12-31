import type { texts as en } from "@/texts/domains/shared.en";
import type { Widen } from "@/types/i18n";

export const texts: Widen<typeof en> = {
  name: "Nikolaus Brunner",
  sections: {
    connect: "Kontakt",
    about: "Über mich",
    employment: "Berufserfahrung",
    projects: "Projekte",
    workExperience: "Berufserfahrung",
    sideProjects: "Nebenprojekte",
    technicalSkills: "Technische Fähigkeiten",
    priorExperience: "Frühere Berufserfahrung",
    education: "Ausbildung",
    interests: "Interessen"
  },
  jobs: {
    meta: {
      position: "Position",
      period: "Zeitraum",
      tech: "Tech"
    }
  }
};
