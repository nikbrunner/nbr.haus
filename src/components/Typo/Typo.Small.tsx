import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const smallVariants = cva("Typo-Small", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "minor",
    variant: "default"
  }
});

type Props = Omit<React.ComponentProps<"small">, "color"> &
  VariantProps<typeof smallVariants>;

export function Small({ children, className, color, variant, ...props }: Props) {
  return (
    <small className={cx(smallVariants({ color, variant }), className)} {...props}>
      {children}
    </small>
  );
}
