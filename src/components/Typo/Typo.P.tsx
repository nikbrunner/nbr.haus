import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const pVariants = cva("Typo-P", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "main",
    variant: "web"
  }
});

type Props = Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof pVariants>;

export function P({ children, className, color, variant, ...props }: Props) {
  return (
    <p className={cx(pVariants({ color, variant }), className)} {...props}>
      {children}
    </p>
  );
}
