import type { Widen } from "../../types";
import type { index as en } from "../en/index";

export const index: Widen<typeof en> = {
  about: {
    greeting: "Hallo!",
    intro:
      "Ich bin <highlight>Nikolaus Brunner</highlight> (kurz Nik), Software-Ingenieur aus Landshut, Deutschland, spezialisiert auf Frontend-Architekturen und Design-Systeme — seit {years} Jahren.",
    ux: "Ein starkes Gespür für UX (User Experience) und DX (Developer Experience) prägt meine Arbeit—ob in Zusammenarbeit mit Designern oder bei eigenständigen Design-Entscheidungen.",
    independence:
      "Prioritäten erkennen und die eigene Arbeit managen liegt mir—ebenso wie zu wissen, wann Feedback gefragt ist. Teil eines guten Teams zu sein, das auf ein gemeinsames Ziel hinarbeitet, ist wo ich aufblühe.",
    passion:
      "Produkte zu entwickeln und zu nutzen ist eine echte Leidenschaft—ich bin wahrscheinlich derjenige, der den Support wegen Features oder Bugs kontaktiert und regelmäßig Changelogs und GitHub-Releases verfolgt.",
    personal:
      "Geboren 1984, und abseits vom Code: Wandern, Lesen, Landschaftsfotografie, Musikproduktion, Workflow-Optimierung und Open Source — plus eine kleine Tastatur-Obsession."
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
      p4: "Interne APIs zu verbessern und Developer-Experience-Patterns im Team zu etablieren war ein weiterer Schwerpunkt. Als vertrauenswürdiger Entscheidungsträger für UX und technische Machbarkeit verband ich Design und Engineering und arbeitete mit Designern sowohl als Umsetzer als auch als Berater zusammen.",
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
    workflowInfo:
      "Workflows sind eine große Leidenschaft von mir. Meine <link>Dotfiles findest du hier</link>.",
    aiIntro:
      "In die Branche einzusteigen, bevor KI ein Thema wurde, bedeutete den Lernberg ohne Tab-Completion oder ChatGPT zu erklimmen.",
    aiLearning:
      "Dieses Fundament war unbezahlbar—und ist es noch in der KI-Ära. Für Junioren glänzt KI als Lehrer und Lesepartner für interaktives Lernen, aber nicht als Schreibpartner in der frühen Phase. Ohne dieses Handwerk erst auf die harte Tour gelernt zu haben, könnte ich KI nicht so effektiv nutzen wie jetzt.",
    aiLimitsInfo:
      "Die Technologie ist faszinierend, aber sie hat echte Grenzen. Sich zu sehr darauf zu verlassen bedeutet, aktiv Fähigkeiten und Wissen zu verlernen — <highlight>und vielleicht am wichtigsten, den Spaß zu verlieren</highlight>.",
    aiUsage:
      "Deshalb setze ich sie bewusst ein. Ich verwende <link>Claude Code</link> als meinen primären KI-Assistenten. Wenn die Aufgabe durch KI-Codegenerierung machbar erscheint, arbeite ich detaillierte Pläne aus und lasse dann <link>Claude Code</link> die Implementierung übernehmen, während ich den Code Schritt für Schritt überprüfe.",
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
