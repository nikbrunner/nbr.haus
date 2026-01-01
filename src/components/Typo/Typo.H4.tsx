import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const h4Variants = cva("Typo-H4", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

type Props = Omit<React.ComponentProps<"h4">, "color"> &
  VariantProps<typeof h4Variants>;

export function H4({ children, className, color, ...props }: Props) {
  return (
    <h4 className={cx(h4Variants({ color }), className)} {...props}>
      {children}
    </h4>
  );
}
