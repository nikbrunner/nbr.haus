import { Store } from "@tanstack/react-store";

import { DEFAULT_LOCALE, LOCALES, type Locale } from "../types/i18n";

interface I18nState {
  locale: Locale;
}

export const i18nStore = new Store<I18nState>({
  locale: DEFAULT_LOCALE
});

// Actions
export function setLocale(locale: Locale) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("locale", locale);
  }
  i18nStore.setState(s => ({ ...s, locale }));
}

// Storage helpers
function getLocaleFromStorage(): Locale | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("locale");
    if (saved && LOCALES.includes(saved as Locale)) {
      return saved as Locale;
    }
  }
  return null;
}

// Initialize from URL params or localStorage
export function initializeLocale(urlParam?: Locale) {
  const locale = urlParam ?? getLocaleFromStorage() ?? DEFAULT_LOCALE;

  if (typeof localStorage !== "undefined") {
    localStorage.setItem("locale", locale);
  }

  i18nStore.setState(s => ({ ...s, locale }));
}
