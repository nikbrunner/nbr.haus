import { useCallback } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import { localeSchema, type Locale } from "@/types/i18n";

const locales = localeSchema.options;
const defaultLocale: Locale = "en";

/**
 * Returns the current locale and a setter function.
 * Locale is read from URL search params, setter updates both URL and localStorage.
 */
export function useLocale() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hydrated = useHydrated();
  const locale = search.lang ?? getInitialLocale(hydrated) ?? defaultLocale;

  const setLocale = useCallback(
    (newLocale: Locale) => {
      persistLocale(newLocale);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, lang: newLocale }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return { locale, locales, setLocale };
}

function isValidLocale(value: unknown): value is Locale {
  return localeSchema.safeParse(value).success;
}

function getLocaleFromStorage(): Locale | null {
  const saved = localStorage.getItem("locale");
  return isValidLocale(saved) ? saved : null;
}

function getLocaleFromBrowser(): Locale | null {
  const browserLang = navigator.language.split("-")[0];
  return isValidLocale(browserLang) ? browserLang : null;
}

function getInitialLocale(hydrated: boolean): Locale | null {
  if (!hydrated) return null;
  return getLocaleFromStorage() ?? getLocaleFromBrowser() ?? defaultLocale;
}

function persistLocale(locale: Locale): void {
  if (typeof localStorage === "undefined") return;
  localStorage.setItem("locale", locale);
}
