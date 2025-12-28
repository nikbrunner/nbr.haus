import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import type { Hue } from "@/validators/rootSearchParams";

import {
  applyHueCssVars,
  DEFAULT_HUE,
  getHueVariants,
  persistHue
} from "./styleUtils";

interface UseHueReturn {
  hue: Hue;
  setHue: (hue: Hue) => void;
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

  return { hue, setHue };
}
