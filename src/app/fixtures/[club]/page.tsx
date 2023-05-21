import { clubByName, getClubs, isPast } from "@/lib/club";
import Link from "next/link";
import styles from './page.module.css'
import { compareAsc } from "date-fns";
import FixturesList from "@/components/FixturesList";

export default function Layout ({ params }: { params: { club: string }}) {
    const { club: name } = params;
    const club = clubByName(name.replace('-', ' '));

    const fixtures = club.fixtures.sort((f1, f2) => compareAsc(f1.date, f2.date));
    const past = fixtures.filter(f => isPast(f.date));
    const upcoming = fixtures.filter(f => !isPast(f.date));

    return (
        <main className={styles.main}>
            <h2><b>{club.name}</b> - Fixtures</h2>

            <section>
                <h3 className={styles.subtitle}>Upcoming</h3>
                <ul>
                    <FixturesList fixtures={upcoming} />
                </ul>
            </section>

            <section>
                <h3 className={styles.subtitle}>Past</h3>
                <ul>
                    <FixturesList fixtures={past} />
                </ul>
            </section>
        </main>
    );
};

export function generateStaticParams() {
    const clubs = getClubs();

    return clubs.map(club => ({
        club: club.replace(' ', '-'),
    }));
}
