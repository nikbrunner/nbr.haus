import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "./Typo.colors";

import "./Typo.P.css";

export const pVariants = cva("Typo-P", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

interface Props
  extends Omit<React.ComponentProps<"p">, "color">,
    VariantProps<typeof pVariants> {}

export function P({ children, className, color, ...props }: Props) {
  return (
    <p className={cx(pVariants({ color }), className)} {...props}>
      {children}
    </p>
  );
}
