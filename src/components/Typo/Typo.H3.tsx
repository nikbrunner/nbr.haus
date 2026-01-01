import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "./Typo.colors";

import "./Typo.H3.css";

export const h3Variants = cva("Typo-H3", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

interface Props
  extends Omit<React.ComponentProps<"h3">, "color">,
    VariantProps<typeof h3Variants> {}

export function H3({ children, className, color, ...props }: Props) {
  return (
    <h3 className={cx(h3Variants({ color }), className)} {...props}>
      {children}
    </h3>
  );
}
