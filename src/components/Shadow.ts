import { cva, type VariantProps } from "class-variance-authority";

export const shadowVariants = cva("", {
  variants: {
    shadow: {
      "none": "",
      "hard-sm": "Shadow--hard-sm",
      "hard-lg": "Shadow--hard-lg",
      "hatched-sm": "Shadow--hatched-sm",
      "hatched-lg": "Shadow--hatched-lg"
    }
  },
  defaultVariants: {
    shadow: "none"
  }
});

export type ShadowVariants = VariantProps<typeof shadowVariants>;
