import Link from "./Link";

interface Props {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export default function SpecGrid({ items }: Props) {
  return (
    <div className="SpecGrid">
      {items.map(item => (
        <Link
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="SpecGrid__tag"
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
