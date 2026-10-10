import { z } from "zod";

/**
 * IMPORTANT: Keep theme values in sync with src/scripts/theme-blocking.js
 */

// Theme (user-selected palette, after Black Atom themes)
export const themes = ["atom", "facility", "koyo", "polymer", "viridian"] as const;
export const themeSchema = z.enum(themes);
export type Theme = z.infer<typeof themeSchema>;
export const defaultTheme: Theme = "polymer";

// Color Mode
export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;
export const defaultColorMode: ColorMode = "system";
