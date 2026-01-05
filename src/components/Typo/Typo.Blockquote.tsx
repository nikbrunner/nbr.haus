import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const blockquoteVariants = cva("Typo-Blockquote", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "minor",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"blockquote">, "color"> &
  VariantProps<typeof blockquoteVariants>;

export function Blockquote({ children, className, color, medium, ...props }: Props) {
  return (
    <blockquote
      className={cx(blockquoteVariants({ color, medium }), className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
