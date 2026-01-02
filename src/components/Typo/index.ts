import { Blockquote, blockquoteVariants } from "@/components/Typo/Typo.Blockquote";
import { H1, h1Variants } from "@/components/Typo/Typo.H1";
import { H2, h2Variants } from "@/components/Typo/Typo.H2";
import { H3, h3Variants } from "@/components/Typo/Typo.H3";
import { H4, h4Variants } from "@/components/Typo/Typo.H4";
import { Highlight, highlightVariants } from "@/components/Typo/Typo.Highlight";
import { InlineCode, inlineCodeVariants } from "@/components/Typo/Typo.InlineCode";
import { Lead, leadVariants } from "@/components/Typo/Typo.Lead";
import {
  listVariants,
  OrderedList,
  UnorderedList
} from "@/components/Typo/Typo.List";
import { P, pVariants } from "@/components/Typo/Typo.P";
import { Small, smallVariants } from "@/components/Typo/Typo.Small";

export type { TypoColor } from "./Typo.types";

export const Typo = {
  Blockquote,
  H1,
  H2,
  H3,
  H4,
  Highlight,
  InlineCode,
  Lead,
  OrderedList,
  P,
  Small,
  UnorderedList
};

export const typoVariants = {
  blockquote: blockquoteVariants,
  h1: h1Variants,
  h2: h2Variants,
  h3: h3Variants,
  h4: h4Variants,
  highlight: highlightVariants,
  inlineCode: inlineCodeVariants,
  lead: leadVariants,
  list: listVariants,
  p: pVariants,
  small: smallVariants
};
