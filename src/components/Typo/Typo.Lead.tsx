import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const leadVariants = cva("Typo-Lead", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "support",
    medium: "web"
  }
});

type Props = Omit<React.ComponentProps<"p">, "color"> &
  VariantProps<typeof leadVariants>;

export function Lead({ children, className, color, medium, ...props }: Props) {
  return (
    <p className={cx(leadVariants({ color, medium }), className)} {...props}>
      {children}
    </p>
  );
}
