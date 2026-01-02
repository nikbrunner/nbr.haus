import { cva, cx, type VariantProps } from "class-variance-authority";

import { colorVariants } from "@/components/Typo/Typo.colors";

export const inlineCodeVariants = cva("Typo-InlineCode", {
  variants: {
    color: colorVariants
  },
  defaultVariants: {
    color: "main"
  }
});

type Props = Omit<React.ComponentProps<"code">, "color"> &
  VariantProps<typeof inlineCodeVariants>;

export function InlineCode({ children, className, color, ...props }: Props) {
  return (
    <code className={cx(inlineCodeVariants({ color }), className)} {...props}>
      {children}
    </code>
  );
}
