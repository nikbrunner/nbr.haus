import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const highlightVariants = cva("Typo-Highlight", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "accentAlt"
  }
});

type Props = Omit<React.ComponentProps<"span">, "color"> &
  VariantProps<typeof highlightVariants>;

export function Highlight({ children, className, color, ...props }: Props) {
  return (
    <span className={cx(highlightVariants({ color }), className)} {...props}>
      {children}
    </span>
  );
}
