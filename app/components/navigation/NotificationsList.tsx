import Spinner from '../Spinner';
import NotificationElement from '../NotificationElement';
import useNotifications from '../../hooks/useNotifications';

function NotificationsList() {
	const {
		allNotifications,
		handleScroll,
		isLoading,
		isNotificationsLoading,
		notificationsContaner,
	} = useNotifications();

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
