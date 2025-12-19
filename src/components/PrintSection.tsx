import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("PrintSection", {
  variants: {
    breakInside: {
      auto: "",
      avoid: "PrintSection--avoid-break"
    }
  },
  defaultVariants: {
    breakInside: "avoid"
  }
});

type PrintSectionProps = {
  children: ReactNode;
  className?: string;
} & VariantProps<typeof variants>;

/**
 * PrintSection - A section wrapper with print-aware page break control.
 * Use breakInside="avoid" (default) to keep content together on a page.
 * Use breakInside="auto" to allow content to break across pages.
 */
export function PrintSection({
  children,
  className,
  breakInside
}: PrintSectionProps) {
  return (
    <section className={variants({ breakInside, className })}>{children}</section>
  );
}
