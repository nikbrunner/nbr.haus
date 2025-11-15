import styles from "./Link.module.css";

interface LinkProps {
  href: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Link({
  href,
  target,
  rel,
  style,
  children,
}: LinkProps) {
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
