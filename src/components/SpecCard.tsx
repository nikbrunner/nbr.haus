import styles from "./SpecCard.module.css";

interface Props {
  title?: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export default function SpecCard({
  title,
  description,
  children,
  className
}: Props) {
  return (
    <article className={`${styles.card} ${className || ""}`}>
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <div className={styles.description}>{description}</div>}
      {children}
    </article>
  );
}
