import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { hueSchema, type Hue } from "@/types/style";

import { applyHueCssVars, getHueVariants, persistHue } from "./styleUtils";

const PRESETS: Hue[] = [90, 165, 275];

export function useHue() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hue = search.hue ?? getHueFromStorage() ?? PRESETS[0];

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

  return { hue, setHue, presets: PRESETS };
}

function getHueFromStorage(): Hue | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("hue");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (hueSchema.safeParse(parsed).success) return parsed;
    }
  }

  return null;
}
