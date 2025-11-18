import { Github, Linkedin, Mail } from "lucide-react";
import Link from "../../components/Link";
import styles from "./Connect.module.css";

export default function Connect() {
  return (
    <div className={styles.connect}>
      <Link
        href="https://www.github.com/nikbrunner"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <Github />
      </Link>
      <Link href="mailto:nbr.haus.persuader046@passmail.com" aria-label="Email">
        <Mail />
      </Link>
      <Link
        href="https://www.linkedin.com/in/nbru/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <Linkedin />
      </Link>
    </div>
  );
}
