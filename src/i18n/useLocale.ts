import { useStore } from "@tanstack/react-store";

import { i18nStore } from "./store";
import type { Locale } from "./types";

// Hook for getting the current locale
export function useLocale(): Locale {
  return useStore(i18nStore, s => s.locale);
}
