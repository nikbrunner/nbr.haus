import type { MouseEvent } from "react";

import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("ControlPanelOption", {
  variants: {
    active: {
      true: "ControlPanelOption--active"
    },
    disabled: {
      true: "ControlPanelOption--disabled"
    },
    width: {
      default: "",
      auto: "ControlPanelOption--width-auto",
      full: "ControlPanelOption--width-full"
    },
    align: {
      center: "",
      left: "ControlPanelOption--align-left"
    }
  },
  defaultVariants: {
    width: "default",
    align: "center"
  }
});

interface ControlPanelOptionProps extends VariantProps<typeof variants> {
  /** Click handler - required for interactive option */
  onClick: () => void;
  /** Whether this option is currently selected */
  isActive?: boolean;
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
  width,
  align,
  ariaLabel,
  children
}: ControlPanelOptionProps) {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClick();
  };

  return (
    <button
      type="button"
      className={variants({ active: isActive, disabled, width, align })}
      onClick={handleClick}
      disabled={disabled ?? false}
      aria-label={ariaLabel}
      aria-pressed={isActive ?? undefined}
    >
      {children}
    </button>
  );
}
