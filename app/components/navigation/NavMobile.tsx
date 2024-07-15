'use client';
import { useState } from 'react';
import BurgerBtn from './BurgerBtn';
import Link from 'next/link';
import Image from 'next/image';
import { API_KEY } from '@/app/api/apiAuth';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { useAppSelector } from '@/redux/hooks';
import {
	CiBoxList,
	CiGlobe,
	CiHashtag,
	CiLogout,
	CiUser,
	CiWarning,
} from 'react-icons/ci';

function NavMobile() {
	const [isMenuOpen, setIsMenuOpen] = useState(true);
	const { isAuthenticated } = useAppSelector((state) => state.auth);
	const { data: user } = useRetrieveUserQuery();

	function handleBodyScroll() {
		if (isMenuOpen) document.body.style.overflow = 'hidden';
		else document.body.style.overflow = 'auto';
	}
	handleBodyScroll();

	console.log(user);

	return (
		<nav className='flex items-center md:hidden h-full'>
			<BurgerBtn onClick={() => setIsMenuOpen(!isMenuOpen)} />
			<div
				className={`-z-50 fixed top-24 right-0 bg-white w-full h-full transition-all max-w-[300px] sm300:w-[280px] border-l-2 border-whiteHover duration-300 ${
					!isMenuOpen ? 'translate-x-[100%]' : 'translate-x-0'
				}`}
			>
				<div className='py-8 bg-whiteHover'>
					{isAuthenticated && (
						<Link href='/account/settings'>
							<div className={`flex flex-col items-center gap-2`}>
								<div className='w-24 aspect-square relative'>
									<Image
										loader={({ src }) => src}
										placeholder='blur'
										blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
										src={`${API_KEY}${'/static/media/uploads/user/default.jpg'}`}
										fill
										alt='User profile image'
										className='rounded-full shadow-md hover:border-main border-2 transition-colors duration-300'
									/>
								</div>

								<span className='text-xl text-gray'>
									{user?.first_name} {user?.last_name}
								</span>
							</div>
						</Link>
					)}
				</div>
				<div className='mx-auto flex justify-center h-full'>
					<ul className='flex flex-col gap-6 pt-10 h-full w-4/5'>
						<li>
							<Link
								className='flex items-center gap-5 hover:bg-whiteHover p-2 rounded-md'
								href='#'
							>
								<span className='text-2xl'>
									<CiUser />
								</span>
								Korepetytorzy
							</Link>
						</li>
						<li>
							<Link
								className='flex items-center gap-5 hover:bg-whiteHover p-2 rounded-md'
								href='#'
							>
								<span className='text-2xl'>
									<CiGlobe />
								</span>
								O nas
							</Link>
						</li>
						<li>
							<Link
								className='flex items-center gap-5 hover:bg-whiteHover p-2 rounded-md'
								href='#'
							>
								<span className='text-2xl'>
									<CiBoxList />
								</span>
								Regulamin
							</Link>
						</li>
						<li>
							<Link
								className='flex items-center gap-5 hover:bg-whiteHover p-2 rounded-md'
								href='#'
							>
								<span className='text-2xl'>
									<CiLogout />
								</span>
								Wyloguj się
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	);
}

export default NavMobile;
