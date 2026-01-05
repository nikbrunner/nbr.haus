import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";
import { mediumVariants } from "@/components/Typo/Typo.variants";

export const listVariants = cva("Typo-List", {
  variants: {
    color: colorVariants,
    medium: mediumVariants
  },
  defaultVariants: {
    color: "main",
    medium: "web"
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
  medium,
  ...props
}: UlProps) {
  return (
    <ul
      className={cx(
        listVariants({ color, medium }),
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
  medium,
  ...props
}: OlProps) {
  return (
    <ol
      className={cx(
        listVariants({ color, medium }),
        "Typo-List--ordered",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  );
}
