import type { ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("CvSection", {
  variants: {
    breakInside: {
      auto: "",
      avoid: "CvSection--avoid-break"
    }
  },
  defaultVariants: {
    breakInside: "avoid"
  }
});

interface Props extends VariantProps<typeof variants> {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function CvSection({ title, children, className, breakInside }: Props) {
  return (
    <section className={variants({ breakInside, className })}>
      {title && <h2 className="CvSection__title">{title}</h2>}
      {children}
    </section>
  );
}
