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
import Logo from './Logo';
import NavMobile from './NavMobile';

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
		<header className='z-40 shadow-sm shadow-whiteHover max-w-7xl mx-auto w-full px-5 h-24 flex flex-row flex-wrap items-center justify-between'>
			<Logo />
			<NavMobile />
			{/* <div>
				{isAuthenticated ? (
					<Link href={'/'} onClick={handleLogout}>
						<div className='flex items-center gap-5'>
							<div className='w-10 aspect-square relative'>
								<Image
									loader={({ src }) => src}
									placeholder='blur'
									blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
									src={`${API_KEY}${'/static/media/uploads/user/default.jpg'}`}
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
			</div> */}
		</header>
	);
}

export default Navigation;
