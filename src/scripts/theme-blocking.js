/**
 * Blocking script to prevent flash of incorrect theme.
 * Runs before React hydrates to read from URL params and localStorage.
 *
 * IMPORTANT: Keep in sync with:
 * - src/types/style.ts (values and defaults)
 * - src/hooks/useAccent.ts
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

    // Accent hue (set on body)
    // Valid values from src/types/style.ts: red=5, orange=65, green=155, blue=265
    var validAccents = [27, 65, 155, 265];
    var defaultAccent = 155; // green
    var accent = parseInt(params.get("accent") || "", 10);
    if (!validAccents.includes(accent)) {
      accent = parseInt(localStorage.getItem("accent") || "", 10);
    }
    if (!validAccents.includes(accent)) {
      accent = defaultAccent;
    }
    document.body.style.setProperty("--hue-accent", accent.toString());
  } catch {
    // Silently fail - React will handle it after hydration
  }
}

initTheme();
