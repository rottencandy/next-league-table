import Link from "next/link";
import { getClubsByPos } from "@/lib/club";

const LeagueTable = () => {
    const clubs = getClubsByPos();

    return (
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Club</th>
                    <th>Played</th>
                    <th>Won</th>
                    <th>Drawn</th>
                    <th>Lost</th>
                    <th><abbr title="Goal Difference">GD</abbr></th>
                    <th>Points</th>
                </tr>
            </thead>

            <tbody>
                {clubs.map((c, i) => {
                    const gd = c.goalsScored - c.goalsConceded;

                    return (
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
                            <td>{gd >= 0 ? `+${gd}` : gd}</td>
                            <td>{c.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default LeagueTable;
