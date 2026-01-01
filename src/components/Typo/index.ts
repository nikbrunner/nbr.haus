import { H1, h1Variants } from "src/components/Typo/Typo.H1";
import { H2, h2Variants } from "src/components/Typo/Typo.H2";
import { H3, h3Variants } from "src/components/Typo/Typo.H3";
import { H4, h4Variants } from "src/components/Typo/Typo.H4";
import { P, pVariants } from "src/components/Typo/Typo.P";

export type { TypoColor } from "./Typo.types";

export { H1, h1Variants } from "./Typo.H1";
export { H2, h2Variants } from "./Typo.H2";
export { H3, h3Variants } from "./Typo.H3";
export { H4, h4Variants } from "./Typo.H4";
export { P, pVariants } from "./Typo.P";

export const Typo = { H1, H2, H3, H4, P };

export const typoVariants = {
  h1: h1Variants,
  h2: h2Variants,
  h3: h3Variants,
  h4: h4Variants,
  p: pVariants
};
