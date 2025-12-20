import { cva, type VariantProps } from "class-variance-authority";

const variants = cva("SpecList", {
  variants: {
    padding: {
      none: "",
      small: "SpecList-padding--small"
    }
  },
  defaultVariants: {
    padding: "none"
  }
});

type Props = {
  items: Array<{
    label: React.ReactNode;
    value: React.ReactNode;
  }>;
  className?: string;
  gridTemplateColumns?: React.CSSProperties["gridTemplateColumns"];
} & VariantProps<typeof variants>;

export default function SpecList({
  items,
  className,
  padding,
  gridTemplateColumns = "25cqw 1fr"
}: Props) {
  if (items.length === 0) return null;

  return (
    <div className={variants({ padding, className })}>
      {items.map((item, index) => (
        <div key={index} className="SpecList__item" style={{ gridTemplateColumns }}>
          <p className="SpecList__label">{item.label}</p>
          <p className="SpecList__value">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
