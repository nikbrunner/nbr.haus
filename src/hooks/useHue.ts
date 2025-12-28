import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { DEFAULT_HUE, PRESET_HUES, type Hue } from "@/types/style";

import { applyHueCssVars, getHueVariants, persistHue } from "./styleUtils";

interface UseHueReturn {
  hue: Hue;
  setHue: (hue: Hue) => void;
  presets: readonly Hue[];
}

export function useHue(): UseHueReturn {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hue = search.hue ?? DEFAULT_HUE;

  const setHue = useCallback(
    (newHue: Hue) => {
      const { hueAccent, hueAccentAlt } = getHueVariants(newHue);
      applyHueCssVars(newHue, hueAccent, hueAccentAlt);
      persistHue(newHue, hueAccent, hueAccentAlt);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, hue: newHue }),
        resetScroll: false,
        replace: true
      });
    },
    [router]
  );

  return { hue, setHue, presets: PRESET_HUES };
}
