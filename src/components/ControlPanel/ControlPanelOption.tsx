import { cva } from "class-variance-authority";
import "./ControlPanelOption.css";

const variants = cva("ControlPanelOption", {
  variants: {
    active: {
      true: "ControlPanelOption--active"
    },
    disabled: {
      true: "ControlPanelOption--disabled"
    }
  }
});

interface ControlPanelOptionProps {
  /** Click handler - required for interactive option */
  onClick: () => void;
  /** Whether this option is currently selected */
  isActive?: boolean;
  /** Whether the option is disabled */
  disabled?: boolean;
  /** Accessible label for the button */
  ariaLabel: string;
  /** Content to render inside the option */
  children: React.ReactNode;
}

/**
 * ControlPanelOption - Interactive button cell for the options column.
 * Always renders as a button with dashed border and hover states.
 */
export function ControlPanelOption({
  onClick,
  isActive,
  disabled,
  ariaLabel,
  children
}: ControlPanelOptionProps) {
  return (
    <button
      type="button"
      className={variants({ active: isActive, disabled })}
      onClick={onClick}
      disabled={disabled ?? false}
      aria-label={ariaLabel}
      aria-pressed={isActive ?? undefined}
    >
      {children}
    </button>
  );
}
