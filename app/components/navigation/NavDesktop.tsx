'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import NavLink from './NavLink';
import DesktopList from './DesktopList';

function NavDesktop() {
	const { data: user } = useRetrieveUserQuery();
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	return (
		<>
			<DesktopList />
			<div className='hidden lg:flex gap-2'>
				<NavLink type='white' href='/auth/login'>
					Logowanie
				</NavLink>
				<NavLink type='purple' href='/auth/register'>
					Rejestracja
				</NavLink>
			</div>
		</>
	);
}

export default NavDesktop;
