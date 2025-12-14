import { cx } from "class-variance-authority";
import "./AccentPickerOption.css";

interface AccentPickerOptionProps {
  color: string;
  isActive?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

export default function AccentPickerOption({
  color,
  isActive = false,
  onClick,
  ariaLabel
}: AccentPickerOptionProps) {
  const className = cx(
    "AccentPickerOption",
    isActive && "AccentPickerOption--active"
  );
  const style = { backgroundColor: color };

  // Render as div when used as indicator (no onClick), button when interactive
  if (!onClick) {
    return <div className={className} style={style} />;
  }

  return (
    <button
      className={className}
      style={style}
      onClick={onClick}
      aria-label={ariaLabel}
      type="button"
    />
  );
}
