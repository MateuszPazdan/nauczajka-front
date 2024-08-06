function SectionTitle({
	children,
	description,
}: {
	children: React.ReactNode;
	description: string;
}) {
	return (
		<div className='mx-auto flex flex-col gap-3 text-center'>
			<span className='text-4xl sm:text-5xl font-semibold text-main '>
				{children}
			</span>
			<p>{description}</p>
		</div>
	);
}

export default SectionTitle;
