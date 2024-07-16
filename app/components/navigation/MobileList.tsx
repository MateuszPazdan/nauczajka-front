import { CiBoxList, CiGlobe, CiLogout, CiUser } from 'react-icons/ci';
import MobileListElement from './MobileListElement';
import useLogout from '@/app/hooks/useLogout';

function MobileList({
	isAuthenticated,
	handleCloseMenu,
}: {
	isAuthenticated: boolean;
	handleCloseMenu: () => void;
}) {
	const { handleLogout } = useLogout();

	const handleLogoutBtn = () => {
		handleLogout();
		handleCloseMenu();
	};

	return (
		<div className='mx-auto flex justify-center h-full'>
			<ul className='flex flex-col gap-6 pt-10 h-full w-4/5'>
				<MobileListElement
					icon={<CiUser />}
					href='/instructors'
					onClick={handleCloseMenu}
				>
					Korepetytorzy
				</MobileListElement>
				<MobileListElement
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
				</MobileListElement>
				{isAuthenticated && (
					<MobileListElement icon={<CiLogout />} onClick={handleLogoutBtn}>
						Wyloguj się
					</MobileListElement>
				)}
			</ul>
		</div>
	);
}

export default MobileList;
