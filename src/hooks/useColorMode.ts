import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { colorModeSchema, type ColorMode } from "@/types/style";

import { applyColorMode, persistColorMode } from "./styleUtils";

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
        replace: true
      });
    },
    [router]
  );

  return { colorMode, setColorMode, values: colorModeSchema.options };
}

function getColorModeFromStorage(): ColorMode | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("colorMode") as ColorMode | null;
    if (saved && colorModeSchema.safeParse(saved).success) return saved;
  }

  return null;
}
