import { z } from "zod";

import {
  accentSchema,
  colorModeSchema,
  contrastSchema,
  defaultAccent,
  defaultColorMode,
  defaultContrast
} from "@/types/style";

export const rootSearchParamsSchema = z.object({
  accent: accentSchema.optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined),
  contrast: contrastSchema.optional().catch(undefined)
});

export type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  accent: defaultAccent,
  colorMode: defaultColorMode,
  contrast: defaultContrast
} as const;
