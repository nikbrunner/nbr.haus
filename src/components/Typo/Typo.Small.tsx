import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const smallVariants = cva("Typo-Small", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "minor",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"small">, "color"> &
  VariantProps<typeof smallVariants>;

export function Small({ children, className, color, medium, ...props }: Props) {
  return (
    <small className={cx(smallVariants({ color, medium }), className)} {...props}>
      {children}
    </small>
  );
}
