import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const blockquoteVariants = cva("Typo-Blockquote", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "minor",
    variant: "web"
  }
});

type Props = Omit<React.ComponentProps<"blockquote">, "color"> &
  VariantProps<typeof blockquoteVariants>;

export function Blockquote({
  children,
  className,
  color,
  variant,
  ...props
}: Props) {
  return (
    <blockquote
      className={cx(blockquoteVariants({ color, variant }), className)}
      {...props}
    >
      {children}
    </blockquote>
  );
}
