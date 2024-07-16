import Link from 'next/link';

interface MobileListElementProps {
	icon?: React.ReactNode;
	children: React.ReactNode;
	onClick?: () => void;
	href?: string;
}

function 	MobileListElement({
	icon,
	children,
	onClick,
	href,
}: MobileListElementProps) {
	return (
		<li>
			{href && (
				<Link
					className='flex items-center gap-5 w-full hover:bg-whiteHover p-2 rounded-md'
					href={href}
					onClick={onClick}
				>
					<span className='text-2xl'>{icon}</span>
					{children}
				</Link>
			)}
			{onClick && !href && (
				<button
					className='flex items-center gap-5 w-full hover:bg-whiteHover p-2 rounded-md'
					onClick={onClick}
				>
					<span className='text-2xl'>{icon}</span>
					{children}
				</button>
			)}
		</li>
	);
}

export default MobileListElement;
