import type { Widen } from "@/i18n/types";

import type { texts as en } from "./cv.en";

export const texts: Widen<typeof en> = {
  printButton: "Lebenslauf drucken",
  tagline:
    "Software-Ingenieur mit Spezialisierung auf Frontend-Entwicklung und {years} Jahren Erfahrung im Bau moderner Webanwendungen",
  summary:
    "Spezialisiert auf Design-Systeme, Frontend-Architektur und großangelegte Migrationen. Leitete technische Entscheidungen, die tausende Dateien betrafen, und mentorte Junior-Entwickler. Arbeite gerne selbstständig und blühe in kollaborativen Teams auf. Integriert KI-Tools in tägliche Entwicklungs-Workflows.",
  contact: {
    location: "Landshut, Deutschland",
    website: "nbr.haus",
    email: "nik@nbr.haus",
    github: "github.com/nikbrunner",
    linkedin: "linkedin.com/in/nbru"
  },
  priorExperience: {
    title: "Veranstaltungstechnik & Audio Engineering (2011–2019)",
    description:
      "Umfangreicher Hintergrund in Veranstaltungstechnik, professionellem Sound Engineering und Fotografie. Arbeitete in Fünf-Sterne-Hotels und Premium-Studios und entwickelte starke Problemlösungs- und Kundenkommunikationsfähigkeiten."
  },
  education: "Sound Engineering & Mastering, Deutsche Pop München (2010–2011)",
  interests:
    "Landschaftsfotografie, Lesen, Workflow-Optimierung, Open Source, Musikproduktion",
  languages: "Deutsch (Muttersprache) • Englisch (Fließend)"
};
