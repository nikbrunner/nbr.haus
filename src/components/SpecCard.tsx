import { cx } from "class-variance-authority";

import { Typo } from "@/components/Typo";

interface Props {
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export default function SpecCard({
  title,
  description,
  children,
  className
}: Props) {
  return (
    <article className={cx("SpecCard", className)}>
      {title && <Typo.H3 className="SpecCard__title">{title}</Typo.H3>}
      {description && <div className="SpecCard__description">{description}</div>}
      {children}
    </article>
  );
}
