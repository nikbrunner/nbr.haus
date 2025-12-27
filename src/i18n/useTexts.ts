import { en, type Texts } from "@/texts/en";
import { de } from "@/texts/de";
import { useLocale } from "./useLocale";
import type { Widen, Locale } from "./types";

type WidenedTexts = Widen<Texts>;

const texts: Record<Locale, WidenedTexts> = { en, de };

export function useTexts(): WidenedTexts {
  const locale = useLocale();
  return texts[locale];
}
