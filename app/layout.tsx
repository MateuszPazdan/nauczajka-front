import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/_styles/globals.css';
import Navigation from './components/navigation/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: {
		template: '%s | Nauczajka',
		default: 'Nauczajka',
	},
	description: 'Aplikacja internetowa łącząca korepetytorów z uczniami',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='pl'>
			<body className={inter.className}>
				<Navigation />
				<main>{children}</main>
			</body>
		</html>
	);
}
