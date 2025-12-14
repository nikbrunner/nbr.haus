import { cx } from "class-variance-authority";
import "./ColorModePickerOption.css";

interface ColorModePickerOptionProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function ColorModePickerOption({
  label,
  isActive = false,
  onClick,
  ariaLabel
}: ColorModePickerOptionProps) {
  const className = cx(
    "ColorModePickerOption",
    isActive && "ColorModePickerOption--active"
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
