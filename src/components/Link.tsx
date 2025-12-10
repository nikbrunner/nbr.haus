import { cx } from "class-variance-authority";

type Props = React.ComponentProps<"a">;

export default function Link(props: Props) {
  return (
    <a {...props} className={cx("Link", props.className)}>
      {props.children}
    </a>
  );
}
