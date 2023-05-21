import compareAsc from 'date-fns/compareAsc';
import { data as RAW_DATA } from './data.js';

export type Club = {
    name: string;
    played: number;
    won: number;
    drawn: number;
    lost: number;
    points: number;
    goalsScored: number;
    goalsConceded: number;
    fixtures: Fixture[];
};

export type Fixture = {
    key: string;
    date: Date;
    clubs: { [name: string]: number };
};

// 5 May 2021, 2pm
const TODAY = new Date('2021-05-05T14:00:00');

export const isPast = (date: Date) => compareAsc(date, TODAY) < 0;

const defaultData = (name: string): Club => ({
    name,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
    fixtures: [],
});

const calculateMatchScore = (club: Club, goals: number, opponentGoals: number) => {
    club.played++;
    club.goalsScored += goals;
    club.goalsConceded += opponentGoals;

        if (goals > opponentGoals) {
            club.won++;
            club.points += 3;
        } else if (goals < opponentGoals) {
            club.lost++;
        } else {
            club.drawn++;
            club.points++;
        }
    return club;
};

const CLUBS_DATA = RAW_DATA.reduce<{ [name: string]: Club }>((acc, val, i) => {
    const date = new Date(val.date);
    const [club1Name, club2Name] = Object.keys(val.score);
    acc[club1Name] = acc[club1Name] || defaultData(club1Name);
    acc[club2Name] = acc[club2Name] || defaultData(club2Name);
    const club1 = acc[club1Name];
    const club2 = acc[club2Name];
    const key = `${club1Name}-${club2Name}-${i}`;
    club1.fixtures.push({ date, clubs: val.score, key });
    club2.fixtures.push({ date, clubs: val.score, key });

    if (isPast(date)) {
        const score1 = val.score[club1Name];
        const score2 = val.score[club2Name];
        calculateMatchScore(club1, score1, score2);
        calculateMatchScore(club2, score2, score1);
    }
    return acc;
}, {});

/*
* Clubs sorted by position
*/
export const getClubsByPos = (): Club[] => {
    const clubs = Object.values(CLUBS_DATA);
    clubs.sort((c1, c2) => c2.points - c1.points)
    return clubs;
};

export const getClubs = () => Object.keys(CLUBS_DATA);

export const clubByName = (name: string) => CLUBS_DATA[name];
