import Link from "next/link";
import { getClubsByPos } from "@/lib/club";

import './LeagueTable.css';

const LeagueTable = () => {
    const clubs = getClubsByPos();

    return (
        <table className="league">
            <thead>
                <tr>
                    <th className="position">Position</th>
                    <th className="club">Club</th>
                    <th className="played">Played</th>
                    <th className="won">Won</th>
                    <th className="drawn">Drawn</th>
                    <th className="lost">Lost</th>
                    <th className="gd"><abbr title="Goal Difference">GD</abbr></th>
                    <th className="points">Points</th>
                </tr>
            </thead>

            <tbody>
                {clubs.map((c, i) => {
                    const gd = c.goalsScored - c.goalsConceded;

                    return (
                        <tr key={c.name}>
                            <td className="position">{i + 1}</td>
                            <td className="club">
                                <Link href={`/fixtures/${c.name.replace(' ', '-')}`}>
                                    {c.name}
                                </Link>
                            </td>
                            <td>{c.played}</td>
                            <td>{c.won}</td>
                            <td>{c.drawn}</td>
                            <td>{c.lost}</td>
                            <td className="gd">{gd >= 0 ? `+${gd}` : gd}</td>
                            <td>{c.points}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default LeagueTable;
