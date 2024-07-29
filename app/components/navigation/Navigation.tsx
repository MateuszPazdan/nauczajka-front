'use client';

import Logo from './Logo';
import NavMobile from './NavMobile';
import NavDesktop from './NavDesktop';
import useWebSocket from 'react-use-websocket';
import { useEffect, useState } from 'react';

function Navigation() {
	const [countOfNotifications, setCountOfNotifications] = useState<
		number | null
	>(null);
	const {
		lastJsonMessage,
	}: { lastJsonMessage: { unread_notification_count: number } } = useWebSocket(
		'ws://localhost:8000/ws/notification/user/',
		{
			shouldReconnect: () => true,
			reconnectInterval: 3000,
		}
	);
	useEffect(() => {
		if (lastJsonMessage?.unread_notification_count)
			setCountOfNotifications(lastJsonMessage.unread_notification_count);
		if (lastJsonMessage?.unread_notification_count === 0)
			setCountOfNotifications(null);
	}, [lastJsonMessage]);

	return (
		<header className='sticky top-0 z-40 shadow-sm bg-white shadow-whiteHover '>
			<div className='max-w-7xl mx-auto w-full px-5 h-24 flex gap-4 flex-row items-center justify-between'>
				<Logo />
				<NavMobile />
				<NavDesktop countOfNotifications={countOfNotifications} />
			</div>
		</header>
	);
}

export default Navigation;
