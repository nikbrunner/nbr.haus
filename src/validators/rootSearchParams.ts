import { z } from "zod";

import { localeSchema } from "@/types/i18n";
import { colorModeSchema, contrastSchema, hueSchema } from "@/types/style";

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
