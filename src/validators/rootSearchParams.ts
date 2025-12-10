import { z } from "zod";

export const colorModeSchema = z.enum(["light", "system", "dark"]);
export type ColorMode = z.infer<typeof colorModeSchema>;

export const rootSearchParamsSchema = z.object({
  hue: z.number().min(0).max(360).optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined)
});

export type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  hue: undefined,
  colorMode: undefined
};
