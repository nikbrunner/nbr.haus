import styles from "./SpecCard.module.css";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function SpecCard({ title, children, className }: Props) {
  return (
    <article className={`${styles.card} ${className || ""}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {children}
    </article>
  );
}
