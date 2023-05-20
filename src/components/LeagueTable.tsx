import Link from "next/link";
import { getClubsByPos } from "@/lib/club";

const headers = [
    'Position',
    'Club',
    'Played',
    'Won',
    'Drawn',
    'Lost',
    'GD',
    'Points',
];

const LeagueTable = () => {
    const clubs = getClubsByPos();

    return (
        <table>
            <thead>
                <tr>
                    {headers.map(h => (
                        <th key={h}>{h}</th>
                    ))}
                </tr>
            </thead>

            <tbody>
                {clubs.map((c, i) => (
                    <tr key={c.name}>
                        <td>{i + 1}</td>
                        <td>
                            <Link href={`/fixtures/${c.name.replace(' ', '-')}`}>
                                {c.name}
                            </Link>
                        </td>
                        <td>{c.played}</td>
                        <td>{c.won}</td>
                        <td>{c.drawn}</td>
                        <td>{c.lost}</td>
                        <td>{c.goalsScored - c.goalsConceded}</td>
                        <td>{c.points}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default LeagueTable;
