import styles from "./Section.module.css";

interface SectionProps {
  title?: string;
  children: React.ReactNode;
}

export default function Section({ title, children }: SectionProps) {
  const id = title?.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id={id} className={styles.section}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
