import { z } from "zod";

// Hue
export const hues = {
  green: 90,
  blue: 165,
  red: 275
} as const;
export const hueSchema = z.enum(hues);
export type Hue = z.infer<typeof hueSchema>;
export const defaultHue: Hue = hues.green;

// Contrast (chroma multiplier)
export const contrastSchema = z.enum(["low", "base", "high"]);
export type Contrast = z.infer<typeof contrastSchema>;
export const defaultContrast: Contrast = "base";
export const contrastChromaValues: Record<Contrast, number> = {
  low: 0.6,
  base: 1,
  high: 1.4
};

// Color Mode
export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;
export const defaultColorMode: ColorMode = "system";
