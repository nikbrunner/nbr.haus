import Link from "../../components/Link";
import styles from "./Connect.module.css";

export default function Connect() {
  return (
    <section className={styles.connect}>
      <h3 className={styles.title}>Connect</h3>
      <div className={styles.list}>
        <div className={styles.item}>
          <span className={styles.label}>GitHub:</span>
          <span className={styles.value}>
            <Link
              href="https://www.github.com/nikbrunner"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              nikbrunner
            </Link>
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>Email:</span>
          <span className={styles.value}>
            <Link
              href="mailto:nbr.haus.persuader046@passmail.com"
              className={styles.link}
            >
              nbr.haus.persuader046@passmail.com
            </Link>
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>LinkedIn:</span>
          <span className={styles.value}>
            <Link
              href="https://www.linkedin.com/in/nbru/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              nbru
            </Link>
          </span>
        </div>
        <div className={styles.item}>
          <span className={styles.label}>CV:</span>
          <span className={styles.value}>
            <Link
              href="/Nikolaus_Brunner_CV.pdf"
              download
              className={styles.link}
            >
              Download PDF
            </Link>
          </span>
        </div>
      </div>
    </section>
  );
}
