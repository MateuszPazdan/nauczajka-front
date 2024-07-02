import Image from 'next/image';

function Navigation() {
	return (
		<nav className='max-w-7xl mx-auto px-10 h-24 flex flex-row items-center'>
			<div className='flex items-center gap-5'>
				<div className='w-10 aspect-square relative'>
					<Image src={'/book.svg'} fill alt='Nauczajka logo' />
				</div>
				<span className='text-3xl text-main'>Nauczajka</span>
			</div>
		</nav>
	);
}

export default Navigation;
