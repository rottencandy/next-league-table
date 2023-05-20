import LeagueTable from '@/components/LeagueTable';
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <>
        <header>
            <h1 className={styles.header}><Link href="/">League table</Link></h1>
        </header>

        <main className={styles.main}>
            <section>
                <LeagueTable />
            </section>
        </main>
  </>
  );
}
