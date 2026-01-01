/** Standard size scale (Open Props --size-{n}) */
type SizeScale =
  | "0"
  | "1"
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "10"
  | "11"
  | "12"
  | "13"
  | "14"
  | "15";

/** Fluid size scale (Open Props --size-fluid-{n}) */
type FluidScale =
  `fluid-${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10"}`;

/** Relative size scale (Open Props --size-rel-{n}) */
type RelScale =
  `rel-${"1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "11" | "12" | "13" | "14" | "15"}`;

/** Combined gap value type for Flex component */
export type GapValue = SizeScale | FluidScale | RelScale;

/** Resolves a GapValue to a CSS variable string */
export function resolveGap(gap: GapValue): string {
  return `var(--size-${gap})`;
}
