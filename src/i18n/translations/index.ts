import { common as commonEn } from "./en/common";
import { cv as cvEn } from "./en/cv";
import { index as indexEn } from "./en/index";
import { common as commonDe } from "./de/common";
import { cv as cvDe } from "./de/cv";
import { index as indexDe } from "./de/index";

export const translations = {
  en: {
    common: commonEn,
    cv: cvEn,
    index: indexEn
  },
  de: {
    common: commonDe,
    cv: cvDe,
    index: indexDe
  }
} as const;
