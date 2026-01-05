import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const h2Variants = cva("Typo-H2", {
  variants: {
    color: colorVariants,
    medium: mediumVariants,
    decorated: {
      true: "Typo-H2--decorated",
      false: ""
    }
  },
  defaultVariants: {
    color: "accent",
    medium: "web",
    decorated: true
  }
});

type Props = Omit<React.ComponentProps<"h2">, "color"> &
  VariantProps<typeof h2Variants>;

export function H2({
  children,
  className,
  color,
  medium,
  decorated,
  ...props
}: Props) {
  return (
    <h2
      className={cx(h2Variants({ color, medium, decorated }), className)}
      {...props}
    >
      {children}
    </h2>
  );
}
