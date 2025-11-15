import styles from "./Highlight.module.css";

interface Props {
  children: React.ReactNode;
}

export default function Highlight({ children }: Props) {
  return <span className={styles.highlight}>{children}</span>;
}
