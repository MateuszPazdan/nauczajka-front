'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Error({ error }: any) {
	return (
		<div className='flex justify-center items-center flex-col gap-6 min-h-full text-center'>
			<div className='flex gap-5 items-center flex-col w-[300px] '>
				<h1 className='text-5xl font-semibold'>Oops!</h1>
				<p className='text-lg font-bold text-mainSalmon'>{error.message}</p>
				<Image
					src='/error.png'
					alt='obrazek błędu'
					height={0}
					className='w-[200px] aspect-auto'
					width={200}
				/>
			</div>
			<Link
				href='/'
				className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg text-white duration-300 transition-colors hover:bg-mainHover rounded-md bg-main'
			>
				Wróć na stronę główną
			</Link>
		</div>
	);
}
