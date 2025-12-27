import type { Widen } from "@/i18n/types";

import type { texts as en } from "./jobs.en";

export const texts: Widen<typeof en> = {
  lookingForJob: {
    title: "Ich suche eine Senior Frontend-Position ab Februar 2026."
  },
  dealerCenter: {
    company: "DealerCenter Digital",
    position: "Software-Ingenieur / Frontend-Lead",
    period: "Sep. 2020 – Jan. 2026",
    location: "Landshut, Germany",
    paragraphs: [
      "Ich habe das gesamte Spektrum der Frontend-Entwicklung abgedeckt — von Feature-Implementierung und Bugfixes bis hin zu Code-Reviews, Mentoring und teamübergreifender Koordination für eine ausgereifte Electron-Anwendung, die hunderte Fahrradhändler bedient.",
      "Ein Schwerpunkt waren architektonische Migrationen: Ich habe die Einführung von TanStack Query vorangetrieben und die Codebasis von Legacy Redux auf Redux Toolkit migriert. Dazu gehörte das Verfassen umfassender Code-Richtlinien und Best-Practices-Dokumentation. Ich habe auch einen Vendure-Storefront komplett von Remix auf TanStack Start/Router mit TanStack Query, Form, GraphQL, ShadCN und Tailwind CSS umgebaut.",
      "Im Bereich Design-System habe ich ein umfassendes 10-Varianten-Farbsystem mit Figma-Integration erstellt, das 1.600 Dateien in der Codebasis betrifft. Die gesamte Komponentenbibliothek von BikeCenter wurde von Grund auf mit React, TypeScript und SCSS gebaut — ohne Third-Party UI-Frameworks.",
      "Interne APIs zu verbessern und Developer-Experience-Patterns im Team zu etablieren war ein weiterer Schwerpunkt. Als vertrauenswürdiger Entscheidungsträger für UX und technische Machbarkeit verband ich Design und Engineering und arbeitete mit Designern sowohl als Umsetzer als auch als Berater zusammen.",
      "Das Mentoring von Junior-Entwicklern durch Pair-Programming und Code-Reviews war ein weiterer wichtiger Teil der Rolle. Ich habe technische Standards und Konventionen im Team etabliert, einschließlich Übersetzungsrichtlinien, BEM-Namensgebung und TypeScript-Best-Practices, und diente als technische Schnittstelle zwischen Management, Backend- und Frontend-Teams."
    ],
    summary:
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
    company: "diva-e",
    position: "Junior Frontend-Entwickler",
    period: "März 2020 – Sep. 2020",
    location: "Munich, Germany",
    description:
      "Mitarbeit an einer großen E-Commerce-Plattform und Aufbau einer internen Social-Plattform mit React, GraphQL (Apollo) und SCSS. Als DealerCenter Digital eine Frontend-Position anbot, entschied ich mich für den Wechsel — eine Chance, die besser zu meinen Zielen passte."
  },
  campudus: {
    company: "Campudus",
    position: "Praktikant",
    period: "Dez. 2019 – Feb. 2020",
    location: "Landshut, Germany",
    description:
      "Ich habe eine Fullstack-Anwendung zur Zubehörbestellung von Grund auf gebaut — Design, Architektur, Backend und Frontend — während eines 3-monatigen Praktikums bei der Schwesterfirma von DealerCenter Digital."
  }
};
