import {
  COLOR_MODE_VALUES,
  CONTRAST_VALUES,
  DEFAULT_COLOR_MODE,
  DEFAULT_CONTRAST,
  DEFAULT_HUE,
  type ColorMode,
  type Contrast,
  type Hue
} from "@/types/style";

const CONTRAST_CSS_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

// Hue calculations
export function getHueVariants(hue: number) {
  const hueAccent = hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
  const hueAccentAlt =
    hueAccent + 180 > 360 ? hueAccent + 180 - 360 : hueAccent + 180;
  return { hue, hueAccent, hueAccentAlt };
}

export function getAccentHue(hue: number): number {
  return hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
}

// CSS variable application
export function applyHueCssVars(
  hue: number,
  hueAccent: number,
  hueAccentAlt: number
) {
  if (typeof document !== "undefined") {
    document.body.style.setProperty("--hue", hue.toString());
    document.body.style.setProperty("--hue-accent", hueAccent.toString());
    document.body.style.setProperty("--hue-accent-alt", hueAccentAlt.toString());
  }
}

export function applyContrastCssVars(contrast: Contrast) {
  if (typeof document !== "undefined") {
    const values = CONTRAST_CSS_VALUES[contrast];
    document.body.style.setProperty("--contrast-l", values.l.toString());
    document.body.style.setProperty("--contrast-c", values.c.toString());
  }
}

export function applyColorMode(colorMode: ColorMode) {
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    if (colorMode === "system") {
      html.removeAttribute("data-color-mode");
    } else {
      html.setAttribute("data-color-mode", colorMode);
    }
  }
}

// localStorage persistence
export function persistHue(hue: number, hueAccent: number, hueAccentAlt: number) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("hue", hue.toString());
    localStorage.setItem("hue-accent", hueAccent.toString());
    localStorage.setItem("hue-accent-alt", hueAccentAlt.toString());
  }
}

export function persistContrast(contrast: Contrast) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("contrast", contrast);
  }
}

export function persistColorMode(colorMode: ColorMode) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("colorMode", colorMode);
  }
}

// localStorage getters
function getHueFromStorage(): Hue | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("hue");
    if (saved) return parseInt(saved, 10);
  }
  return null;
}

function getContrastFromStorage(): Contrast | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("contrast") as Contrast | null;
    if (saved && CONTRAST_VALUES.includes(saved)) return saved;
  }
  return null;
}

function getColorModeFromStorage(): ColorMode | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("colorMode") as ColorMode | null;
    if (saved && COLOR_MODE_VALUES.includes(saved)) return saved;
  }
  return null;
}

// Initial value getters (localStorage → default)
export function getInitialHue(): Hue {
  return getHueFromStorage() ?? DEFAULT_HUE;
}

export function getInitialContrast(): Contrast {
  return getContrastFromStorage() ?? DEFAULT_CONTRAST;
}

export function getInitialColorMode(): ColorMode {
  return getColorModeFromStorage() ?? DEFAULT_COLOR_MODE;
}
