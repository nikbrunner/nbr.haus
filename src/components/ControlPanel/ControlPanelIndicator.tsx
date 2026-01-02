import { cva } from "class-variance-authority";

const variants = cva("ControlPanelIndicator", {
  variants: {
    disabled: {
      true: "ControlPanelIndicator--disabled"
    },
    rotated: {
      true: "ControlPanelIndicator--rotated"
    }
  }
});

interface Props {
  /** Whether the indicator is visually disabled (grayed out) */
  disabled?: boolean;
  /** Rotate text vertically (for path display) */
  rotated?: boolean;
  /** Content to render inside the indicator */
  children: React.ReactNode;
}

/**
 * ControlPanelIndicator - Display-only cell for the indicator column.
 * Always renders as a div, shows current value without interactivity.
 */
export function ControlPanelIndicator({ disabled, rotated, children }: Props) {
  return <div className={variants({ disabled, rotated })}>{children}</div>;
}
