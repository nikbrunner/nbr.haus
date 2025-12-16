import { cx } from "class-variance-authority";
import "./PickerCell.css";

interface PickerCellProps {
  /** Whether the cell is in active state (selected) */
  isActive?: boolean;
  /** Click handler - if provided, renders as button */
  onClick?: () => void;
  /** Accessible label for the button */
  ariaLabel?: string;
  /** Content to render inside the cell */
  children: React.ReactNode;
  /** Additional CSS class */
  className?: string;
}

/**
 * PickerCell - A shared dumb component for picker options and indicators.
 * Renders as a button when onClick is provided, otherwise as a div.
 * Used in both ControlPanelStrip (indicators) and ControlPanelExpanded (options).
 */
export function PickerCell({
  isActive,
  onClick,
  ariaLabel,
  children,
  className
}: PickerCellProps) {
  const cellClass = cx(
    "PickerCell",
    onClick && "PickerCell--interactive",
    isActive && "PickerCell--active",
    className
  );

  if (onClick) {
    return (
      <button
        type="button"
        className={cellClass}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-pressed={isActive}
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
      className={cx("PickerCell__color-dot", className)}
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
    <span className={cx("PickerCell__rotated-text", className)}>{children}</span>
  );
}
