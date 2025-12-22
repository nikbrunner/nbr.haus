import type { Widen } from "./types";
import type { texts as en } from "./shared.en";

export const texts: Widen<typeof en> = {
  sections: {
    about: "Über mich",
    employment: "Berufserfahrung",
    projects: "Projekte"
  },
  jobs: {
    meta: {
      position: "Position",
      period: "Zeitraum",
      tech: "Tech"
    }
  }
};
