import { cx } from "class-variance-authority";
import "./ControlPanelIndicator.css";

interface ControlPanelIndicatorProps {
  /** Whether the indicator is visually disabled (grayed out) */
  disabled?: boolean;
  /** Content to render inside the indicator */
  children: React.ReactNode;
}

/**
 * ControlPanelIndicator - Display-only cell for the indicator column.
 * Always renders as a div, shows current value without interactivity.
 */
export function ControlPanelIndicator({
  disabled,
  children
}: ControlPanelIndicatorProps) {
  return (
    <div
      className={cx(
        "ControlPanelIndicator",
        disabled && "ControlPanelIndicator--disabled"
      )}
    >
      {children}
    </div>
  );
}
