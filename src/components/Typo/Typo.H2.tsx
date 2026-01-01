import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "./Typo.colors";

import "./Typo.H2.css";

export const h2Variants = cva("Typo-H2", {
  variants: {
    color: colorVariants,
    variant: {
      default: "",
      decorated: "Typo-H2--decorated"
    }
  },
  defaultVariants: {
    color: "accent",
    variant: "decorated"
  }
});

interface Props
  extends Omit<React.ComponentProps<"h2">, "color">,
    VariantProps<typeof h2Variants> {}

export function H2({ children, className, color, variant, ...props }: Props) {
  return (
    <h2 className={cx(h2Variants({ color, variant }), className)} {...props}>
      {children}
    </h2>
  );
}
