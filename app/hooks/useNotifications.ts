import {
	Notification,
	useGetNotificationsQuery,
} from '@/redux/features/authApiSlice';
import { use, useCallback, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import { WS_KEY } from '../api/apiAuth';

export default function useNotifications() {
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
		`${WS_KEY}/ws/notification/user/`,
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

	const handleLoadMoreNotifications = useCallback(async () => {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data.next);
		setAllNotifications((prevNotifications) => {
			const notificationsIds = new Set(
				prevNotifications.map((notification) => notification.id)
			);
			const newNotifications = data.results.filter(
				(notification: Notification) => !notificationsIds.has(notification.id)
			);
			return [...prevNotifications, ...newNotifications];
		});
	}, [nextLink]);

	useEffect(() => {
		if (notificationsContaner.current) {
			if (
				notificationsContaner.current.scrollHeight <=
				notificationsContaner.current.clientHeight
			) {
				handleLoadMoreNotifications();
			}
		}
	}, [handleLoadMoreNotifications]);

	useEffect(() => {
		if (lastJsonMessage && lastJsonMessage.id) {
			setAllNotifications((prevNotifications) => {
				const filteredNotifications = prevNotifications.filter(
					(notification) => notification.id !== lastJsonMessage.id
				);
				return [lastJsonMessage, ...filteredNotifications];
			});
		}
	}, [lastJsonMessage]);

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

	return {
		allNotifications,
		notificationsContaner,
		handleScroll,
		isLoading,
		isNotificationsLoading,
	};
}
