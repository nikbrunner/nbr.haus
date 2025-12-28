import { useEffect } from "react";

import { useSearch } from "@tanstack/react-router";

import { useLocale } from "@/i18n/useLocale";
import { getInitialLocale } from "@/i18n/utils";

import { useColorMode } from "./useColorMode";
import { useContrast } from "./useContrast";
import { useHue } from "./useHue";

/**
 * Initializes style settings by applying CSS vars and persisting to localStorage.
 * Each hook already resolves the correct value from URL or localStorage.
 */
export function useInitializeStyle() {
  const search = useSearch({ strict: false });
  const { hue, getHueVariants, applyHueCssVars, persistHue } = useHue();
  const { contrast, applyContrastCssVars, persistContrast } = useContrast();
  const { colorMode, setColorMode } = useColorMode();
  const { setLocale } = useLocale();

  useEffect(() => {
    // Hue
    const { hueAccent, hueAccentAlt } = getHueVariants(hue);
    applyHueCssVars(hue, hueAccent, hueAccentAlt);
    persistHue(hue, hueAccent, hueAccentAlt);

    // Contrast
    applyContrastCssVars(contrast);
    persistContrast(contrast);

    setColorMode(colorMode);

    // Locale
    if (search.lang === undefined) {
      setLocale(getInitialLocale());
    }
  }, [hue, contrast, colorMode, search.lang, setLocale]);
}
