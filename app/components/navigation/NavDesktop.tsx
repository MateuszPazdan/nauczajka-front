'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import NavLink from './NavLink';
import DesktopList from './DesktopList';
import NavAvatar from './NavAvatar';
import useLogout from '@/app/hooks/useLogout';
import MobileList from './MobileList';
import MobileListElement from './MobileListElement';
import { CiLogout, CiSliderVertical } from 'react-icons/ci';
import { useState } from 'react';

function NavDesktop() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { handleLogout } = useLogout();
	const { data: user } = useRetrieveUserQuery();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const handleCloseMenu = () => {
		setIsMenuOpen(false);
	};

	const handleLogoutBtn = () => {
		handleLogout();
		handleCloseMenu();
	};

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
				<div className='hidden lg:block relative '>
					<NavAvatar
						user={user}
						size='small'
						onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
					/>

					<div
						className={`-z-50 fixed top-24 right-0 bg-white w-full h-full transition-all max-w-[300px] sm300:w-[280px] border-l-2 border-whiteHover duration-300 ${
							!isMenuOpen ? 'translate-x-[100%]' : 'translate-x-0'
						}`}
					>
						<MobileList>
							<MobileListElement
								icon={<CiSliderVertical />}
								href='/account/settings'
								onClick={handleCloseMenu}
							>
								Ustawienia
							</MobileListElement>
							{/* <MobileListElement
								icon={<CiGlobe />}
								href='/aboutus'
								onClick={handleCloseMenu}
							>
								O nas
							</MobileListElement>
							<MobileListElement
								icon={<CiBoxList />}
								href='/rules'
								onClick={handleCloseMenu}
							>
								Regulamin
							</MobileListElement> */}

							<MobileListElement icon={<CiLogout />} onClick={handleLogoutBtn}>
								Wyloguj się
							</MobileListElement>
						</MobileList>
					</div>
				</div>
			)}
		</>
	);
}

export default NavDesktop;
