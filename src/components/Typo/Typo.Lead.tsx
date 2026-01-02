import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const leadVariants = cva("Typo-Lead", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "support"
  }
});

type Props = Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof leadVariants>;

export function Lead({ children, className, color, ...props }: Props) {
  return (
    <p className={cx(leadVariants({ color }), className)} {...props}>
      {children}
    </p>
  );
}
