import { cx } from "class-variance-authority";

interface Props {
  items: Array<{
    label: React.ReactNode;
    value: React.ReactNode;
  }>;
  className?: string;
}

export default function SpecList({ items, className }: Props) {
  if (items.length === 0) return null;

  return (
    <div className={cx("SpecList", className)}>
      {items.map((item, index) => (
        <div key={index} className="SpecList__item">
          <span className="SpecList__label">{item.label}</span>
          <span className="SpecList__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
