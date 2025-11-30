import Link from "./Link";
import styles from "./SpecGrid.module.css";

interface Props {
  items: Array<{
    name: string;
    url: string;
  }>;
}

export default function SpecGrid({ items }: Props) {
  return (
    <div className={styles.grid}>
      {items.map(item => (
        <Link
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.tag}
        >
          {item.name}
        </Link>
      ))}
    </div>
  );
}
