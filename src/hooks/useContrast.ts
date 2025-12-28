import { useCallback } from "react";

import { useRouter, useSearch } from "@tanstack/react-router";

import { contrastSchema, type Contrast } from "@/types/style";

const CSS_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

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
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return {
    contrast,
    setContrast,
    contrasts: contrastSchema.options
  };
}

// Storage
function getContrastFromStorage(): Contrast | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("contrast") as Contrast | null;
    if (saved && contrastSchema.safeParse(saved).success) return saved;
  }
  return null;
}

function persistContrast(contrast: Contrast) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("contrast", contrast);
  }
}

// CSS
function applyContrastCssVars(contrast: Contrast) {
  if (typeof document !== "undefined") {
    const values = CSS_VALUES[contrast];
    document.body.style.setProperty("--contrast-l", values.l.toString());
    document.body.style.setProperty("--contrast-c", values.c.toString());
  }
}
