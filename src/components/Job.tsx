import styles from "./Job.module.css";

interface Props {
  company: string;
  position: string;
  period: string;
  children: React.ReactNode;
}

export default function Job({ company, position, period, children }: Props) {
  return (
    <div className={styles.job}>
      <h3 className={styles.company}>{company}</h3>
      <div className={styles.roleAndPeriod}>
        <div className={styles.role}>{position}</div>
        <div className={styles.period}>{period}</div>
      </div>
      {children}
    </div>
  );
}
