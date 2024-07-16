'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import NavLink from './NavLink';
import DesktopList from './DesktopList';
import NavAvatar from './NavAvatar';

function NavDesktop() {
	const { data: user } = useRetrieveUserQuery();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<>
			<DesktopList />
			{!isAuthenticated ? (
				<div className='hidden lg:flex gap-2'>
					<NavLink type='white' href='/auth/login'>
						Logowanie
					</NavLink>
					<NavLink type='purple' href='/auth/register'>
						Rejestracja
					</NavLink>
				</div>
			) : (
				<div className='hidden lg:block'>
					<NavAvatar user={user} size='small' />
				</div>
			)}
		</>
	);
}

export default NavDesktop;
