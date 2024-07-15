import type { Config } from 'tailwindcss';

const config: Config = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			backgroundImage: {
				'background-pattern': "url('/patterns.png')",
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
			colors: {
				main: '#7c67ff',
				mainHover: '#6b56ee',
				mainLight: '#e5e1ff',

				mainSalmon: '#fe7474',
				mainSalmonHover: '#ed6363',
				mainBlue: '#1b356b',
				mainBlueHover: '#1a245a',
				white: '#fff',
				whiteHover: '#eee',
				shadowBlack: '#ddd',
				gray: '#495057',
				lighGray: '#e9ecef',
			},

			screens: {
				sm300: '300px',
				sm400: '400px',
				sm500: '500px',
				sm600: '600px',
				sm700: '700px',
				sm840: '840px',
				md960: '960px',
				lg1150: '1150px',
				md800: '800px',
			},
			boxShadow: {
				myShadow: '0 6px 12px 0px rgba(0,0,0,0.3)',
				headerButtonFooter: '3px 7px 13px 1px rgba(0, 0, 0, .3)',
			},
		},
	},
	plugins: [],
};
export default config;
