import styles from "./SpecList.module.css";

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
    <div className={`${styles.list} ${className || ""}`}>
      {items.map((item, index) => (
        <div key={index} className={styles.item}>
          <span className={styles.label}>{item.label}</span>
          <span className={styles.value}>{item.value}</span>
        </div>
      ))}
    </div>
  );
}
