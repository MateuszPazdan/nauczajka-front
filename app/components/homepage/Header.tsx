import Link from 'next/link';

function Header() {
	return (
		<div className='max-w-7xl lg:h-[calc(100vh-96px)] max-h-[700px] py-10 sm500:px-5 px-2 flex md:items-center mx-auto'>
			<div className='w-full items-center sm500:items-start text-center sm500:text-start mx-auto xl:pr-10 flex flex-col gap-10'>
				<p className='font-bold text-[2.5rem] sm:text-6xl leading-[1.2]'>
					Ucz się i nauczaj z pasją dzięki{' '}
					<span className='text-mainSalmon'>Nauczajce</span>!
				</p>
				<p className=' text-sm sm:text-md'>
					Innowacyjna platforma łącząca korepetytorów z uczniami. Znajdź swojego
					nauczyciela lub zacznij zarabiać na swojej pasji już dziś!
				</p>
				<Link
					className='text-white bg-mainSalmon w-fit px-10 py-3 text-2xl rounded-md shadow-sm shadow-whiteHover hover:bg-mainSalmonHover duration-300 transition-colors'
					href={'/auth/register'}
				>
					Dołącz
				</Link>
			</div>
			<div className='relative md:w-full h-full flex items-center justify-center'>
				<div className='h-full w-full hidden relative md:block'>
					<img
						className='w-[70%] lg:w-[75%] xl:w-[70%] absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md shadow-[0 0 10px rgba(0,0,0,0.25)]'
						src='/girl-with-book.png'
						alt='Dziewczyna z książką'
					/>
				</div>
				<div className='h-[80%] w-[90%] xl:h-[85%] absolute hidden lg:grid grid-cols-2 grid-rows-3 gap-3 -z-10  '>
					<div className='w-full h-full bg-white rounded-md'></div>
					<div className='w-full h-full bg-main/75 rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
					<div className='w-full h-full bg-main/75 rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
				</div>
			</div>
		</div>
	);
}

export default Header;

{
	/* <div className='w-1/2 hidden lg:flex justify-center items-center h-full '>
				<div className='relative h-[88%] w-full grid grid-cols-2 grid-rows-3 gap-3 -z-10  '>
					<div className='w-full h-full bg-white rounded-md'></div>
					<div className='w-full h-full bg-main/75 rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
					<div className='w-full h-full bg-main/75 rounded-md'></div>
					<div className='w-full h-full bg-main rounded-md'></div>
					<img
						className='absolute h-auto w-[77%] left-[45%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 drop-shadow-md shadow-[0 0 10px rgba(0,0,0,0.25)]'
						src='/girl-with-book.png'
						alt='Dziewczyna z książką'
					/>
				</div>
			</div> */
}
