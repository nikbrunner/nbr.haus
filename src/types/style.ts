import { z } from "zod";

/**
 * IMPORTANT: Keep accent values in sync with src/scripts/theme-blocking.js
 */

// Accent (user-selected hue for accent color)
export const accents = {
  red: 5,
  orange: 65,
  green: 155,
  blue: 265
} as const;
export type Accent = (typeof accents)[keyof typeof accents];
export const accentSchema = z.coerce
  .number()
  .refine((v): v is Accent => Object.values(accents).includes(v as Accent));
export const defaultAccent: Accent = accents.green;

// Color Mode
export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;
export const defaultColorMode: ColorMode = "system";
