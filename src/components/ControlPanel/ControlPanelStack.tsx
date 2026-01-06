import type { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  /** Enable vertical scrolling with hidden scrollbar */
  scroll?: boolean;
  /** Maximum height (enables scroll when exceeded) */
  maxHeight?: string;
}

/**
 * ControlPanelStack - Vertical flex container for stacking elements.
 * Self-contained layout component with optional scrolling.
 */
export function ControlPanelStack({ children, scroll, maxHeight }: Props) {
  const className = scroll
    ? "ControlPanelStack ControlPanelStack--scroll"
    : "ControlPanelStack";

  const style: CSSProperties | undefined = maxHeight ? { maxHeight } : undefined;

  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
