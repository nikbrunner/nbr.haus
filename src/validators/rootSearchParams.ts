import { z } from "zod";

export const rootSearchParamsSchema = z.object({
  hue: z.number().min(0).max(360).optional().catch(undefined),
});

type RootSearchParams = z.infer<typeof rootSearchParamsSchema>;

export const defaultRootSearchParams: RootSearchParams = {
  hue: undefined,
};
