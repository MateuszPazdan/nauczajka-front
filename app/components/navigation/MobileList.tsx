

function MobileList({ children }: { children: React.ReactNode }) {
	return (
		<div className='mx-auto flex justify-center h-full'>
			<ul className='flex flex-col gap-6 pt-10 h-full w-4/5'>{children}</ul>
		</div>
	);
}

export default MobileList;
