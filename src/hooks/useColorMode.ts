import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { colorModeSchema, type ColorMode } from "@/types/style";

export function useColorMode() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const colorMode = search.colorMode ?? getColorModeFromStorage() ?? "system";

  const setColorMode = useCallback(
    (newColorMode: ColorMode) => {
      applyColorMode(newColorMode);
      persistColorMode(newColorMode);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, colorMode: newColorMode }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return {
    colorMode,
    setColorMode,
    colorModes: colorModeSchema.options
  };
}

// Storage
function getColorModeFromStorage(): ColorMode | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("colorMode") as ColorMode | null;
    if (saved && colorModeSchema.safeParse(saved).success) return saved;
  }
  return null;
}

function persistColorMode(colorMode: ColorMode) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("colorMode", colorMode);
  }
}

// CSS
function applyColorMode(colorMode: ColorMode) {
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    if (colorMode === "system") {
      html.removeAttribute("data-color-mode");
    } else {
      html.setAttribute("data-color-mode", colorMode);
    }
  }
}
