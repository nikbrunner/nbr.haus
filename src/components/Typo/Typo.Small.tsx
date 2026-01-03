import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const smallVariants = cva("Typo-Small", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "minor"
  }
});

type Props = Omit<React.ComponentProps<"small">, "color"> &
  VariantProps<typeof smallVariants>;

export function Small({ children, className, color, ...props }: Props) {
  return (
    <small className={cx(smallVariants({ color }), className)} {...props}>
      {children}
    </small>
  );
}
