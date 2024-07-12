interface TitleElementProps {
	logo: React.ReactNode;
	title: string;
}

function TitleElement({ logo, title }: TitleElementProps) {
	return (
		<span className='flex flex-row items-center gap-2'>
			<span className='text-2xl'>{logo}</span>
			{title}
		</span>
	);
}

export default TitleElement;
