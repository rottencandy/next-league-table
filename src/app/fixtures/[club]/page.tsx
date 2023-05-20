import { clubByName, getClubs } from "@/lib/club";

export default function Layout ({ params }: { params: { club: string }}) {
    const { club: name } = params;
    const club = clubByName(name.replace('-', ' '));

    return (
        <>
            <h1>{club.name}</h1>
            <div>hello world</div>
        </>
    );
};

export function generateStaticParams() {
    const clubs = getClubs();

    return clubs.map(club => ({
        club: club.replace(' ', '-'),
    }));
}
