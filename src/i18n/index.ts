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
export { useLocale } from "./useLocale";
export { useTexts } from "./useTexts";

// Components
export { Trans } from "./Trans";
