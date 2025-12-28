import { de } from "@/texts/de";
import { en, type Texts } from "@/texts/en";
import type { Locale, Widen } from "@/types/i18n";

import { useLocale } from "./useLocale";

type WidenedTexts = Widen<Texts>;

const texts: Record<Locale, WidenedTexts> = { en, de };

export function useTexts(): WidenedTexts {
  const { locale } = useLocale();
  return texts[locale];
}
