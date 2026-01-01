import { cva, cx, type VariantProps } from "class-variance-authority";

import type { ComponentProps } from "@/types/component";
import { resolveGap, type GapValue } from "@/types/spacing";

import "src/components/Flex.css";

const flexVariants = cva("Flex", {
  variants: {
    inline: {
      true: "Flex--inline"
    },
    direction: {
      "row": "Flex--row",
      "row-reverse": "Flex--row-reverse",
      "column": "Flex--column",
      "column-reverse": "Flex--column-reverse"
    },
    wrap: {
      "wrap": "Flex--wrap",
      "nowrap": "Flex--nowrap",
      "wrap-reverse": "Flex--wrap-reverse"
    },
    justify: {
      start: "Flex--justify-start",
      end: "Flex--justify-end",
      center: "Flex--justify-center",
      between: "Flex--justify-between",
      around: "Flex--justify-around",
      evenly: "Flex--justify-evenly"
    },
    align: {
      start: "Flex--align-start",
      end: "Flex--align-end",
      center: "Flex--align-center",
      baseline: "Flex--align-baseline",
      stretch: "Flex--align-stretch"
    }
  },
  defaultVariants: {
    direction: "row",
    wrap: "nowrap",
    justify: "start",
    align: "stretch"
  }
});

interface Props
  extends ComponentProps,
    Omit<VariantProps<typeof flexVariants>, "inline"> {
  children: React.ReactNode;

  /** Use inline-flex instead of flex. Default: false */
  inline?: boolean;

  /** Gap between items using Open Props size scale */
  gap?: GapValue;

  /** HTML element to render as. Default: "div" */
  as?: React.ElementType;
}

export default function Flex({
  children,
  inline = false,
  direction,
  wrap,
  justify,
  align,
  gap,
  className,
  as: Component = "div"
}: Props) {
  const style = gap
    ? ({ "--flex-gap": resolveGap(gap) } as React.CSSProperties)
    : undefined;

  return (
    <Component
      className={cx(
        flexVariants({
          inline: inline || undefined,
          direction,
          wrap,
          justify,
          align
        }),
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
