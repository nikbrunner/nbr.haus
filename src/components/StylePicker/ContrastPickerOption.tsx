import { cva, cx, type VariantProps } from "class-variance-authority";
import "./ContrastPickerOption.css";

const variants = cva("ContrastPickerOption", {
  variants: {
    variant: {
      default: "ContrastPickerOption--default",
      active: "ContrastPickerOption--active"
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
}

export default function ContrastPickerOption({
  label,
  onClick,
  ariaLabel,
  variant
}: Props) {
  return (
    <div className={cx(variants({ variant }))}>
      <button
        className="ContrastPickerOption__button"
        onClick={onClick}
        aria-label={ariaLabel}
        type="button"
      >
        {label}
      </button>
    </div>
  );
}
