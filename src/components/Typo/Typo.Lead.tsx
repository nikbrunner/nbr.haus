import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const leadVariants = cva("Typo-Lead", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "support",
    variant: "web"
  }
});

type Props = Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof leadVariants>;

export function Lead({ children, className, color, variant, ...props }: Props) {
  return (
    <p className={cx(leadVariants({ color, variant }), className)} {...props}>
      {children}
    </p>
  );
}
