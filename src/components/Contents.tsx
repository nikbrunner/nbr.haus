interface ContentsItem {
  key: string;
  marker: string;
  label: React.ReactNode;
  current?: boolean;
  children?: ContentsItem[];
}

function ContentsList({ items }: { items: ContentsItem[] }) {
  return (
    <ul className="Contents__list">
      {items.map(item => (
        <li
          key={item.key}
          className={
            item.current
              ? "Contents__item Contents__item--current"
              : "Contents__item"
          }
          aria-current={item.current ? "location" : undefined}
        >
          <span className="Contents__row">
            <span className="Contents__marker">{item.marker}</span>
            <span className="Contents__label">{item.label}</span>
          </span>
          {item.children && <ContentsList items={item.children} />}
        </li>
      ))}
    </ul>
  );
}

interface Props {
  label: string;
  items: ContentsItem[];
}

export default function Contents({ label, items }: Props) {
  return (
    <nav className="Contents" aria-label={label}>
      <p className="Contents__heading">{label}</p>
      <ContentsList items={items} />
    </nav>
  );
}
