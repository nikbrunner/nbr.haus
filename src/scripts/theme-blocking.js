/**
 * Blocking script to prevent flash of incorrect theme.
 * Runs before React hydrates to read from URL params and localStorage.
 *
 * IMPORTANT: Keep in sync with:
 * - src/types/style.ts (values and defaults)
 * - src/hooks/useTheme.ts
 * - src/hooks/useColorMode.ts
 */

function initTheme() {
  try {
    var params = new URLSearchParams(window.location.search);

    // Color mode (set on html element)
    // Valid values: "light" | "dark" (system is handled by CSS, not stored)
    var colorMode = params.get("colorMode");
    if (!colorMode || (colorMode !== "light" && colorMode !== "dark")) {
      colorMode = localStorage.getItem("colorMode");
    }
    if (colorMode === "light" || colorMode === "dark") {
      document.documentElement.setAttribute("data-color-mode", colorMode);
    }

    // Theme (set on body)
    // Valid values from src/types/style.ts
    var validThemes = ["atom", "facility", "koyo", "polymer", "viridian"];
    var theme = params.get("theme");
    if (!validThemes.includes(theme)) {
      theme = localStorage.getItem("theme");
    }
    if (!validThemes.includes(theme)) {
      theme = "polymer";
    }
    document.body.dataset.theme = theme;
  } catch {
    // Silently fail - React will handle it after hydration
  }
}

initTheme();
