import { useStore } from "@tanstack/react-store";
import { i18nStore } from "./store";
import { translations } from "./translations";
import type { Locale } from "./types";

export function useTranslation() {
  const locale = useStore(i18nStore, s => s.locale);

  return {
    locale,
    t: translations[locale]
  };
}

// Hook for getting just the locale (lighter weight)
export function useLocale(): Locale {
  return useStore(i18nStore, s => s.locale);
}
