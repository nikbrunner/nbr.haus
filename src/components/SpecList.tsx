import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("SpecList", {
  variants: {
    padding: {
      none: "",
      small: "SpecList-padding--small"
    },
    background: {
      default: "SpecList--bg-default",
      transparent: "SpecList--bg-transparent"
    }
  },
  defaultVariants: {
    padding: "none",
    background: "default"
  }
});

interface Props extends VariantProps<typeof variants> {
  items: Array<{
    label: React.ReactNode;
    value: React.ReactNode;
  }>;
  className?: string;
  gridTemplateColumns?: React.CSSProperties["gridTemplateColumns"];
}

export default function SpecList({
  items,
  className,
  padding,
  background,
  gridTemplateColumns = "25cqw 1fr"
}: Props) {
  if (items.length === 0) return null;

  return (
    <div className={variants({ padding, background, className })}>
      {items.map((item, index) => (
        <div key={index} className="SpecList__item" style={{ gridTemplateColumns }}>
          <span className="SpecList__label">{item.label}</span>
          <span className="SpecList__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
