import styles from './Header.module.css'

export default function Header() {
  return (
    <header className={styles.Header}>
      <h1>
        <a href="/">
          nbr<span>.</span>haus
        </a>
      </h1>
    </header>
  )
}
