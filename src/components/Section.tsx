import { cx } from "class-variance-authority";

interface Props {
  /** Explicit ID override (falls back to title-derived ID) */
  id?: string;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ id, title, children, className }: Props) {
  const derivedId = title?.toLowerCase().replace(/\s+/g, "-");
  const sectionId = id ?? derivedId;

  return (
    <section id={sectionId} className={cx("Section", className)}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
