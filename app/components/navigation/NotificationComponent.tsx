import { CiBellOn } from 'react-icons/ci';
import NotificationsList from './NotificationsList';
import { Dispatch, SetStateAction } from 'react';

function NotificationComponent({
	isMenuOpen,
	setIsMenuOpen,
}: {
	isMenuOpen: string | null;
	setIsMenuOpen: Dispatch<SetStateAction<string | null>>;
}) {
	return (
		<div className='relative flex h-full aspect-square justify-center items-center icon group'>
			<button
				onClick={() =>
					setIsMenuOpen((isOpen) => {
						return isOpen === 'notifications' ? null : 'notifications';
					})
				}
				className={`h-full w-12 p-2 ${
					isMenuOpen === 'notifications' && 'text-main bg-whiteHover'
				} group-[.icon]:group-hover:text-mainHover group-[.icon]:group-hover:cursor-pointer rounded-full group-[.icon]:group-hover:bg-whiteHover duration-300 transition-colors`}
			>
				<CiBellOn className='h-full w-full' />
			</button>
			{isMenuOpen === 'notifications' && <NotificationsList />}
		</div>
	);
}

export default NotificationComponent;
