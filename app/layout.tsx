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
			<body className={`${robotoMono.className} h-full`}>
				<CustomProvider>
					<ToastProvider />
					<div className='flex flex-col h-full'>
						<Navigation />
						<main className='flex-grow min-h-0 overflow-auto'>{children}</main>
					</div>
				</CustomProvider>
			</body>
		</html>
	);
}
