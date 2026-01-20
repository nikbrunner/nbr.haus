import { cx } from "class-variance-authority";

import { shadowVariants, type ShadowVariants } from "@/components/Shadow";
import { Typo } from "@/components/Typo";

type Props = {
  title?: string;
  description?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
} & ShadowVariants;

export default function SpecCard({
  title,
  description,
  children,
  className,
  shadow = "hatched-sm"
}: Props) {
  return (
    <article className={cx("SpecCard", shadowVariants({ shadow }), className)}>
      {title && <Typo.H3 className="SpecCard__title">{title}</Typo.H3>}
      {description && <div className="SpecCard__description">{description}</div>}
      {children}
    </article>
  );
}
