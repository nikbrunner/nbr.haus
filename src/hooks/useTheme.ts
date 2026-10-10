/**
 * IMPORTANT: Keep theme logic in sync with src/scripts/theme-blocking.js
 */

import { useCallback, useEffect } from "react";

import { useHydrated, useRouter, useSearch } from "@tanstack/react-router";

import { defaultTheme, themes, themeSchema, type Theme } from "@/types/style";

export function useTheme() {
  const router = useRouter();
  const search = useSearch({ strict: false });
  const hydrated = useHydrated();
  const theme = search.theme ?? getThemeFromStorage(hydrated) ?? defaultTheme;

  useEffect(() => {
    if (!hydrated) return;
    applyThemeAttribute(theme);
  }, [hydrated, theme]);

  const setTheme = useCallback(
    (newTheme: Theme) => {
      applyThemeAttribute(newTheme);
      persistTheme(newTheme);
      router.navigate({
        to: ".",
        search: prev => ({ ...prev, theme: newTheme }),
        resetScroll: false,
        replace: true,
        viewTransition: true
      });
    },
    [router]
  );

  return { theme, themes, setTheme };
}

function getThemeFromStorage(hydrated: boolean): Theme | null {
  if (!hydrated) return null;

  const validated = themeSchema.safeParse(localStorage.getItem("theme"));
  return validated.success ? validated.data : null;
}

function persistTheme(theme: Theme) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("theme", theme);
  }
}

function applyThemeAttribute(theme: Theme) {
  if (typeof document !== "undefined") {
    document.body.dataset.theme = theme;
  }
}
