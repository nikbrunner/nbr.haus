import { z } from "zod";

// Hue
export const hueSchema = z.number().min(0).max(360);
export type Hue = z.infer<typeof hueSchema>;

// Contrast
export const contrastSchema = z.enum(["low", "base", "high"]);
export type Contrast = z.infer<typeof contrastSchema>;

// Color Mode
export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;
