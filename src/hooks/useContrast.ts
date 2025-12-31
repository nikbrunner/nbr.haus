import { useCallback, useEffect } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import { contrastSchema, defaultContrast, type Contrast } from "@/types/style";

const CSS_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

export function useContrast() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hydrated = useHydrated();
  const contrast =
    search.contrast ?? getContrastFromStorage(hydrated) ?? defaultContrast;

  // Apply CSS vars reactively when hydrated or contrast changes
  useEffect(() => {
    if (!hydrated) return;

    applyContrastCssVars(contrast);
  }, [hydrated, contrast]);

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
function getContrastFromStorage(hydrated: boolean): Contrast | null {
  if (!hydrated) return null;

  const saved = localStorage.getItem("contrast");

  if (saved) {
    const validated = contrastSchema.safeParse(saved);
    if (validated.success) return validated.data;
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
