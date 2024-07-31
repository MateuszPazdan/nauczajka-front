'use client';

import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import NavLink from './NavLink';
import DesktopList from './DesktopList';
import NavAvatar from './NavAvatar';
import useLogout from '@/app/hooks/useLogout';
import MobileList from './MobileList';
import MobileListElement from './MobileListElement';
import { CiChat1, CiFaceMeh, CiLogout, CiSliderVertical } from 'react-icons/ci';
import { useState } from 'react';
import NotificationComponent from './NotificationComponent';
import Image from 'next/image';
import { API_KEY } from '@/app/api/apiAuth';

function NavDesktop() {
	const [isMenuOpen, setIsMenuOpen] = useState<null | string>(null);
	const { handleLogout } = useLogout();
	const { data: user } = useRetrieveUserQuery();
	const { isAuthenticated } = useAppSelector((state) => state.auth);

	const handleCloseMenu = () => {
		setIsMenuOpen(null);
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
					<div className='flex items-center '>
						<NotificationComponent
							isMenuOpen={isMenuOpen}
							setIsMenuOpen={setIsMenuOpen}
						/>
						<NavAvatar
							user={user}
							size='small'
							onClick={() =>
								setIsMenuOpen((isOpen) => {
									return isOpen === 'nav' ? null : 'nav';
								})
							}
						/>
					</div>
					<div
						className={`-z-50 fixed top-24 right-0 bg-white w-full h-[calc(100%-96px)] overflow-scroll transition-all max-w-[300px] sm300:w-[280px] border-l-2 border-whiteHover duration-300 ${
							isMenuOpen !== 'nav' ? 'translate-x-[100%]' : 'translate-x-0'
						}`}
					>
						<MobileList>
							<MobileListElement
								className='logo group'
								icon={
									<div className='mx-auto relative w-9 aspect-square'>
										<Image
											loader={({ src }) => src}
											placeholder='blur'
											blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
											src={`${user?.profile_image}`}
											fill
											alt={`${user?.first_name} avatar`}
											className='rounded-full shadow-md group-[.logo]:group-hover:border-main border-2 transition-colors duration-300'
										/>
									</div>
								}
								href='/account/settings'
								onClick={handleCloseMenu}
							>
								{user?.first_name + ' ' + user?.last_name}
							</MobileListElement>
							<span className='w-full h-px bg-whiteHover'></span>
							<MobileListElement
								icon={<CiChat1 />}
								href='/chats'
								onClick={handleCloseMenu}
							>
								Wiadomości
							</MobileListElement>
							<MobileListElement
								icon={<CiSliderVertical />}
								href='/account/settings'
								onClick={handleCloseMenu}
							>
								Ustawienia
							</MobileListElement>
							<MobileListElement
								icon={<CiFaceMeh />}
								href='/report-issue'
								onClick={handleCloseMenu}
							>
								Zgłoś problem
							</MobileListElement>
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
