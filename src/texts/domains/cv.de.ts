import type { texts as en } from "@/texts/domains/cv.en";
import { texts as jobsTexts } from "@/texts/domains/jobs.de";
import { texts as projectsTexts } from "@/texts/domains/projects.de";
import type { Widen } from "@/types/i18n";

export const texts: Widen<typeof en> = {
  tagline:
    "Software-Ingenieur mit Spezialisierung auf Frontend-Entwicklung und {years} Jahren Erfahrung in der Entwicklung moderner Web- und Desktop-Anwendungen",

  summary:
    "Spezialisiert auf Design-Systeme, Frontend-Architektur und großangelegte Migrationen. Verantwortete technische Entscheidungen mit Impact auf tausende Dateien und mentorte Junior-Entwickler. Arbeitet gerne selbstständig, aber am besten im Team. Nutzt KI-Tools gezielt im Entwicklungsalltag.",

  contact: {
    location: "Landshut, Deutschland",
    website: "nbr.haus",
    email: "nik@nbr.haus",
    github: "github.com/nikbrunner",
    linkedin: "linkedin.com/in/nbru"
  },

  languages: "Deutsch (Muttersprache) • Englisch (Fließend)",

  // Jobs with shared metadata, CV-specific descriptions (third person)
  jobs: {
    dealerCenter: {
      company: jobsTexts.dealerCenter.company,
      position: jobsTexts.dealerCenter.position,
      period: jobsTexts.dealerCenter.period,
      location: jobsTexts.dealerCenter.location,
      intro:
        "BikeCenter ist eine Electron-basierte Point-of-Sale-Anwendung für hunderte Fahrradhändler in Deutschland. Startete als Junior und wuchs in eine Frontend-Lead-Rolle, übernahm Architektur-Entscheidungen, managte Frontend-Prioritäten und mentorte neue Teammitglieder.",
      bullets: [
        "Leitete Frontend-Architektur für BikeCenter (Electron/React-Anwendung), baute und wartete das eigene Design-System",
        "Führte großangelegte Framework-Migrationen durch, die 1600+ Dateien betrafen (Redux → TanStack Query, React Router → TanStack Start)",
        "Mentorte Junior-Entwickler und etablierte & dokumentierte Frontend-Coding-Standards",
        "Entwarf modernen GraphQL-basierten Vendure-Storefront und koordinierte zwischen Design- und Backend-Teams",
        "Implementierte Komponententests mit Jest und Storybook-Snapshots",
        "Integrierte externe Services wie Analytics (Mixpanel), Leasing-Rechner und Third-Party-Produktberater"
      ],
      technologies: [
        "React",
        "TypeScript",
        "SCSS",
        "Storybook",
        "TanStack Router",
        "TanStack Query",
        "TanStack Form",
        "Redux",
        "GraphQL",
        "Tailwind",
        "Electron",
        "Node.js"
      ]
    },
    divaE: {
      company: jobsTexts.divaE.company,
      position: jobsTexts.divaE.position,
      period: jobsTexts.divaE.period,
      location: jobsTexts.divaE.location,
      description:
        "Mitarbeit an einer großen E-Commerce-Plattform und Aufbau einer internen Social-Plattform mit React, GraphQL (Apollo) und SCSS. Wechselte zu DealerCenter Digital für eine Chance, die besser zu den eigenen Zielen passte.",
      technologies: ["React", "TypeScript", "SCSS", "Node.js"]
    },
    campudus: {
      company: jobsTexts.campudus.company,
      position: jobsTexts.campudus.position,
      period: jobsTexts.campudus.period,
      location: jobsTexts.campudus.location,
      description:
        "Fullstack-Anwendung zur Zubehörbestellung von Grund auf gebaut — Design, Architektur, Backend und Frontend — während eines 3-monatigen Praktikums bei der Schwesterfirma von DealerCenter Digital.",
      technologies: ["React", "Node.js"]
    }
  },

  // Projects with shared metadata
  projects: {
    blackAtom: {
      title: projectsTexts.blackAtom.title,
      subtitle: projectsTexts.blackAtom.subtitle,
      bullets: projectsTexts.blackAtom.bullets
    },
    awdcs: {
      title: projectsTexts.awdcs.title,
      subtitle: projectsTexts.awdcs.subtitle,
      bullets: projectsTexts.awdcs.bullets
    },
    koyo: {
      title: projectsTexts.koyo.title,
      subtitle: projectsTexts.koyo.subtitle,
      bullets: projectsTexts.koyo.bullets
    }
  },

  priorExperience: {
    title: "Veranstaltungstechnik & Audio Engineering (2011–2019)",
    description:
      "Hintergrund in Veranstaltungstechnik, Sound Engineering und Fotografie. Arbeitete in Fünf-Sterne-Hotels und Premium-Studios — mit viel Erfahrung in Problemlösung und Kundenkommunikation."
  },

  education: "Sound Engineering & Mastering, Deutsche Pop München (2010–2011)",

  interests:
    "Wandern, Laufen, Bouldern, Kochen, Lesen, Fotografie, Alle Formen von Design"
};
