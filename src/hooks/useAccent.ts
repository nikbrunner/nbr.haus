/**
 * IMPORTANT: Keep accent logic in sync with src/scripts/theme-blocking.js
 */

import { useCallback, useEffect } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import { accents, accentSchema, defaultAccent, type Accent } from "@/types/style";

export function useAccent() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hydrated = useHydrated();
  const accent = search.accent ?? getAccentFromStorage(hydrated) ?? defaultAccent;

  useEffect(() => {
    if (!hydrated) return;
    applyAccentCssVar(accent);
  }, [hydrated, accent]);

  const setAccent = useCallback(
    (newAccent: Accent) => {
      applyAccentCssVar(newAccent);
      persistAccent(newAccent);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, accent: newAccent }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return { accent, accents, setAccent };
}

function getAccentFromStorage(hydrated: boolean): Accent | null {
  if (!hydrated) return null;

  const saved = localStorage.getItem("accent");
  if (saved) {
    const validated = accentSchema.safeParse(saved);
    if (validated.success) return validated.data as Accent;
  }

  return null;
}

function persistAccent(accent: number) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("accent", accent.toString());
  }
}

function applyAccentCssVar(accent: number) {
  if (typeof document !== "undefined") {
    document.body.style.setProperty("--hue-accent", accent.toString());
  }
}
