function TutorInfoHeader({
	icon,
	label,
	size = 'xl',
}: {
	icon?: React.ReactNode;
	label: string;
	size?: string;
}) {
	return (
		<p
			className={`flex flex-row gap-2 items-center ${
				size === 'xl' && 'text-xl'
			} ${size === 'md' && 'text-md'} mb-2`}
		>
			<span
				className={`${size === 'xl' && 'text-3xl'} ${
					size === 'md' && 'text-xl'
				}`}
			>
				{icon}
			</span>
			{label}
		</p>
	);
}

export default TutorInfoHeader;
