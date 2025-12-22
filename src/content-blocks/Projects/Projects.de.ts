import type { Widen } from "@/i18n";
import type { texts as en } from "./Projects.en";

export const texts: Widen<typeof en> = {
  intro: "Persönliche Projekte, die ich aktiv pflege und weiterentwickle.",
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
};
