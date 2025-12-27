import { z } from "zod";

const hueSchema = z.number().min(0).max(360);
export type Hue = z.infer<typeof hueSchema>;

const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;

const contrastSchema = z.enum(["low", "base", "high"]);
export type Contrast = z.infer<typeof contrastSchema>;

const localeSchema = z.enum(["en", "de"]);

export const rootSearchParamsSchema = z.object({
  hue: hueSchema.optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined),
  contrast: contrastSchema.optional().catch(undefined),
  lang: localeSchema.optional().catch(undefined)
});

export const defaultRootSearchParams = {
  hue: undefined,
  colorMode: undefined,
  contrast: undefined,
  lang: undefined
} as const;
