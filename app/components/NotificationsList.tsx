import {
	Notification,
	useGetNotificationsQuery,
} from '@/redux/features/authApiSlice';
import { useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import Spinner from './Spinner';
import NotificationElement from './NotificationElement';

function NotificationsList() {
	const notificationsContaner = useRef<HTMLDivElement>(null);
	const [allNotifications, setAllNotifications] = useState<Notification[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const {
		data: notificationsResponse,
		isLoading: isNotificationsLoading,
		isSuccess,
	} = useGetNotificationsQuery(
		{
			p: 1,
			page_size: 8,
		},
		{ refetchOnMountOrArgChange: true }
	);
	const notifications = notificationsResponse?.results;
	const { lastJsonMessage }: { lastJsonMessage: Notification } = useWebSocket(
		'ws://localhost:8000/ws/notification/user/',
		{
			shouldReconnect: () => true,
			reconnectInterval: 1000,
		}
	);

	useEffect(() => {
		if (isSuccess && notifications) {
			setAllNotifications(notifications);
			setNextLink(notificationsResponse.next);
		}
	}, [isSuccess, notificationsResponse, notifications]);

	useEffect(() => {
		if (lastJsonMessage) {
			setAllNotifications((prevNotifications) => {
				const filteredNotifications = prevNotifications.filter(
					(notification) => notification.id !== lastJsonMessage.id
				);
				return [lastJsonMessage, ...filteredNotifications];
			});
		}
	}, [lastJsonMessage]);

	async function handleLoadMoreNotifications() {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data.next);
		setAllNotifications((prevNotifications) => {
			const notificationsIds = new Set(
				prevNotifications.map((chat) => chat.id)
			);
			const newNotifications = data.results.filter(
				(notification: Notification) => !notificationsIds.has(notification.id)
			);
			return [...prevNotifications, ...newNotifications];
		});
	}

	function handleScroll() {
		if (notificationsContaner.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				notificationsContaner.current;
			const scrollFromBottom = scrollHeight - scrollTop - clientHeight;

			if (scrollFromBottom < 5 && !isLoading) {
				handleLoadMoreNotifications();
				notificationsContaner.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
			if (scrollFromBottom < 5 && isLoading) {
				notificationsContaner.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
		}
	}

	return (
		<div
			ref={notificationsContaner}
			onScroll={handleScroll}
			className='flex  flex-col gap-1 p-1 absolute top-20 mb-0 bg-white rounded-md shadow-md shadow-whiteHover border-[1px] border-whiteHover w-60 2xl:w-80 overflow-y-scroll max-h-96'
		>
			{allNotifications.length > 0 ? (
				allNotifications?.map((notification) => (
					<NotificationElement
						key={notification.id}
						notification={notification}
					/>
				))
			) : !isNotificationsLoading ? (
				<span className='text-center p-2'>Brak powiadomień</span>
			) : (
				<Spinner size='small' />
			)}
			{isLoading && (
				<span className='py-2'>
					<Spinner size='small' color='text-main' />
				</span>
			)}
		</div>
	);
}

export default NotificationsList;
