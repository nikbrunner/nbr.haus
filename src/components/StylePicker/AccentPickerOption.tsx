import { cva, cx, type VariantProps } from "class-variance-authority";
import "./AccentPickerOption.css";

const variants = cva("AccentPickerOption", {
  variants: {
    variant: {
      default: "AccentPickerOption--default",
      active: "AccentPickerOption--active"
    }
  },
  defaultVariants: {
    variant: "default"
  }
});

interface Props extends VariantProps<typeof variants> {
  color: string;
  onClick: () => void;
  ariaLabel?: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export default function AccentPickerOption({
  color,
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
        className="AccentPickerOption__button"
        style={{ backgroundColor: color }}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
      />
    </div>
  );
}
