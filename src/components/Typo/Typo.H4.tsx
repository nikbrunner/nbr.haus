import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const h4Variants = cva("Typo-H4", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "main",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"h4">, "color"> &
  VariantProps<typeof h4Variants>;

export function H4({ children, className, color, medium, ...props }: Props) {
  return (
    <h4 className={cx(h4Variants({ color, medium }), className)} {...props}>
      {children}
    </h4>
  );
}
