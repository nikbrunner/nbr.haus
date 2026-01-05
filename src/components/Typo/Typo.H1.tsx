import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const h1Variants = cva("Typo-H1", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "main",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"h1">, "color"> &
  VariantProps<typeof h1Variants>;

export function H1({ children, className, color, medium, ...props }: Props) {
  return (
    <h1 className={cx(h1Variants({ color, medium }), className)} {...props}>
      {children}
    </h1>
  );
}
