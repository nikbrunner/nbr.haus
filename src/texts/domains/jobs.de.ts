import type { Widen } from "@/types/i18n";

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
      "Ich habe das gesamte Spektrum der Frontend-Entwicklung abgedeckt — von Feature-Implementierung und Bugfixes bis zu Code-Reviews, Mentoring und teamübergreifender Koordination für eine etablierte Electron-Anwendung, die hunderte Fahrradhändler bedient.",
      "Auch ein Schwerpunkt waren architektonische Migrationen: Ich habe TanStack Query eingeführt und von Legacy Redux auf Redux Toolkit migriert — inklusive umfassender Code-Richtlinien und Best-Practices-Dokumentation. Außerdem habe ich einen Vendure-Storefront komplett von Remix auf TanStack Start/Router umgebaut, mit TanStack Query, Form, GraphQL, ShadCN und Tailwind CSS.",
      "Beim Design-System habe ich ein 10-Varianten-Farbsystem mit Figma-Integration erstellt, das 1.600 Dateien betrifft. Die gesamte Komponentenbibliothek von BikeCenter wurde von Grund auf mit React, TypeScript und SCSS gebaut—ohne UI-Frameworks von der Stange.",
      "Interne APIs zu verbessern und DX-Patterns zu etablieren war ein weiterer Fokus. Als Ansprechpartner für UX und technische Machbarkeit war ich Bindeglied zwischen Design und Engineering — als Umsetzer und Berater.",
      "Mentoring von Junior-Entwicklern durch Pair-Programming und Code-Reviews war ein wichtiger Teil meiner Rolle. Ich habe technische Standards im Team etabliert—Übersetzungsrichtlinien, BEM-Naming, TypeScript-Best-Practices—und war technische Schnittstelle zwischen Management, Backend und Frontend."
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
