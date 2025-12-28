import type { Widen } from "@/types/i18n";

import type { texts as en } from "./connect.en";

export const texts: Widen<typeof en> = {
  title: "Kontakt",
  github: "GitHub:",
  linkedin: "LinkedIn:",
  cv: "Lebenslauf:",
  email: "E-Mail:",
  visitCvPage: "Druckfreundlicher Lebenslauf",
  languages: "Sprachen:",
  languagesList: "Deutsch (Muttersprache) • Englisch (Fließend)"
};
