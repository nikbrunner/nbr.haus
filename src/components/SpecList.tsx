interface ListProps {
  children: React.ReactNode;
}

export function SpecList({ children }: ListProps) {
  return <dl className="SpecList">{children}</dl>;
}

interface ItemProps {
  label: string;
  hideInPrint?: boolean;
  children: React.ReactNode;
}

export function SpecItem({ label, hideInPrint = false, children }: ItemProps) {
  return (
    <div
      className={
        hideInPrint ? "SpecList__item SpecList__item--screen-only" : "SpecList__item"
      }
    >
      <dt className="SpecList__label">{label}</dt>
      <dd className="SpecList__value">{children}</dd>
    </div>
  );
}
