import Logo from './Logo';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';

function Navigation() {
	return (
		<header className='sticky top-0 z-40 shadow-sm bg-white shadow-whiteHover '>
			<div className='max-w-7xl mx-auto w-full px-5 h-24 flex gap-4 flex-row items-center justify-between'>
				<Logo />
				<NavMobile />
				<NavDesktop />
			</div>
		</header>
	);
}

export default Navigation;
