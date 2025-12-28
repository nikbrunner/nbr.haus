import { DEFAULT_LOCALE, LOCALES, type Locale } from "@/types/i18n";

function isValidLocale(value: unknown): value is Locale {
  return typeof value === "string" && LOCALES.includes(value as Locale);
}

function getLocaleFromStorage(): Locale | null {
  if (typeof localStorage === "undefined") return null;
  const saved = localStorage.getItem("locale");
  return isValidLocale(saved) ? saved : null;
}

function getLocaleFromBrowser(): Locale | null {
  if (typeof navigator === "undefined") return null;
  const browserLang = navigator.language.split("-")[0];
  return isValidLocale(browserLang) ? browserLang : null;
}

export function getInitialLocale(): Locale {
  return getLocaleFromStorage() ?? getLocaleFromBrowser() ?? DEFAULT_LOCALE;
}

export function persistLocale(locale: Locale): void {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("locale", locale);
  }
}
