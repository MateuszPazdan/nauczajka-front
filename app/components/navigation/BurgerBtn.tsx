function BurgerBtn({ onClick }: { onClick: () => void }) {
	return (
		<button
			onClick={onClick}
			className='relative flex flex-col gap-[6px] hover:cursor-pointer hover:bg-whiteHover transition-colors duration-300 p-2 rounded-md'
		>
			<div className='w-8 h-[5px] rounded-md bg-main'></div>
			<div className='w-8 h-[5px] rounded-md bg-main'></div>
			<div className='w-8 h-[5px] rounded-md bg-main'></div>
		</button>
	);
}

export default BurgerBtn;
