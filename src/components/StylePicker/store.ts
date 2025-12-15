import { Store } from "@tanstack/react-store";
import type { Hue, ColorMode, Contrast } from "@/validators/rootSearchParams";

// Types
export interface StyleState {
  isExpanded: boolean;
  hue: Hue;
  contrast: Contrast;
  colorMode: ColorMode;
}

// Constants
export const PRESET_HUES: Hue[] = [90, 165, 275];

export const CONTRAST_OPTIONS: { value: Contrast; label: string }[] = [
  { value: "low", label: "LC" },
  { value: "base", label: "BC" },
  { value: "high", label: "HC" }
];

export const CONTRAST_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

export const COLOR_MODE_OPTIONS: { value: ColorMode; label: string }[] = [
  { value: "light", label: "LT" },
  { value: "system", label: "SYS" },
  { value: "dark", label: "DK" }
];

export const CONTRAST_LABELS: Record<Contrast, string> = {
  low: "LC",
  base: "BC",
  high: "HC"
};

export const COLOR_MODE_LABELS: Record<ColorMode, string> = {
  light: "LT",
  system: "SYS",
  dark: "DK"
};

// Helper functions
export function getHueVariants(hue: number) {
  const hueAccent = hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
  const hueAccentAlt =
    hueAccent + 180 > 360 ? hueAccent + 180 - 360 : hueAccent + 180;
  return { hue, hueAccent, hueAccentAlt };
}

export function getAccentHue(hue: number): number {
  return hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
}

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
    const values = CONTRAST_VALUES[contrast];
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

// localStorage helpers
export function saveHueToStorage(
  hue: number,
  hueAccent: number,
  hueAccentAlt: number
) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("hue", hue.toString());
    localStorage.setItem("hue-accent", hueAccent.toString());
    localStorage.setItem("hue-accent-alt", hueAccentAlt.toString());
  }
}

export function saveContrastToStorage(contrast: Contrast) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("contrast", contrast);
  }
}

export function saveColorModeToStorage(colorMode: ColorMode) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("colorMode", colorMode);
  }
}

export function getHueFromStorage(): number | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("hue");
    if (saved) return parseInt(saved, 10);
  }
  return null;
}

export function getContrastFromStorage(): Contrast | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("contrast") as Contrast | null;
    if (saved && ["low", "base", "high"].includes(saved)) return saved;
  }
  return null;
}

export function getColorModeFromStorage(): ColorMode | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("colorMode") as ColorMode | null;
    if (saved && ["light", "system", "dark"].includes(saved)) return saved;
  }
  return null;
}

// Default values
const DEFAULT_HUE = PRESET_HUES[0];
const DEFAULT_CONTRAST: Contrast = "base";
const DEFAULT_COLOR_MODE: ColorMode = "system";

// Store
export const styleStore = new Store<StyleState>({
  isExpanded: false,
  hue: DEFAULT_HUE,
  contrast: DEFAULT_CONTRAST,
  colorMode: DEFAULT_COLOR_MODE
});

// Actions
export function toggleExpanded() {
  styleStore.setState(s => ({ ...s, isExpanded: !s.isExpanded }));
}

export function setExpanded(isExpanded: boolean) {
  styleStore.setState(s => ({ ...s, isExpanded }));
}

export function setHue(hue: number) {
  const { hueAccent, hueAccentAlt } = getHueVariants(hue);
  applyHueCssVars(hue, hueAccent, hueAccentAlt);
  saveHueToStorage(hue, hueAccent, hueAccentAlt);
  styleStore.setState(s => ({ ...s, hue }));
}

export function setContrast(contrast: Contrast) {
  applyContrastCssVars(contrast);
  saveContrastToStorage(contrast);
  styleStore.setState(s => ({ ...s, contrast }));
}

export function setColorMode(colorMode: ColorMode) {
  applyColorMode(colorMode);
  saveColorModeToStorage(colorMode);
  styleStore.setState(s => ({ ...s, colorMode }));
}

// Initialize from URL params or localStorage
export function initializeFromParams(params: {
  hue?: number;
  contrast?: Contrast;
  colorMode?: ColorMode;
}) {
  // Hue
  const hue = params.hue ?? getHueFromStorage() ?? DEFAULT_HUE;
  const { hueAccent, hueAccentAlt } = getHueVariants(hue);
  applyHueCssVars(hue, hueAccent, hueAccentAlt);
  saveHueToStorage(hue, hueAccent, hueAccentAlt);

  // Contrast
  const contrast = params.contrast ?? getContrastFromStorage() ?? DEFAULT_CONTRAST;
  applyContrastCssVars(contrast);
  saveContrastToStorage(contrast);

  // ColorMode
  const colorMode =
    params.colorMode ?? getColorModeFromStorage() ?? DEFAULT_COLOR_MODE;
  applyColorMode(colorMode);
  saveColorModeToStorage(colorMode);

  styleStore.setState(s => ({
    ...s,
    hue,
    contrast,
    colorMode
  }));
}
