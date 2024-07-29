import { CiBellOn } from 'react-icons/ci';
import NotificationsList from './NotificationsList';
import { Dispatch, SetStateAction } from 'react';

function NotificationComponent({
	isMenuOpen,
	setIsMenuOpen,
	countOfNotifications,
}: {
	isMenuOpen: string | null;
	setIsMenuOpen: Dispatch<SetStateAction<string | null>>;
	countOfNotifications?: number | null;
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
				{countOfNotifications && (
					<span className='absolute bg-main text-white px-1 flex justify-center items-center rounded-full text-[12px] border-[1px] border-whiteHover top-2 left-1/2'>
						{countOfNotifications > 9 ? '9+' : countOfNotifications}
					</span>
				)}
			</button>
			{isMenuOpen === 'notifications' && <NotificationsList />}
		</div>
	);
}

export default NotificationComponent;
