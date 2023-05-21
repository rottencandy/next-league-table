import { Fixture, isPast } from "@/lib/club";
import { format } from "date-fns";

import './FixturesList.css';
import ClubFixtureLink from "./ClubFixtureLink";

const FixturesList = ({ fixtures }: { fixtures: Fixture[] }) => {

    return (
        <div className="fixture">
        {fixtures.map(f => {
            const date = format(f.date, 'dd/MM, HH:mm');
            const past = isPast(f.date);
            const [club1, club2] = Object.keys(f.clubs);
            const [score1, score2] = Object.values(f.clubs);

            return (
                <li key={f.key}>
                    <div className="date">{date}</div>
                    <div className="teams">
                        <span className="team">
                            <ClubFixtureLink name={club1} />
                        </span>
                        <span className="gap" />
                        <span className={`score ${past ? 'past' : ''}`}>
                            {past ? `${score1} - ${score2}` : 'v'}
                        </span>
                        <span className="team">
                            <ClubFixtureLink name={club2} />
                        </span>
                    </div>
                </li>
            );
        })}
        </div>
   );
};

export default FixturesList;
