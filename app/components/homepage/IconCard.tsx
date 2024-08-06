function IconCard({ icon, text }: { icon: React.ReactNode; text: string }) {
	return (
		<div className='flex flex-col gap-2 items-center w-fit rounded-md min-w-[120px]'>
			<span className='bg-main flex justify-center items-center p-4 rounded-md'>
				<span className='text-white text-5xl'>{icon}</span>
			</span>
			<span className='text-base text-wrap'>{text}</span>
		</div>
	);
}

export default IconCard;
