import { Store, useStore } from "@tanstack/react-store";

import type { ColorMode, Contrast, Hue } from "@/validators/rootSearchParams";

// Types
export interface ControlPanelState {
  // Panel UI state
  isExpanded: boolean;

  // Style settings
  hue: Hue;
  contrast: Contrast;
  colorMode: ColorMode;
}

// Constants
export const PRESET_HUES: Hue[] = [90, 165, 275];

export const CONTRAST_VALUES: Contrast[] = ["low", "base", "high"];

const CONTRAST_CSS_VALUES: Record<Contrast, { l: number; c: number }> = {
  low: { l: 1, c: 0.6 },
  base: { l: 1, c: 1 },
  high: { l: 1, c: 1.4 }
};

export const COLOR_MODE_VALUES: ColorMode[] = ["light", "system", "dark"];

// Helper functions (internal)
function getHueVariants(hue: number) {
  const hueAccent = hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
  const hueAccentAlt =
    hueAccent + 180 > 360 ? hueAccent + 180 - 360 : hueAccent + 180;
  return { hue, hueAccent, hueAccentAlt };
}

export function getAccentHue(hue: number): number {
  return hue + 90 > 360 ? hue + 90 - 360 : hue + 90;
}

function applyHueCssVars(hue: number, hueAccent: number, hueAccentAlt: number) {
  if (typeof document !== "undefined") {
    document.body.style.setProperty("--hue", hue.toString());
    document.body.style.setProperty("--hue-accent", hueAccent.toString());
    document.body.style.setProperty("--hue-accent-alt", hueAccentAlt.toString());
  }
}

function applyContrastCssVars(contrast: Contrast) {
  if (typeof document !== "undefined") {
    const values = CONTRAST_CSS_VALUES[contrast];
    document.body.style.setProperty("--contrast-l", values.l.toString());
    document.body.style.setProperty("--contrast-c", values.c.toString());
  }
}

function applyColorMode(colorMode: ColorMode) {
  if (typeof document !== "undefined") {
    const html = document.documentElement;
    if (colorMode === "system") {
      html.removeAttribute("data-color-mode");
    } else {
      html.setAttribute("data-color-mode", colorMode);
    }
  }
}

// localStorage helpers (internal)
function saveHueToStorage(hue: number, hueAccent: number, hueAccentAlt: number) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("hue", hue.toString());
    localStorage.setItem("hue-accent", hueAccent.toString());
    localStorage.setItem("hue-accent-alt", hueAccentAlt.toString());
  }
}

function saveContrastToStorage(contrast: Contrast) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("contrast", contrast);
  }
}

function saveColorModeToStorage(colorMode: ColorMode) {
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("colorMode", colorMode);
  }
}

function getHueFromStorage(): number | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("hue");
    if (saved) return parseInt(saved, 10);
  }
  return null;
}

function getContrastFromStorage(): Contrast | null {
  if (typeof localStorage !== "undefined") {
    const saved = localStorage.getItem("contrast") as Contrast | null;
    if (saved && ["low", "base", "high"].includes(saved)) return saved;
  }
  return null;
}

function getColorModeFromStorage(): ColorMode | null {
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

// Store (internal - prefer using useSelector)
const store = new Store<ControlPanelState>({
  isExpanded: false,
  hue: DEFAULT_HUE,
  contrast: DEFAULT_CONTRAST,
  colorMode: DEFAULT_COLOR_MODE
});

// Selector hook - use this to read state
export function useSelector<T>(selector: (state: ControlPanelState) => T): T {
  return useStore(store, selector);
}

// Panel actions
export function toggleExpanded() {
  store.setState(s => ({ ...s, isExpanded: !s.isExpanded }));
}

export function setExpanded(isExpanded: boolean) {
  store.setState(s => ({ ...s, isExpanded }));
}

// Style actions
export function setHue(hue: number) {
  const { hueAccent, hueAccentAlt } = getHueVariants(hue);
  applyHueCssVars(hue, hueAccent, hueAccentAlt);
  saveHueToStorage(hue, hueAccent, hueAccentAlt);
  store.setState(s => ({ ...s, hue }));
}

export function setContrast(contrast: Contrast) {
  applyContrastCssVars(contrast);
  saveContrastToStorage(contrast);
  store.setState(s => ({ ...s, contrast }));
}

export function setColorMode(colorMode: ColorMode) {
  applyColorMode(colorMode);
  saveColorModeToStorage(colorMode);
  store.setState(s => ({ ...s, colorMode }));
}

// Initialize style from URL params or localStorage
export function initializeStyleFromParams(params: {
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

  store.setState(s => ({
    ...s,
    hue,
    contrast,
    colorMode
  }));
}
