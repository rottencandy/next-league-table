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
            </tbody>
        </table>
    );
};

export default LeagueTable;
