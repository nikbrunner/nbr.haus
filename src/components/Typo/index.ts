import { H1, h1Variants } from "@/components/Typo/Typo.H1";
import { H2, h2Variants } from "@/components/Typo/Typo.H2";
import { H3, h3Variants } from "@/components/Typo/Typo.H3";
import { H4, h4Variants } from "@/components/Typo/Typo.H4";
import { P, pVariants } from "@/components/Typo/Typo.P";

export type { TypoColor } from "./Typo.types";

export const Typo = { H1, H2, H3, H4, P };

export const typoVariants = {
  h1: h1Variants,
  h2: h2Variants,
  h3: h3Variants,
  h4: h4Variants,
  p: pVariants
};
