import type { CSSProperties } from "react";

import { cx } from "class-variance-authority";
import { createPortal } from "react-dom";

interface Props {
  /** Text to display in the hint */
  text: string;
  /** Whether the hint is visible */
  isVisible: boolean;
  /** Position style (top, right, bottom, left) - viewport coordinates for fixed positioning */
  style?: CSSProperties;
}

/**
 * ControlPanelPrintHint - Floating hint that draws attention to the print button.
 * Rendered via Portal to avoid inheriting parent's filter effects.
 * Uses fixed positioning with viewport-relative coordinates.
 */
export function ControlPanelPrintHint({ text, isVisible, style }: Props) {
  if (!isVisible) return null;

  const content = (
    <div className={cx("ControlPanelPrintHint")} style={style}>
      <span>{text}</span>
      <svg
        className="ControlPanelPrintHint__arrow"
        viewBox="0 0 20 100"
        preserveAspectRatio="none"
      >
        <path d="M 0,0 L 20,50 L 0,100" fill="var(--fg-accent)" />
      </svg>
    </div>
  );

  return createPortal(content, document.body);
}
