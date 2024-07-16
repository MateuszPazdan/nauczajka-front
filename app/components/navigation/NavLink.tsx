import Link from 'next/link';

interface NavBtnProps {
	children: React.ReactNode;
	classname?: string;
	type?: 'purple' | 'white';
	href: string;
	onClick?: () => void;
}

function NavLink({
	children,
	classname,
	type = 'purple',
	href,
	onClick,
}: NavBtnProps) {
	return (
		<>
			{type === 'purple' && (
				<Link
					href={href}
					className={`px-5 py-2 bg-main rounded-md text-white text-center ${classname} hover:bg-mainHover transition-colors duration-300`}
					onClick={onClick}
				>
					{children}
				</Link>
			)}
			{type === 'white' && (
				<Link
					href={href}
					className={`px-5 py-2 bg-white rounded-md text-main border-2 border-main text-center ${classname} hover:bg-mainHover hover:border-mainHover hover:text-white transition-colors duration-300`}
					onClick={onClick}
				>
					{children}
				</Link>
			)}
		</>
	);
}

export default NavLink;
