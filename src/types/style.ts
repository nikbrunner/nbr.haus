import { z } from "zod";

// Hue
export const hueSchema = z.number().min(0).max(360);
export type Hue = z.infer<typeof hueSchema>;
export const PRESET_HUES: Hue[] = [90, 165, 275];
export const DEFAULT_HUE = PRESET_HUES[0];

// Contrast
export const contrastSchema = z.enum(["low", "base", "high"]);
export type Contrast = z.infer<typeof contrastSchema>;
export const CONTRAST_VALUES = contrastSchema.options;
export const DEFAULT_CONTRAST: Contrast = "base";

// Color Mode
export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;
export const COLOR_MODE_VALUES = colorModeSchema.options;
export const DEFAULT_COLOR_MODE: ColorMode = "system";
