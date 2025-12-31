import { z } from "zod";

import { localeSchema } from "@/types/i18n";
import {
  colorModeSchema,
  contrastSchema,
  defaultColorMode,
  defaultContrast,
  defaultHue,
  hueSchema
} from "@/types/style";

export const rootSearchParamsSchema = z.object({
  hue: hueSchema.optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined),
  contrast: contrastSchema.optional().catch(undefined),
  lang: localeSchema.optional().catch(undefined)
});

export type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  hue: defaultHue,
  colorMode: defaultColorMode,
  contrast: defaultContrast,
  lang: undefined
} as const;
