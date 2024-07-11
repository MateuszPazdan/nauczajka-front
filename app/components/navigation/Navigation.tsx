'use client';

import { API_KEY } from '@/app/api/apiAuth';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Image from 'next/image';
import Link from 'next/link';

function Navigation() {
	const { data: user } = useRetrieveUserQuery();

	return (
		<nav className='max-w-7xl mx-auto w-full px-10 h-24 flex flex-row items-center justify-between'>
			<Link href={'/'} className='flex items-center gap-5'>
				<div className='w-10 aspect-square relative'>
					<Image src={'/book.svg'} fill alt='Nauczajka logo' />
				</div>
				<span className='text-3xl text-main'>Nauczajka</span>
			</Link>
			<div>
				{user ? (
					<Link href={'/'}>
						<div className='flex items-center gap-5'>
							<div className='w-10 aspect-square relative'>
								<Image
									loader={({ src }) => src}
									src={`${API_KEY}${user?.profile_image}`}
									fill
									alt='User profile image'
									className='rounded-full'
								/>
							</div>
							<span>{user?.first_name}</span>
						</div>
					</Link>
				) : (
					<Link href={'/auth/login'}>
						<span>Logowanie</span>
					</Link>
				)}
			</div>
		</nav>
	);
}

export default Navigation;
