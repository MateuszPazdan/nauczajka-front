function AddAnnouncementComponent() {
	return (
		<div className='w-full flex rounded-md border-[1px] border-whiteHover'>
			<button
				className={`rounded-md w-full text-center hover:bg-mainHover bg-main text-white p-1 transition-colors duration-300 `}
			>
				Dodaj ogłoszenie
			</button>
		</div>
	);
}

export default AddAnnouncementComponent;
