'use client';
import { useState } from 'react';
import BurgerBtn from './BurgerBtn';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import NavLogo from './NavLogo';
import NavLink from './NavLink';
import MobileList from './MobileList';

function NavMobile() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const { data: user } = useRetrieveUserQuery();

	const handleCloseMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className='flex items-center md:hidden h-full'>
			<BurgerBtn onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<div
				className={`-z-50 fixed top-24 right-0 bg-white w-full h-full transition-all max-w-[300px] sm300:w-[280px] border-l-2 border-whiteHover duration-300 ${
					!isMenuOpen ? 'translate-x-[100%]' : 'translate-x-0'
				}`}
			>
				{isAuthenticated ? (
					<button onClick={handleCloseMenu} className='w-full bg-whiteHover'>
						<NavLogo user={user} />
					</button>
				) : (
					<div className='flex flex-col gap-2 w-2/3 mx-auto py-8'>
						<NavLink href='/auth/login' onClick={handleCloseMenu}>
							Logowanie
						</NavLink>
						<NavLink
							href='/auth/register'
							type='white'
							onClick={handleCloseMenu}
						>
							Rejestracja
						</NavLink>
					</div>
				)}
				<MobileList
					isAuthenticated={isAuthenticated}
					handleCloseMenu={() => handleCloseMenu()}
				/>
			</div>
		</nav>
	);
}

export default NavMobile;
