import { common as commonEn } from "./en/common";
import { index as indexEn } from "./en/index";
import { common as commonDe } from "./de/common";
import { index as indexDe } from "./de/index";

export const translations = {
  en: {
    common: commonEn,
    index: indexEn
  },
  de: {
    common: commonDe,
    index: indexDe
  }
} as const;
