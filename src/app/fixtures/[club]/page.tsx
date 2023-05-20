import { clubByName, getClubs } from "@/lib/club";
import Link from "next/link";
import styles from './page.module.css'

export default function Layout ({ params }: { params: { club: string }}) {
    const { club: name } = params;
    const club = clubByName(name.replace('-', ' '));

    return (
        <>
            <nav>
                <Link href="/">Home</Link>
            </nav>

            <main className={styles.main}>
                <h1>Fixtures</h1>
                <h2>{club.name}</h2>
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
