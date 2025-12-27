import type { Widen } from "@/i18n/types";

import type { texts as en } from "./shared.en";

export const texts: Widen<typeof en> = {
  name: "Nikolaus Brunner",
  sections: {
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
