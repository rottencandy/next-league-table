import LeagueTable from '../components/LeagueTable';
import styles from './page.module.css'

export default function Home() {
  return (
    <>
        <nav className={styles.nav}>
        </nav>

        <main className={styles.main}>
            <h1 className={styles.title}>League table</h1>
            <LeagueTable />
        </main>
  </>
  );
}
