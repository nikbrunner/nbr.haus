import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const h4Variants = cva("Typo-H4", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "main",
    variant: "web"
  }
});

type Props = Omit<React.ComponentProps<"h4">, "color"> &
  VariantProps<typeof h4Variants>;

export function H4({ children, className, color, variant, ...props }: Props) {
  return (
    <h4 className={cx(h4Variants({ color, variant }), className)} {...props}>
      {children}
    </h4>
  );
}
