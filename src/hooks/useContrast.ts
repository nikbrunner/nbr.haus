import { useCallback, useEffect } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import {
  contrastChromaValues,
  contrastSchema,
  defaultContrast,
  type Contrast
} from "@/types/style";

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
    document.body.style.setProperty(
      "--chroma",
      contrastChromaValues[contrast].toString()
    );
  }
}
