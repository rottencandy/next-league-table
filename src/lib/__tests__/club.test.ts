import { afterAll, describe, expect, jest, test } from '@jest/globals';
import { getClubsByPos, isPast } from '../club';

describe('isPast', () => {
    test('returns true if date is earlier than TODAY', () => {
        expect(isPast(new Date('2021-04-01T01:00:00'))).toBe(true);
    });

    test('returns false if date is older than TODAY', () => {
        expect(isPast(new Date('2021-07-01T01:00:00'))).toBe(false);
    });
});

jest.mock('../data.js', () => ({
    data: [
        {
            date: '2021-04-01T01:00:00',
            score: {
                Team1: 1,
                Team2: 2,
            },
        },
        {
            date: '2021-07-01T01:00:00',
            score: {
                Team2: null,
                Team3: null,
            },
        },
    ],
}));

describe('getClubsByPos', () => {
    const clubs = getClubsByPos();

    afterAll(() => {
        jest.restoreAllMocks();
    });

    test('returns correct number of team entries', () => {
        expect(clubs.length).toEqual(3);
    });

    test('returns team entries sorted by points', () => {
        expect(clubs.map(c => c.name)).toEqual(['Team2', 'Team1', 'Team3']);
    });

    test('sets correct default data for teams without any games', () => {
        expect(clubs[2]).toEqual(expect.objectContaining({
            name: 'Team3',
            played: 0,
            drawn: 0,
            won: 0,
            lost: 0,
            points: 0,
            goalsScored: 0,
            goalsConceded: 0,
        }));
    });

    test('returns correct match score data for teams with past games', () => {
        expect(clubs[0]).toEqual(expect.objectContaining({
            name: 'Team2',
            played: 1,
            drawn: 0,
            won: 1,
            lost: 0,
            points: 3,
            goalsScored: 2,
            goalsConceded: 1,
        }));
        expect(clubs[1]).toEqual(expect.objectContaining({
            name: 'Team1',
            played: 1,
            drawn: 0,
            won: 0,
            lost: 1,
            points: 0,
            goalsScored: 1,
            goalsConceded: 2,
        }));
    });
});
