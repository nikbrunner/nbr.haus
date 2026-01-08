import { cx } from "class-variance-authority";

interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function Note({ children, className }: Props) {
  return <p className={cx("Note", className)}>{children}</p>;
}
