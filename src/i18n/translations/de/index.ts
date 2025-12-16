import type { Widen } from "../../types";
import type { index as en } from "../en/index";

export const index: Widen<typeof en> = {
  about: {
    greeting: "Hallo!",
    introStart: "Ich bin",
    name: "Nikolaus Brunner",
    introEnd:
      "(kurz Nik), Software-Ingenieur aus Landshut, Deutschland, spezialisiert auf Frontend-Architekturen und Design-Systeme — seit {years} Jahren.",
    ux: "Ich arbeite eng mit Designern zusammen und habe ein gutes Gespür für UX (User Experience) und DX (Developer Experience). Ich kann auch selbstständig arbeiten und Design-Entscheidungen treffen, wenn nötig.",
    independence:
      "Ich erkenne, was zu tun ist, priorisiere meine Arbeit selbst und weiß, wann ich Feedback einholen sollte. Aber ich liebe es auch, Teil eines guten Teams zu sein, das auf ein gemeinsames Ziel hinarbeitet.",
    passion:
      "Ich bin leidenschaftlich, wenn es ums Entwickeln und Nutzen von Produkten geht. Ich bin wahrscheinlich derjenige, der den Support wegen Features oder Bugs kontaktiert und regelmäßig Changelogs und GitHub-Releases verfolgt.",
    personal:
      "Ich wurde 1984 geboren, und abseits vom Code genieße ich Wandern, Lesen, Landschaftsfotografie, Musikproduktion, Workflow-Optimierung und Open Source — und ich habe eine kleine Tastatur-Obsession."
  },
  jobs: {
    lookingForJob: {
      title: "Ich suche derzeit neue Möglichkeiten ab Februar 2026."
    },
    dealerCenter: {
      company: "DealerCenter Digital",
      position: "Software-Ingenieur / Frontend-Lead",
      period: "2020–2026",
      p1: "Ich habe das gesamte Spektrum der Frontend-Entwicklung abgedeckt — von Feature-Implementierung und Bugfixes bis hin zu Code-Reviews, Mentoring und teamübergreifender Koordination für eine ausgereifte Electron-Anwendung, die hunderte Fahrradhändler bedient.",
      p2: "Ein Schwerpunkt waren architektonische Migrationen: Ich habe die Einführung von TanStack Query vorangetrieben und die Codebasis von Legacy Redux auf Redux Toolkit migriert. Dazu gehörte das Verfassen umfassender Code-Richtlinien und Best-Practices-Dokumentation. Ich habe auch einen Vendure-Storefront komplett von Remix auf TanStack Start/Router mit TanStack Query, Form, GraphQL, ShadCN und Tailwind CSS umgebaut.",
      p3: "Im Bereich Design-System habe ich ein umfassendes 10-Varianten-Farbsystem mit Figma-Integration erstellt, das 1.600 Dateien in der Codebasis betrifft. Die gesamte Komponentenbibliothek von BikeCenter wurde von Grund auf mit React, TypeScript und SCSS gebaut — ohne Third-Party UI-Frameworks.",
      p4: "Ich habe auch interne APIs für State-Management und GraphQL-Integration gestaltet und Developer-Experience-Patterns im Team etabliert. Als vertrauenswürdiger Entscheidungsträger für UX und technische Machbarkeit habe ich Design und Engineering verbunden und mit Designern sowohl als Umsetzer als auch als Berater zusammengearbeitet.",
      p5: "Das Mentoring von Junior-Entwicklern durch Pair-Programming und Code-Reviews war ein weiterer wichtiger Teil der Rolle. Ich habe technische Standards und Konventionen im Team etabliert, einschließlich Übersetzungsrichtlinien, BEM-Namensgebung und TypeScript-Best-Practices, und diente als technische Schnittstelle zwischen Management, Backend- und Frontend-Teams."
    },
    divaE: {
      company: "diva-e",
      position: "Junior Frontend-Entwickler",
      period: "2020",
      description:
        "Ich habe an einer großen E-Commerce-Plattform bei einer Digital-Agentur mitgearbeitet und eine interne Social-Plattform mit React, GraphQL (Apollo) und SCSS gebaut. Ich habe auch Onboarding-Dokumentation für das firmeneigene Framework erstellt. Diese Rolle begann genau, als COVID-19 ausbrach, sodass ich den Übergang zur vollständigen Remote-Arbeit erfolgreich gemeistert habe."
    },
    campudus: {
      company: "Campudus",
      position: "Praktikant",
      period: "2019–2020",
      description:
        "Ich habe eine Fullstack-Anwendung zur Zubehörbestellung von Grund auf gebaut — Design, Architektur, Backend und Frontend — während eines 3-monatigen Praktikums bei der Schwesterfirma von DealerCenter Digital."
    }
  },
  projects: {
    intro:
      "Projekte sind nie wirklich fertig — aber immer in Entwicklung. Hier sind einige meiner Projekte als Entwickler.",
    blackAtom: {
      description1:
        "Open-Source plattformübergreifendes Theming-System, das 27+ kohärente Themes aus einer einzigen Quelle generiert.",
      description2:
        "Gebaut mit einem Adapter-Pattern für konsistente Theme-Generierung aus einer zentralen Quelle unter Verwendung des OKLCH-Farbraums.",
      description3:
        "Gepflegt mit Fokus auf Developer Experience und plattformübergreifende Konsistenz."
    },
    awdcs: {
      description1:
        "AWDCS (App, Workspace, Document, Change, Symbol): Eine scope-basierte Keymap-Architektur für modale Editoren, die Bindings nach operativem Kontext statt nach tool-spezifischen Funktionen organisiert.",
      description2:
        "Bietet systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings über verschiedene Workflows hinweg."
    },
    koyo: {
      description:
        "Benutzerdefiniertes QMK-Tastaturlayout für 36-Tasten-Split-Keyboards mit vim-inspirierter Navigation, intelligentem Layer-Design und umfassenden CLI-Tools für Moonlander- und Corne-Tastaturen."
    },
    nbrNvim: {
      description:
        "Hochgradig angepasstes Neovim-Setup für Frontend-Entwicklung mit AWDCS-basierten Keymaps, Lazy.nvim Plugin-Management und Workflows, die auf React und TypeScript zugeschnitten sind."
    }
  },
  connect: {
    title: "Kontakt",
    github: "GitHub:",
    linkedin: "LinkedIn:",
    cv: "Lebenslauf:",
    email: "E-Mail:",
    downloadPdf: "PDF herunterladen"
  },
  devStack: {
    technologies: "Technologien",
    devTools: "Dev Tools",
    ai: "KI",
    workflowPassion: "Workflows sind eine große Leidenschaft von mir. Meine",
    dotfilesHere: "Dotfiles findest du hier",
    aiIntro:
      "Ich hatte das Glück, in die Branche einzusteigen, bevor KI ein Thema wurde. Den Lernberg zu erklimmen, ohne Tab-Completion oder ChatGPT.",
    aiLearning:
      "Ich denke, das war sehr wertvoll. Und ich denke, es ist immer noch sehr wertvoll und sogar notwendig, Programmieren in der KI-Ära zu lernen. Ich würde einem Junior-Entwickler niemals empfehlen, KI während der anfänglichen Lernphase zu nutzen. Ich könnte KI nicht so effektiv nutzen wie jetzt, wenn ich dieses Handwerk nicht ohne sie gelernt hätte.",
    aiLimits:
      "Die Technologie ist faszinierend, aber sie hat echte Grenzen. Wenn du dich zu sehr darauf verlässt, wirst du aktiv Fähigkeiten und Wissen verlernen —",
    aiLimitsHighlight:
      "und vielleicht am wichtigsten, du wirst keinen Spaß mehr haben",
    aiUsage:
      "Deshalb setze ich sie bewusst ein. Ich verwende Claude Code als meinen primären KI-Assistenten. Wenn die Aufgabe durch KI-Codegenerierung machbar erscheint, arbeite ich detaillierte Pläne aus und lasse dann Claude Code die Implementierung übernehmen, während ich den Code Schritt für Schritt überprüfe.",
    mcps: "MCPs",
    mcpsIntro:
      "Ich nutze auch persönliche Slash-Commands und MCPs, wo es sinnvoll ist.",
    mcpsUsed: "Das sind die am häufigsten genutzten MCPs für KI-Unterstützung.",
    docLookup: "Dokumentations-Suche",
    webSearch: "Bessere Web-Suche",
    browser: "Browser",
    editor: "Editor:",
    terminal: "Terminal:",
    git: "Git:",
    aiAssistant: "KI-Assistent:",
    secrets: "Secrets:"
  }
};
