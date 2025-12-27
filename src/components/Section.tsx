import { cx } from "class-variance-authority";

interface Props {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Section({ title, children, className }: Props) {
  const id = title?.toLowerCase().replace(/\s+/g, "-");

  return (
    <section id={id} className={cx("Section", className)}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
}
