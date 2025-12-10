import { cx } from "class-variance-authority";

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
    <article className={cx("spec-card", className)}>
      {title && <h3 className="spec-card__title">{title}</h3>}
      {description && <div className="spec-card__description">{description}</div>}
      {children}
    </article>
  );
}
