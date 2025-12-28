import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { hueSchema, type Hue } from "@/types/style";

const hues: Hue[] = [90, 165, 275];

export function useHue() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hue = search.hue ?? getHueFromStorage() ?? hues[0];

  const setHue = useCallback(
    (newHue: Hue) => {
      const { hueAccent, hueAccentAlt } = getHueVariants(newHue);
      applyHueCssVars(newHue, hueAccent, hueAccentAlt);
      persistHue(newHue, hueAccent, hueAccentAlt);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, hue: newHue }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return {
    hue,
    hues,
    setHue,
    getAccentHue
  };
}

// Storage
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

function persistHue(hue: number, hueAccent: number, hueAccentAlt: number) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("hue", hue.toString());
    localStorage.setItem("hue-accent", hueAccent.toString());
    localStorage.setItem("hue-accent-alt", hueAccentAlt.toString());
  }
}

// Calculations
function getHueVariants(hue: number) {
  const hueAccent = getAccentHue(hue);
  const hueAccentAlt =
    hueAccent + 180 > 360 ? hueAccent + 180 - 360 : hueAccent + 180;
  return { hue, hueAccent, hueAccentAlt };
}

function getAccentHue(hue: number): number {
  return hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
}

// CSS
function applyHueCssVars(hue: number, hueAccent: number, hueAccentAlt: number) {
  if (typeof document !== "undefined") {
    document.body.style.setProperty("--hue", hue.toString());
    document.body.style.setProperty("--hue-accent", hueAccent.toString());
    document.body.style.setProperty("--hue-accent-alt", hueAccentAlt.toString());
  }
}
