import type { CSSProperties } from "react";

import { cx } from "class-variance-authority";

interface Props {
  /** Text to display in the hint */
  text: string;
  /** Whether the hint is visible */
  isVisible: boolean;
  /** Position style (top, right, bottom, left) - controlled by parent */
  style?: CSSProperties;
}

/**
 * ControlPanelPrintHint - Floating hint that draws attention to the print button.
 * Position is controlled by the parent via the style prop.
 */
export function ControlPanelPrintHint({ text, isVisible, style }: Props) {
  if (!isVisible) return null;

  return (
    <div className={cx("ControlPanelPrintHint")} style={style}>
      <span>{text}</span>
    </div>
  );
}
