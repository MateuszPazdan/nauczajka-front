import useNotifications from '@/app/hooks/useNotifications';
import NotificationElement from '../NotificationElement';
import Spinner from '../Spinner';

function NotificationListComponent() {
	const {
		allNotifications,
		isNotificationsLoading,
		isLoading,
		handleScroll,
		notificationsContaner,
	} = useNotifications();
	return (
		<div
			ref={notificationsContaner}
			onScroll={handleScroll}
			className='overflow-y-scroll h-full'
		>
			<div className='flex flex-col gap-1  min-w-60 max-w-[500px] px-2 py-5 mx-auto rounded-md border-whiteHover'>
				<span className='text-2xl text-center pt-5 text-main'>
					Powiadomienia
				</span>
				<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
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
		</div>
	);
}

export default NotificationListComponent;
