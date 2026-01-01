import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "./Typo.colors";

import "./Typo.H1.css";

export const h1Variants = cva("Typo-H1", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

interface Props
  extends Omit<React.ComponentProps<"h1">, "color">,
    VariantProps<typeof h1Variants> {}

export function H1({ children, className, color, ...props }: Props) {
  return (
    <h1 className={cx(h1Variants({ color }), className)} {...props}>
      {children}
    </h1>
  );
}
