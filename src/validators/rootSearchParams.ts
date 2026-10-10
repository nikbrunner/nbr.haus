import { z } from "zod";

import {
  accentSchema,
  colorModeSchema,
  defaultAccent,
  defaultColorMode
} from "@/types/style";

export const rootSearchParamsSchema = z.object({
  accent: accentSchema.optional().catch(undefined),
  colorMode: colorModeSchema.optional().catch(undefined)
});

type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  accent: defaultAccent,
  colorMode: defaultColorMode
} as const;
