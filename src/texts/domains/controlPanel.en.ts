export const texts = {
  rows: {
    nav: "Page",
    sections: "Sections",
    lang: "Lang",
    accent: "Accent",
    contrast: "Contrast",
    mode: "Mode"
  },
  labels: {
    contrast: {
      low: "LC",
      base: "BC",
      high: "HC"
    },
    colorMode: {
      light: "LT",
      system: "SYS",
      dark: "DK"
    },
    locale: {
      en: "EN",
      de: "DE"
    }
  },
  aria: {
    togglePanel: "Toggle control panel",
    navigateTo: "Navigate to",
    scrollTo: "Scroll to",
    selectEnglish: "Select English",
    selectGerman: "Select German",
    selectAccentHue: "Select accent hue",
    selectContrast: {
      low: "Select low contrast",
      base: "Select base contrast",
      high: "Select high contrast"
    },
    selectColorMode: {
      light: "Select light mode",
      system: "Select system mode",
      dark: "Select dark mode"
    }
  },
  titles: {
    routes: {
      home: "Portfolio & About",
      cv: "Print-friendly CV for PDF export"
    },
    contrast: {
      low: "Low Contrast",
      base: "Base Contrast",
      high: "High Contrast"
    },
    colorMode: {
      light: "Light Mode",
      system: "System Mode",
      dark: "Dark Mode"
    },
    locale: {
      en: "English",
      de: "German"
    }
  }
} as const;
