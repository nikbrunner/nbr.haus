import type { Widen } from "../../types";
import type { common as en } from "../en/common";

export const common: Widen<typeof en> = {
  sections: {
    about: "Über mich",
    employment: "Berufserfahrung",
    devStack: "Tech Stack",
    projects: "Projekte"
  },
  meta: {
    title: "Nik Brunner - Senior Frontend-Entwickler & Software-Ingenieur",
    description:
      "Software-Ingenieur mit über 5 Jahren Erfahrung in Frontend-Architekturen und Design-Systemen. Spezialisiert auf React, TypeScript und moderne Web-Technologien. Verfügbar ab Februar 2026.",
    ogTitle: "Nik Brunner - Senior Frontend-Entwickler",
    ogDescription:
      "Senior Frontend-Ingenieur mit 5 Jahren Erfahrung. React, TypeScript, Design-Systeme, Technische Architektur."
  }
};
