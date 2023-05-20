import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
        <nav className={styles.nav}>
            <h1 className={styles.title}>League table</h1>
        </nav>
    </main>
  );
}
