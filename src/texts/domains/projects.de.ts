import type { Widen } from "@/i18n/types";

import type { texts as en } from "./projects.en";

export const texts: Widen<typeof en> = {
  intro: "Persönliche Projekte, die ich aktiv pflege und weiterentwickle.",
  blackAtom: {
    title: "Black Atom Industries",
    paragraphs: [
      "Open-Source plattformübergreifendes Theming-System, das 27+ kohärente Themes aus einer einzigen Quelle generiert.",
      "Gebaut mit einem Adapter-Pattern für konsistente Theme-Generierung aus einer zentralen Quelle unter Verwendung des OKLCH-Farbraums.",
      "Gepflegt mit Fokus auf Developer Experience und plattformübergreifende Konsistenz."
    ],
    subtitle: "Open Source Theming System • Ersteller & Maintainer",
    bullets: [
      "Erstellte Theming-System mit Unterstützung für 27+ Themes über 6 Plattformen (Zed, WezTerm, Alacritty, Ghostty, Neovim)",
      "Gebaut mit TypeScript, mit automatisierter Theme-Generierung und Distribution"
    ]
  },
  awdcs: {
    title: "AWDCS",
    paragraphs: [
      "AWDCS (App, Workspace, Document, Change, Symbol): Eine scope-basierte Keymap-Architektur für modale Editoren, die Bindings nach operativem Kontext statt nach tool-spezifischen Funktionen organisiert.",
      "Bietet systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings über verschiedene Workflows hinweg."
    ],
    subtitle: "Modal Editor Keymap-Architektur",
    bullets: [
      "Entwarf scope-basiertes Keymap-System (App, Workspace, Document, Change, Symbol) für modale Editoren",
      "Erstellte systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings"
    ]
  },
  koyo: {
    title: "kōyō",
    paragraphs: [
      "Benutzerdefiniertes QMK-Tastaturlayout für 36-Tasten-Split-Keyboards mit vim-inspirierter Navigation, intelligentem Layer-Design und umfassenden CLI-Tools für Moonlander- und Corne-Tastaturen."
    ],
    subtitle: "QMK Tastaturlayout & Firmware",
    bullets: [
      "Eigenes QMK-Layout für 36-Tasten Split-Tastaturen (Moonlander, Corne) mit vim-inspirierter Navigation",
      "Baute umfassende CLI-Tools für Tastatur-Konfiguration und Deployment"
    ]
  },
  nbrNvim: {
    title: "nbr.nvim",
    paragraphs: [
      "Hochgradig angepasstes Neovim-Setup für Frontend-Entwicklung mit AWDCS-basierten Keymaps, Lazy.nvim Plugin-Management und Workflows, die auf React und TypeScript zugeschnitten sind."
    ]
  }
};
