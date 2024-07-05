import type { Metadata } from 'next';
import { Inter, Roboto_Mono } from 'next/font/google';
import '@/app/_styles/globals.css';
import Navigation from './components/navigation/Navigation';
import CustomProvider from '@/redux/Provider';
import { ToastProvider } from './components/utils';
import Footer from './components/Footer';

const inter = Inter({ subsets: ['latin'] });
const robotoMono = Roboto_Mono({
	subsets: ['latin'],
});

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
			<body className={robotoMono.className}>
				<CustomProvider>
					<ToastProvider />
					<div className='grid grid-rows-[auto_1fr_auto] min-h-screen'>
						<Navigation />
						<main className='flex justify-center items-center'>{children}</main>
						<Footer />
					</div>
				</CustomProvider>
			</body>
		</html>
	);
}
