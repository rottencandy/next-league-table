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
};

// 5 May 2021, 2pm
const TODAY = new Date('2021-05-05T14:00:00');

const isPast = (date: Date) => compareAsc(date, TODAY) < 0;

const defaultData = (name: string): Club => ({
    name,
    played: 0,
    won: 0,
    lost: 0,
    drawn: 0,
    points: 0,
    goalsScored: 0,
    goalsConceded: 0,
});

const CLUBS_DATA = RAW_DATA.reduce<{ [name: string]: Club }>((acc, val) => {
    const date = new Date(val.date);
    const [club1Name, club2Name] = Object.keys(val.score);
    acc[club1Name] = acc[club1Name] || defaultData(club1Name);
    acc[club2Name] = acc[club2Name] || defaultData(club2Name);

    if (isPast(date)) {
        const club1 = acc[club1Name];
        const club2 = acc[club2Name];
        const score1 = val.score[club1Name];
        const score2 = val.score[club2Name];
        club1.played++;
        club2.played++;

        if (score1 > score2) {
            club1.won++;
            club1.points += 3;
            club2.lost++;
        } else if (score1 < score2) {
            club2.won++;
            club2.points += 3;
            club1.lost++;
        } else {
            club1.points++;
            club2.points++;
            club1.drawn++;
            club2.drawn++;
        }
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
