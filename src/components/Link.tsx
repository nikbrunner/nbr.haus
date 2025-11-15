import styles from "./Link.module.css";

interface Props {
  href: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Link({ href, target, rel, style, children }: Props) {
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      style={style}
      className={styles.link}
    >
      {children}
    </a>
  );
}
