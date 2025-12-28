import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { contrastSchema, type Contrast } from "@/types/style";

import { applyContrastCssVars, persistContrast } from "./styleUtils";

export function useContrast() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const contrast = search.contrast ?? getContrastFromStorage() ?? "base";

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

  return { contrast, setContrast, values: contrastSchema.options };
}

function getContrastFromStorage(): Contrast | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("contrast") as Contrast | null;
    if (saved && contrastSchema.parse(saved)) return saved;
  }

  return null;
}
