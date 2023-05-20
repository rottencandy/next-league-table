export function generateMetadata({ params }: { params: { club: string } }) {
    const { club } = params;

    return {
        title: `Fixtures - ${club.replace('-', ' ')}`,
        description: 'Club fixtures',
    };
}

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
    return (
        <>{children}</>
    );
}
