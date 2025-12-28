import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { DEFAULT_CONTRAST, type Contrast } from "@/types/style";

import { applyContrastCssVars, persistContrast } from "./styleUtils";

interface UseContrastReturn {
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
}

export function useContrast(): UseContrastReturn {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const contrast = search.contrast ?? DEFAULT_CONTRAST;

  const setContrast = useCallback(
    (newContrast: Contrast) => {
      applyContrastCssVars(newContrast);
      persistContrast(newContrast);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, contrast: newContrast }),
        resetScroll: false,
        replace: true
      });
    },
    [router]
  );

  return { contrast, setContrast };
}
