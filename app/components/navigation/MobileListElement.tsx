import Link from 'next/link';

interface MobileListElementProps {
	icon?: React.ReactNode;
	children: React.ReactNode;
	onClick?: () => void;
	href?: string;
	className?: string;
}

function MobileListElement({
	icon,
	children,
	onClick,
	href,
	className,
}: MobileListElementProps) {
	return (
		<li className={`${className}`}>
			{href && (
				<Link
					className='flex items-center gap-5 w-full hover:bg-whiteHover p-2 rounded-md transition-colors duration-300'
					href={href}
					onClick={onClick}
				>
					<span className='text-2xl'>{icon}</span>
					{children}
				</Link>
			)}
			{onClick && !href && (
				<button
					className='flex items-center gap-5 w-full hover:bg-whiteHover p-2 rounded-md transition-colors duration-300'
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
