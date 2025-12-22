import type { Locale } from "./types";
import { useLocale } from "./useTranslation";

export function useTexts<T>(texts: Record<Locale, T>): T {
  const locale = useLocale();
  return texts[locale];
}
