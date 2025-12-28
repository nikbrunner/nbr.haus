import type { Widen } from "@/types/i18n";

import type { texts as en } from "./projects.en";

export const texts: Widen<typeof en> = {
  intro: "Persönliche Projekte, die ich aktiv pflege und weiterentwickle.",
  blackAtom: {
    title: "Black Atom Industries",
    paragraphs: [
      "Open-Source Theming-System, das 27+ konsistente Themes plattformübergreifend aus einer einzigen Quelle generiert.",
      "Gebaut mit Adapter-Pattern für konsistente Theme-Generierung aus einer zentralen Quelle im OKLCH-Farbraum.",
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
      "AWDCS (App, Workspace, Document, Change, Symbol): Scope-basierte Keymap-Architektur für modale Editoren—organisiert Bindings nach operativem Kontext statt nach Tool-spezifischen Funktionen.",
      "Systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings über verschiedene Workflows."
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
      "Custom QMK-Layout für 36-Tasten Split-Keyboards mit Vim-inspirierter Navigation, smartem Layer-Design und CLI-Tools für Moonlander und Corne."
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
      "Stark angepasstes Neovim-Setup für Frontend-Entwicklung mit AWDCS-Keymaps, Lazy.nvim Plugin-Management und Workflows für React und TypeScript."
    ]
  }
};
