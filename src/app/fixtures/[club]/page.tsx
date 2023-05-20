import { clubByName, getClubs, isPast } from "@/lib/club";
import Link from "next/link";
import styles from './page.module.css'
import { compareAsc } from "date-fns";

export default function Layout ({ params }: { params: { club: string }}) {
    const { club: name } = params;
    const club = clubByName(name.replace('-', ' '));

    const fixtures = club.fixtures.sort((f1, f2) => compareAsc(f1.date, f2.date));
    const past = fixtures.filter(f => isPast(f.date));
    const upcoming = fixtures.filter(f => !isPast(f.date));

    return (
        <>
            <nav>
                <Link href="/">Home</Link>
            </nav>

            <main className={styles.main}>
                <h1>Fixtures</h1>
                <h2>{club.name}</h2>

                <section>
                    <table>
                        <caption>Upcoming games</caption>
                        <tbody>
                        </tbody>
                    </table>
                </section>

                <section>
                    <table>
                        <caption>Past games</caption>
                        <tbody>
                        </tbody>
                    </table>
                </section>
            </main>
        </>
    );
};

export function generateStaticParams() {
    const clubs = getClubs();

    return clubs.map(club => ({
        club: club.replace(' ', '-'),
    }));
}
