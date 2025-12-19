import { cva, type VariantProps } from "class-variance-authority";
import "./PickerCell.css";

const variants = cva("PickerCell", {
  variants: {
    interactive: {
      true: "PickerCell--interactive",
      false: ""
    },
    isActive: {
      true: "PickerCell--active",
      false: ""
    },
    disabled: {
      true: "PickerCell--disabled",
      false: ""
    }
  },
  defaultVariants: {
    interactive: false,
    isActive: false,
    disabled: false
  }
});

type PickerCellProps = {
  /** Click handler - if provided, renders as button */
  onClick?: () => void;
  /** Accessible label for the button */
  ariaLabel?: string;
  /** Content to render inside the cell */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
} & VariantProps<typeof variants>;

/**
 * PickerCell - A shared dumb component for picker options and indicators.
 * Renders as a button when onClick is provided, otherwise as a div.
 * Used in both ControlPanelStrip (indicators) and ControlPanelExpanded (options).
 */
export function PickerCell({
  isActive,
  disabled,
  onClick,
  ariaLabel,
  children,
  className
}: PickerCellProps) {
  const cellClass = variants({
    interactive: !!onClick,
    isActive,
    disabled,
    className
  });

  if (onClick) {
    return (
      <button
        type="button"
        className={cellClass}
        onClick={onClick}
        disabled={disabled ?? false}
        aria-label={ariaLabel}
        aria-pressed={isActive ?? undefined}
      >
        {children}
      </button>
    );
  }

  return <div className={cellClass}>{children}</div>;
}

interface ColorDotProps {
  hue: number;
  className?: string;
}

/**
 * ColorDot - A colored dot for accent color display.
 */
export function ColorDot({ hue, className }: ColorDotProps) {
  return (
    <span
      className={variants({
        className: `PickerCell__color-dot ${className ?? ""}`
      })}
      style={{ backgroundColor: `oklch(45% 0.35 ${hue})` }}
    />
  );
}

interface RotatedTextProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * RotatedText - Text rotated 90° for long paths in collapsed strip.
 */
export function RotatedText({ children, className }: RotatedTextProps) {
  return (
    <span className={`PickerCell__rotated-text ${className ?? ""}`}>{children}</span>
  );
}
