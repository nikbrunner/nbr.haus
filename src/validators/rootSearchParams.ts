import { z } from "zod";

import {
  colorModeSchema,
  defaultColorMode,
  defaultTheme,
  themeSchema
} from "@/types/style";

export const rootSearchParamsSchema = z.object({
  theme: themeSchema.optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined)
});

type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  theme: defaultTheme,
  colorMode: defaultColorMode
} as const;
