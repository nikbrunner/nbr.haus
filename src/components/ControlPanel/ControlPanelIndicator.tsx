import { cva } from "class-variance-authority";

const variants = cva("ControlPanelIndicator", {
  variants: {
    disabled: {
      true: "ControlPanelIndicator--disabled"
    },
    multiline: {
      true: "ControlPanelIndicator--multiline"
    }
  }
});

interface Props {
  /** Whether the indicator is visually disabled (grayed out) */
  disabled?: boolean;
  /** Allow content to wrap vertically (for paths with multiple segments) */
  multiline?: boolean;
  /** Content to render inside the indicator */
  children: React.ReactNode;
}

/**
 * ControlPanelIndicator - Display-only cell for the indicator column.
 * Always renders as a div, shows current value without interactivity.
 */
export function ControlPanelIndicator({ disabled, multiline, children }: Props) {
  return <div className={variants({ disabled, multiline })}>{children}</div>;
}
