import Link from "next/link";

const ClubFixtureLink = ({ name } : { name: string }) => {
    return (
        <Link href={`/fixtures/${name.replace(' ', '-')}`}>
            {name}
        </Link>
    );
};

export default ClubFixtureLink;
