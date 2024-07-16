'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import Logo from './Logo';
import NavMobile from './NavMobile';

function Navigation() {
	const { data: user } = useRetrieveUserQuery();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	return (
		<header className='sticky top-0 z-40 shadow-sm bg-white shadow-whiteHover max-w-7xl mx-auto w-full px-5 h-24 flex flex-row flex-wrap items-center justify-between'>
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
