import Header from '@/components/Header';
import { Inter } from 'next/font/google';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'League table',
  description: 'League table example',
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                {children}
            </body>
        </html>
    );
}
