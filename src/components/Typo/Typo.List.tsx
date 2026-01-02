import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const listVariants = cva("Typo-List", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

type UlProps = Omit<React.ComponentProps<"ul">, "color"> &
  VariantProps<typeof listVariants>;

type OlProps = Omit<React.ComponentProps<"ol">, "color"> &
  VariantProps<typeof listVariants>;

export function UnorderedList({ children, className, color, ...props }: UlProps) {
  return (
    <ul
      className={cx(listVariants({ color }), "Typo-List--unordered", className)}
      {...props}
    >
      {children}
    </ul>
  );
}

export function OrderedList({ children, className, color, ...props }: OlProps) {
  return (
    <ol
      className={cx(listVariants({ color }), "Typo-List--ordered", className)}
      {...props}
    >
      {children}
    </ol>
  );
}
