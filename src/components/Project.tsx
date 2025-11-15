import styles from './Project.module.css'

interface ProjectProps {
  title: string
  status: 'Active' | 'Maintained' | 'Complete' | 'Archived'
  stack: string[]
  topics: string[]
  primaryLink: {
    url: string
    type: string
  }
  year?: string | number
  platforms?: string[]
  metrics?: Array<{
    label: string
    value: string
  }>
  additionalLinks?: Array<{
    url: string
    type: string
  }>
  children: React.ReactNode
}

export default function Project({
  title,
  stack,
  topics,
  status,
  primaryLink,
  year,
  platforms,
  metrics,
  additionalLinks,
  children,
}: ProjectProps) {
  const allLinks = [primaryLink, ...(additionalLinks || [])]

  return (
    <article className={styles.project}>
      <h3 className={styles.title}>{title}</h3>

      <div className={styles.metadata}>
        <div className={styles.metadataItem}>
          <span className={styles.label}>Status:</span>
          <span className={styles.value}>{status}</span>
        </div>

        {stack.length > 0 && (
          <div className={styles.metadataItem}>
            <span className={styles.label}>Stack:</span>
            <div className={styles.tags}>
              {stack.map((tech) => (
                <span key={tech} className={styles.tag}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {topics.length > 0 && (
          <div className={styles.metadataItem}>
            <span className={styles.label}>Topics:</span>
            <div className={styles.tags}>
              {topics.map((topic) => (
                <span key={topic} className={styles.tag}>
                  {topic}
                </span>
              ))}
            </div>
          </div>
        )}

        {year && (
          <div className={styles.metadataItem}>
            <span className={styles.label}>Year:</span>
            <span className={styles.value}>{year}</span>
          </div>
        )}

        {platforms && platforms.length > 0 && (
          <div className={styles.metadataItem}>
            <span className={styles.label}>Platforms:</span>
            <span className={styles.value}>{platforms.join(', ')}</span>
          </div>
        )}

        {metrics && metrics.length > 0 && (
          <>
            {metrics.map((metric) => (
              <div key={metric.label} className={styles.metadataItem}>
                <span className={styles.label}>{metric.label}:</span>
                <span className={styles.value}>{metric.value}</span>
              </div>
            ))}
          </>
        )}
      </div>

      <div className={styles.description}>{children}</div>

      <div className={styles.links}>
        {allLinks.map((link, index) => (
          <a
            key={link.url}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.linkBadge} ${index === 0 ? styles.primary : ''}`}
          >
            {link.type}
          </a>
        ))}
      </div>
    </article>
  )
}
