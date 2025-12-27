import type { Widen } from "@/i18n/types";
import type { texts as en } from "./connect.en";

export const texts: Widen<typeof en> = {
  title: "Kontakt",
  github: "GitHub:",
  linkedin: "LinkedIn:",
  cv: "Lebenslauf:",
  email: "E-Mail:",
  downloadPdf: "PDF herunterladen",
  languages: "Sprachen:",
  languagesList: "Deutsch (Muttersprache) • Englisch (Fließend)"
};
