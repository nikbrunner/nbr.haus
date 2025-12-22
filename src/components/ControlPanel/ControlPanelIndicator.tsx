import { cva } from "class-variance-authority";
import "./ControlPanelIndicator.css";

const variants = cva("ControlPanelIndicator", {
  variants: {
    disabled: {
      true: "ControlPanelIndicator--disabled"
    }
  }
});

interface Props {
  /** Whether the indicator is visually disabled (grayed out) */
  disabled?: boolean;
  /** Content to render inside the indicator */
  children: React.ReactNode;
}

/**
 * ControlPanelIndicator - Display-only cell for the indicator column.
 * Always renders as a div, shows current value without interactivity.
 */
export function ControlPanelIndicator({ disabled, children }: Props) {
  return <div className={variants({ disabled })}>{children}</div>;
}
