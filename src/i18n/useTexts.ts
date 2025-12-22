import type { Locale } from "./types";
import { useLocale } from "./useLocale";

export function useTexts<T>(texts: Record<Locale, T>): T {
  const locale = useLocale();
  return texts[locale];
}
