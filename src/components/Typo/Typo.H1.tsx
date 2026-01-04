import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const h1Variants = cva("Typo-H1", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "main",
    variant: "default"
  }
});

type Props = Omit<React.ComponentProps<"h1">, "color"> &
  VariantProps<typeof h1Variants>;

export function H1({ children, className, color, variant, ...props }: Props) {
  return (
    <h1 className={cx(h1Variants({ color, variant }), className)} {...props}>
      {children}
    </h1>
  );
}
