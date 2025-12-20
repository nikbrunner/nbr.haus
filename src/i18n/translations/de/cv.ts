import type { Widen } from "../../types";
import type { cv as en } from "../en/cv";

export const cv: Widen<typeof en> = {
  printButton: "Lebenslauf drucken",
  tagline:
    "Software-Ingenieur mit Spezialisierung auf Frontend-Entwicklung und {years} Jahren Erfahrung im Bau moderner Webanwendungen",
  summary:
    "Spezialisiert auf Design-Systeme, Frontend-Architektur und großangelegte Migrationen. Leitete technische Entscheidungen, die tausende Dateien betrafen, und mentorte Junior-Entwickler. Arbeite gerne selbstständig und blühe in kollaborativen Teams auf. Integriert KI-Tools in tägliche Entwicklungs-Workflows.",
  sections: {
    workExperience: "Berufserfahrung",
    sideProjects: "Nebenprojekte",
    technicalSkills: "Technische Fähigkeiten",
    priorExperience: "Frühere Berufserfahrung",
    education: "Ausbildung",
    interests: "Interessen"
  },
  jobs: {
    dealerCenter: {
      intro:
        "BikeCenter ist eine Electron-basierte Point-of-Sale-Anwendung, die von hunderten Fahrradhändlern in Deutschland genutzt wird. Ich startete als Junior und wuchs in eine Frontend-Lead-Rolle hinein, übernahm Architektur-Entscheidungen, managte Frontend-Prioritäten und mentorte neue Teammitglieder.",
      bullets: [
        "Leitete Frontend-Architektur für BikeCenter (Electron/React-Anwendung), baute und wartete das eigene Design-System",
        "Führte großangelegte Framework-Migrationen durch, die 1600+ Dateien betrafen (Redux → TanStack Query, React Router → TanStack Start)",
        "Mentorte Junior-Entwickler und etablierte & dokumentierte Frontend-Coding-Standards",
        "Entwarf modernen GraphQL-basierten Vendure-Storefront und koordinierte zwischen Design- und Backend-Teams",
        "Implementierte Komponententests mit Jest und Storybook-Snapshots",
        "Integrierte externe Services wie Analytics (Mixpanel), Leasing-Rechner und Third-Party-Produktberater"
      ]
    },
    divaE: {
      bullets: ["Entwickelte Frontend-Features für Enterprise-Webanwendungen"]
    },
    campudus: {
      bullets: [
        "Absolvierte Fullstack-Praktikum mit Entwicklung von Features in React und Node.js"
      ]
    }
  },
  projects: {
    blackAtom: {
      subtitle: "Open Source Theming System • Ersteller & Maintainer",
      bullets: [
        "Erstellte Theming-System mit Unterstützung für 27+ Themes über 6 Plattformen (Zed, WezTerm, Alacritty, Ghostty, Neovim)",
        "Gebaut mit TypeScript, mit automatisierter Theme-Generierung und Distribution"
      ]
    },
    awdcs: {
      subtitle: "Modal Editor Keymap-Architektur",
      bullets: [
        "Entwarf scope-basiertes Keymap-System (App, Workspace, Document, Change, Symbol) für modale Editoren",
        "Erstellte systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings"
      ]
    },
    koyo: {
      subtitle: "QMK Tastaturlayout & Firmware",
      bullets: [
        "Eigenes QMK-Layout für 36-Tasten Split-Tastaturen (Moonlander, Corne) mit vim-inspirierter Navigation",
        "Baute umfassende CLI-Tools für Tastatur-Konfiguration und Deployment"
      ]
    }
  },
  skills: {
    frontend: "Frontend",
    frontendList:
      "React, TypeScript, JavaScript, GraphQL, CSS/SCSS/Tailwind, ShadCN, TanStack (Router/Query/Form), Redux, Electron, Node.js, Git",
    devTools: "Dev Tools",
    devToolsList: "Neovim, Ghostty, LazyGit, Claude Code",
    architecture: "Architektur",
    architectureList:
      "Design-Systeme, Komponenten-Architektur, Frontend-Migrationen, UX-Zusammenarbeit",
    languages: "Sprachen",
    languagesList: "Deutsch (Muttersprache) • Englisch (Fließend)"
  },
  priorExperience: {
    title: "Veranstaltungstechnik & Audio Engineering (2011–2019)",
    description:
      "Umfangreicher Hintergrund in Veranstaltungstechnik, professionellem Sound Engineering und Fotografie. Arbeitete in Fünf-Sterne-Hotels und Premium-Studios und entwickelte starke Problemlösungs- und Kundenkommunikationsfähigkeiten."
  },
  education: "Sound Engineering & Mastering, Deutsche Pop München (2010–2011)",
  interests:
    "Landschaftsfotografie • Workflow-Optimierung • Open Source • Musikproduktion"
};
