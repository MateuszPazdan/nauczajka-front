'use client';

import { API_KEY } from '@/app/api/apiAuth';
import {
	useLogoutMutation,
	useRetrieveUserQuery,
} from '@/redux/features/authApiSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { logout as setLogout } from '@/redux/features/authSlice';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

function Navigation() {
	const { data: user } = useRetrieveUserQuery();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [logout] = useLogoutMutation();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	function handleLogout() {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			})
			.finally(() => {
				toast.success('Wylogowano pomyślnie');
				router.push('/');
			});
	}

	return (
		<nav className='max-w-7xl mx-auto w-full px-10 h-24 flex flex-row flex-wrap items-center justify-between'>
			<Link href={'/'} className='flex items-center gap-5'>
				<div className='w-10 aspect-square relative'>
					<Image src={'/book.svg'} fill alt='Nauczajka logo' />
				</div>
				<span className='text-3xl text-main'>Nauczajka</span>
			</Link>
			<div>
				{isAuthenticated ? (
					<Link href={'/'} onClick={handleLogout}>
						<div className='flex items-center gap-5'>
							<div className='w-10 aspect-square relative'>
								<Image
									loader={({ src }) => src}
									placeholder='blur'
									blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
									src={`${API_KEY}${
										user?.profile_image ??
										'/static/media/uploads/user/default.jpg'
									}`}
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
