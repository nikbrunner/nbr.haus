import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const blockquoteVariants = cva("Typo-Blockquote", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "minor"
  }
});

type Props = Omit<React.ComponentProps<"blockquote">, "color"> &
  VariantProps<typeof blockquoteVariants>;

export function Blockquote({ children, className, color, ...props }: Props) {
  return (
    <blockquote className={cx(blockquoteVariants({ color }), className)} {...props}>
      {children}
    </blockquote>
  );
}
