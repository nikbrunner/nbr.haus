import type { texts as en } from "@/texts/domains/controlPanel.en";
import type { Widen } from "@/types/i18n";

export const texts: Widen<typeof en> = {
  rows: {
    nav: "Nav",
    lang: "Sprache",
    accent: "Akzent",
    contrast: "Kontrast",
    mode: "Modus"
  },
  labels: {
    contrast: {
      low: "NI",
      base: "ST",
      high: "HO"
    },
    colorMode: {
      light: "HE",
      system: "SYS",
      dark: "DU"
    },
    locale: {
      en: "EN",
      de: "DE"
    }
  },
  aria: {
    togglePanel: "Kontrollpanel umschalten",
    navigateTo: "Navigiere zu",
    selectEnglish: "Englisch auswählen",
    selectGerman: "Deutsch auswählen",
    selectAccentHue: "Akzentfarbe auswählen",
    selectContrast: {
      low: "Niedrigen Kontrast auswählen",
      base: "Standard Kontrast auswählen",
      high: "Hohen Kontrast auswählen"
    },
    selectColorMode: {
      light: "Hellen Modus auswählen",
      system: "System Modus auswählen",
      dark: "Dunklen Modus auswählen"
    }
  },
  titles: {
    contrast: {
      low: "Niedriger Kontrast",
      base: "Standard Kontrast",
      high: "Hoher Kontrast"
    },
    colorMode: {
      light: "Heller Modus",
      system: "System Modus",
      dark: "Dunkler Modus"
    },
    locale: {
      en: "Englisch",
      de: "Deutsch"
    }
  }
};
