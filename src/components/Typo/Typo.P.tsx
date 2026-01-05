import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const pVariants = cva("Typo-P", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "main",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof pVariants>;

export function P({ children, className, color, medium, ...props }: Props) {
  return (
    <p className={cx(pVariants({ color, medium }), className)} {...props}>
      {children}
    </p>
  );
}
