import { z } from "zod";

export const localeSchema = z.enum(["en", "de"]);
export type Locale = z.infer<typeof localeSchema>;
export const LOCALES = localeSchema.options;
export const DEFAULT_LOCALE: Locale = "en";

// Utility type: recursively widen string literals to string
// This allows German translations to have different values while matching the structure
export type Widen<T> = T extends string
  ? string
  : T extends object
    ? { [K in keyof T]: Widen<T[K]> }
    : T;
