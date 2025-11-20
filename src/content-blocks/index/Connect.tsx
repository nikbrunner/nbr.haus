import Link from "../../components/Link";
import SpecCard from "../../components/SpecCard";
import SpecList from "../../components/SpecList";
import styles from "./Connect.module.css";

export default function Connect() {
  const items = [
    {
      label: "GitHub:",
      value: (
        <Link
          href="https://www.github.com/nikbrunner"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Profile
        </Link>
      )
    },
    {
      label: "LinkedIn:",
      value: (
        <Link
          href="https://www.linkedin.com/in/nbru/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
        >
          Profile
        </Link>
      )
    },
    {
      label: "CV:",
      value: (
        <Link href="/Nikolaus_Brunner_CV.pdf" download className={styles.link}>
          Download PDF
        </Link>
      )
    },
    {
      label: "Email:",
      value: <Link href="mailto:nik@nbr.haus">nik@nbr.haus</Link>
    }
  ];

  return (
    <SpecCard title="Connect">
      <SpecList items={items} />
    </SpecCard>
  );
}
