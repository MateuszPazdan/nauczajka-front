import Image from 'next/image';
import Link from 'next/link';

function Logo() {
	return (
		<Link href={'/'} className='flex items-center gap-3'>
			<div className='w-8 aspect-square relative'>
				<Image src={'/book.svg'} fill alt='Nauczajka logo' />
			</div>
			<span className='text-2xl text-main sm400:block'>Nauczajka</span>
		</Link>
	);
}

export default Logo;
