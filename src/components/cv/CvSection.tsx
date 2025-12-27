import type { ReactNode } from "react";

interface Props {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function CvSection({ title, children, className }: Props) {
  return (
    <section className={className}>
      {title && <h2 className="CvSection__title">{title}</h2>}
      {children}
    </section>
  );
}
