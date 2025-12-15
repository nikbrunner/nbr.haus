import { cva, cx, type VariantProps } from "class-variance-authority";
import "./ColorModePickerOption.css";

const variants = cva("ColorModePickerOption", {
  variants: {
    variant: {
      default: "ColorModePickerOption--default",
      active: "ColorModePickerOption--active"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface Props extends VariantProps<typeof variants> {
  label: string;
  onClick: () => void;
  ariaLabel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function ColorModePickerOption({
  label,
  onClick,
  ariaLabel,
  variant,
  onMouseEnter,
  onMouseLeave
}: Props) {
  return (
    <div
      className={cx(variants({ variant }))}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        className="ColorModePickerOption__button"
        onClick={onClick}
        aria-label={ariaLabel}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
