import styles from "./Link.module.css";

type Props = React.ComponentProps<"a">;

export default function Link(props: Props) {
  return (
    <a {...props} className={`${styles.link} ${props.className || ""}`}>
      {props.children}
    </a>
  );
}
