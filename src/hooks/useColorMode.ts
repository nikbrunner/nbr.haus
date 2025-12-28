import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { DEFAULT_COLOR_MODE, type ColorMode } from "@/types/style";

import { applyColorMode, persistColorMode } from "./styleUtils";

interface UseColorModeReturn {
  colorMode: ColorMode;
  setColorMode: (colorMode: ColorMode) => void;
}

export function useColorMode(): UseColorModeReturn {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const colorMode = search.colorMode ?? DEFAULT_COLOR_MODE;

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

  return { colorMode, setColorMode };
}
