import { useLocale } from "./useTranslation";
import { texts as en } from "./shared.en";
import { texts as de } from "./shared.de";

const sharedTexts = { en, de };

export function useSharedTexts() {
  const locale = useLocale();
  return sharedTexts[locale];
}
