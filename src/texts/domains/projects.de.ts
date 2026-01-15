import type { texts as en } from "@/texts/domains/projects.en";
import type { Widen } from "@/types/i18n";

export const texts: Widen<typeof en> = {
  intro: "Persönliche Projekte, die ich aktiv pflege und weiterentwickle.",
  blackAtom: {
    title: "Black Atom Industries",
    web: {
      paragraphs: [
        "Open-Source Theming-System, das 30+ konsistente Themes plattformübergreifend aus einer einzigen Quelle generiert.",
        "Gebaut mit Adapter-Pattern für konsistente Theme-Generierung aus einer zentralen Quelle im OKLCH-Farbraum.",
        "Gepflegt mit Fokus auf Developer Experience und plattformübergreifende Konsistenz."
      ]
    },
    cv: {
      subtitle: "Open Source Theming System • Ersteller & Maintainer",
      bullets: [
        "Erstellte Theming-System mit Unterstützung für 30+ Themes über 7 Plattformen (Neovim, Ghostty, Zed, tmux, WezTerm, Niri, Waybar)",
        "Gebaut mit TypeScript/Deno, mit automatisierter Theme-Generierung und Distribution"
      ]
    }
  },
  awdcs: {
    title: "AWDCS",
    web: {
      paragraphs: [
        "AWDCS (App, Workspace, Document, Change, Symbol): Scope-basierte Keymap-Architektur für modale Editoren—organisiert Bindings nach operativem Kontext statt nach Tool-spezifischen Funktionen.",
        "Systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings über verschiedene Workflows."
      ]
    },
    cv: {
      subtitle: "Modal Editor Keymap-Architektur",
      bullets: [
        "Entwarf scope-basiertes Keymap-System (App, Workspace, Document, Change, Symbol) für modale Editoren",
        "Erstellte systematische Präfix-Muster und semantische Benennung für konsistente, einprägsame Keybindings"
      ]
    }
  },
  koyo: {
    title: "kōyō",
    web: {
      paragraphs: [
        "Custom QMK-Layout für 36-Tasten Split-Keyboards mit Vim-inspirierter Navigation, smartem Layer-Design und CLI-Tools für Moonlander und Corne."
      ]
    },
    cv: {
      subtitle: "QMK Tastaturlayout & Firmware",
      bullets: [
        "Eigenes QMK-Layout für 36-Tasten Split-Tastaturen (Moonlander, Corne) mit vim-inspirierter Navigation",
        "Baute umfassende CLI-Tools für Tastatur-Konfiguration und Deployment"
      ]
    }
  },
  nbrNvim: {
    title: "nbr.nvim",
    web: {
      paragraphs: [
        "Stark angepasstes Neovim-Setup für Frontend-Entwicklung mit AWDCS-Keymaps, Lazy.nvim Plugin-Management und Workflows für React und TypeScript."
      ]
    }
  },
  nbrHaus: {
    title: "nbr.haus",
    web: {
      paragraphs: [
        "Persönliches Portfolio, gebaut mit TanStack Start mit SSR, dateibasiertem Routing und einem eigenen Theming-System mit Farbton-Auswahl und Farbmodi.",
        "Leichtgewichtige i18n-Implementierung mit URL-Suchparametern als Quelle der Wahrheit und localStorage-Persistenz."
      ]
    },
    cv: {
      subtitle: "Persönliches Portfolio • TanStack Start",
      bullets: [
        "Erstellte Portfolio mit TanStack Start (SSR) mit eigenem Theming-System und i18n",
        "Implementierte URL-gesteuerte Zustandsverwaltung für Theme-Präferenzen und Sprache"
      ]
    }
  }
};
