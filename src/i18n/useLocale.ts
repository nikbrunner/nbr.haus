import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { DEFAULT_LOCALE, type Locale } from "@/types/i18n";

import { persistLocale } from "./utils";

/**
 * Returns the current locale and a setter function.
 * Locale is read from URL search params, setter updates both URL and localStorage.
 */
export function useLocale(): {
  locale: Locale;
  setLocale: (locale: Locale) => void;
} {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const locale = search.lang ?? DEFAULT_LOCALE;

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

  return { locale, setLocale };
}
