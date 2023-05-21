import LeagueTable from '@/components/LeagueTable';
import styles from './page.module.css'
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
        <section>
            <LeagueTable />
        </section>
    </main>
  );
}
