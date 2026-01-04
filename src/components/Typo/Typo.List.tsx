import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { variantVariants } from "@/components/Typo/Typo.variants";

export const listVariants = cva("Typo-List", {
  variants: {
    color: colorVariants,
    variant: variantVariants
  },
  defaultVariants: {
    color: "main",
    variant: "default"
  }
});

type UlProps = Omit<React.ComponentProps<"ul">, "color"> &
  VariantProps<typeof listVariants>;

type OlProps = Omit<React.ComponentProps<"ol">, "color"> &
  VariantProps<typeof listVariants>;

export function UnorderedList({
  children,
  className,
  color,
  variant,
  ...props
}: UlProps) {
  return (
    <ul
      className={cx(
        listVariants({ color, variant }),
        "Typo-List--unordered",
        className
      )}
      {...props}
    >
      {children}
    </ul>
  );
}

export function OrderedList({
  children,
  className,
  color,
  variant,
  ...props
}: OlProps) {
  return (
    <ol
      className={cx(
        listVariants({ color, variant }),
        "Typo-List--ordered",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}
