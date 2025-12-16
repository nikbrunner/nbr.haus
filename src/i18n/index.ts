// Types
export type { Locale, Widen } from "./types";
export { LOCALES, DEFAULT_LOCALE } from "./types";

// Store
export {
  i18nStore,
  setLocale,
  initializeLocale,
  getLocaleFromStorage
} from "./store";

// Hooks
export { useTranslation, useLocale } from "./useTranslation";

// Components
export { Trans } from "./Trans";

// Translations
export { translations } from "./translations";
