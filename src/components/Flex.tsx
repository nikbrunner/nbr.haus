import { cx } from "class-variance-authority";

import type { ComponentProps } from "@/types/component";
import { resolveGap, type GapValue } from "@/types/spacing";

interface Props extends ComponentProps {
  children: React.ReactNode;

  /** Use inline-flex instead of flex. Default: false */
  inline?: boolean;

  /** Flex direction. Default: "row" */
  direction?: "row" | "row-reverse" | "column" | "column-reverse";

  /** Flex wrap. Default: "nowrap" */
  wrap?: "wrap" | "nowrap" | "wrap-reverse";

  /** Justify content. Default: "start" */
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";

  /** Align items. Default: "stretch" */
  align?: "start" | "end" | "center" | "baseline" | "stretch";

  /** Gap between items using Open Props size scale */
  gap?: GapValue;

  /** HTML element to render as. Default: "div" */
  as?: React.ElementType;
}

const justifyMap: Record<NonNullable<Props["justify"]>, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  between: "space-between",
  around: "space-around",
  evenly: "space-evenly"
};

const alignMap: Record<NonNullable<Props["align"]>, string> = {
  start: "flex-start",
  end: "flex-end",
  center: "center",
  baseline: "baseline",
  stretch: "stretch"
};

export default function Flex({
  children,
  inline = false,
  direction = "row",
  wrap = "nowrap",
  justify = "start",
  align = "stretch",
  gap,
  className,
  as: Component = "div"
}: Props) {
  const style: React.CSSProperties = {
    display: inline ? "inline-flex" : "flex",
    flexDirection: direction,
    flexWrap: wrap,
    justifyContent: justifyMap[justify],
    alignItems: alignMap[align],
    gap: gap ? resolveGap(gap) : undefined
  };

  return (
    <Component className={cx("Flex", className)} style={style}>
      {children}
    </Component>
  );
}
