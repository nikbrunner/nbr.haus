import { useEffect } from "react";

import { useSearch } from "@tanstack/react-router";

import { useLocale } from "@/i18n/useLocale";
import { getInitialLocale } from "@/i18n/utils";

import {
  applyColorMode,
  applyContrastCssVars,
  applyHueCssVars,
  getHueVariants,
  getInitialColorMode,
  getInitialContrast,
  getInitialHue,
  persistColorMode,
  persistContrast,
  persistHue
} from "./styleUtils";
import { useColorMode } from "./useColorMode";
import { useContrast } from "./useContrast";
import { useHue } from "./useHue";

/**
 * Initializes style settings from URL params or localStorage.
 * - If URL param exists: apply CSS vars and persist to localStorage
 * - If URL param missing: initialize from localStorage/default
 */
export function useInitializeStyle() {
  const search = useSearch({ strict: false });
  const { setHue } = useHue();
  const { setContrast } = useContrast();
  const { setColorMode } = useColorMode();
  const { setLocale } = useLocale();

  useEffect(() => {
    // Hue
    if (search.hue === undefined) {
      setHue(getInitialHue());
    } else {
      const { hueAccent, hueAccentAlt } = getHueVariants(search.hue);
      applyHueCssVars(search.hue, hueAccent, hueAccentAlt);
      persistHue(search.hue, hueAccent, hueAccentAlt);
    }

    // Contrast
    if (search.contrast === undefined) {
      setContrast(getInitialContrast());
    } else {
      applyContrastCssVars(search.contrast);
      persistContrast(search.contrast);
    }

    // Color Mode
    if (search.colorMode === undefined) {
      setColorMode(getInitialColorMode());
    } else {
      applyColorMode(search.colorMode);
      persistColorMode(search.colorMode);
    }

    // Locale
    if (search.lang === undefined) {
      setLocale(getInitialLocale());
    }
  }, [
    search.hue,
    search.contrast,
    search.colorMode,
    search.lang,
    setHue,
    setContrast,
    setColorMode,
    setLocale
  ]);
}
