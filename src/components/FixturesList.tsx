import { Fixture, isPast } from "@/lib/club";
import { format } from "date-fns";

export default function FixturesList({ fixtures }: { fixtures: Fixture[] }) {

    return (
        <div className="fixture">
        {fixtures.map(f => {
            const date = format(f.date, 'dd/MM, HH:mm');
            const past = isPast(f.date);
            const [club1, club2] = Object.keys(f.clubs);
            const [score1, score2] = Object.values(f.clubs);

            return (
                <li key={f.key}>
                    <div>{date}</div>
                    <div>
                        <span>{club1}</span>
                        {past ? `${score1} - ${score2}` : ' v '}
                        <span>{club2}</span>
                    </div>
                </li>
            );
        })}
        </div>
   );
}
