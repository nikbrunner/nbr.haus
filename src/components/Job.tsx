import styles from './Job.module.css'

interface JobProps {
  company: string
  role: string
  period: string
  children: React.ReactNode
}

export default function Job({ company, role, period, children }: JobProps) {
  return (
    <div className={styles.job}>
      <h3 className={styles.company}>{company}</h3>
      <div className={styles.roleAndPeriod}>
        <div className={styles.role}>{role}</div>
        <div className={styles.period}>{period}</div>
      </div>
      {children}
    </div>
  )
}
