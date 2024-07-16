import Link from 'next/link';

function DesktopListElement({
	children,
	icon,
	href,
}: {
	children: React.ReactNode;
	icon?: React.ReactNode;
	href: string;
}) {
	return (
		<Link
			href={href}
			className='relative link overflow-hidden group hover:cursor-pointer flex items-center gap-2 py-2'
		>
			<div className='absolute bottom-0 left-0 w-full h-[2px] -translate-x-[100%] bg-main group-[.link]:group-hover:translate-x-[0%] transition-transform duration-300'></div>
			<span className='text-xl'>{icon}</span>
			<span className='text-base'>{children}</span>
		</Link>
	);
}

export default DesktopListElement;
