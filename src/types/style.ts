import { z } from "zod";

// Accent (user-selected hue for accent color)
export const accents = {
  red: 15,
  orange: 90,
  green: 175,
  blue: 220
} as const;
export type Accent = (typeof accents)[keyof typeof accents];
export const accentSchema = z.coerce
  .number()
  .refine((v): v is Accent => Object.values(accents).includes(v as Accent));
export const defaultAccent: Accent = accents.green;

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
