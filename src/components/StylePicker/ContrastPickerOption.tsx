import { cx } from "class-variance-authority";
import "./ContrastPickerOption.css";

interface ContrastPickerOptionProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ContrastPickerOption({
  label,
  isActive = false,
  onClick,
  ariaLabel
}: ContrastPickerOptionProps) {
  const className = cx(
    "ContrastPickerOption",
    isActive && "ContrastPickerOption--active"
  );

  // Render as div when used as indicator (no onClick), button when interactive
  if (!onClick) {
    return <div className={className}>{label}</div>;
  }

  return (
    <button
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    >
      {label}
    </button>
  );
}
