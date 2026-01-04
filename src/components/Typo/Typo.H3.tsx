import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const h3Variants = cva("Typo-H3", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "main",
    variant: "default"
  }
});

type Props = Omit<React.ComponentProps<"h3">, "color"> &
  VariantProps<typeof h3Variants>;

export function H3({ children, className, color, variant, ...props }: Props) {
  return (
    <h3 className={cx(h3Variants({ color, variant }), className)} {...props}>
      {children}
    </h3>
  );
}
