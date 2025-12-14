import { z } from "zod";

export const hueSchema = z.number().min(0).max(360);
export type Hue = z.infer<typeof hueSchema>;

export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;

export const contrastSchema = z.enum(["low", "base", "high"]);
export type Contrast = z.infer<typeof contrastSchema>;

export const rootSearchParamsSchema = z.object({
  hue: z.number().min(0).max(360).optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined),
  contrast: contrastSchema.optional().catch(undefined)
});

export type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  hue: undefined,
  colorMode: undefined,
  contrast: undefined
};
