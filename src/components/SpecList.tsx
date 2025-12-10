import { cx } from "class-variance-authority";
import "./SpecList.css";

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
    <div className={cx("spec-list", className)}>
      {items.map((item, index) => (
        <div key={index} className="spec-list__item">
          <span className="spec-list__label">{item.label}</span>
          <span className="spec-list__value">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
