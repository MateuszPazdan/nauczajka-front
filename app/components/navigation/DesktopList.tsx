import { CiBoxList, CiGlobe, CiUser } from 'react-icons/ci';
import DesktopListElement from './DesktopListElement';

function DesktopList() {
	return (
		<div className='hidden lg:flex gap-10'>
			<DesktopListElement href='/instructors'>Korepetytorzy</DesktopListElement>
			<DesktopListElement href='/announcements'>Ogłoszenia</DesktopListElement>
		</div>
	);
}

export default DesktopList;
