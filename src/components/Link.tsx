import { Link as TsLink } from "@tanstack/react-router";
import { cx } from "class-variance-authority";

type Props = React.ComponentProps<typeof TsLink>;

export default function Link(props: Props) {
  return (
    <TsLink {...props} className={cx("Link", props.className)}>
      {props.children}
    </TsLink>
  );
}
