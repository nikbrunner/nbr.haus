import { useCallback, useEffect } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import { colorModeSchema, defaultColorMode, type ColorMode } from "@/types/style";

export function useColorMode() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hydrated = useHydrated();
  const colorMode =
    search.colorMode ?? getColorModeFromStorage(hydrated) ?? defaultColorMode;

  // Apply color mode reactively when hydrated or colorMode changes
  useEffect(() => {
    if (!hydrated) return;

    applyColorMode(colorMode);
  }, [hydrated, colorMode]);

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
function getColorModeFromStorage(hydrated: boolean): ColorMode | null {
  if (!hydrated) return null;

  const saved = localStorage.getItem("colorMode");

  if (saved) {
    const validated = colorModeSchema.safeParse(saved);
    if (validated.success) return validated.data;
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
