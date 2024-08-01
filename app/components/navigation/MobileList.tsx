

function MobileList({ children }: { children: React.ReactNode }) {
	return (
		<div className='mx-auto flex justify-center'>
			<ul className='flex flex-col gap-6 pt-10 w-4/5 overflow-scroll'>{children}</ul>
		</div>
	);
}

export default MobileList;
