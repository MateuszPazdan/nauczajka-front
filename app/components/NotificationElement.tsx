import { Notification } from '@/redux/features/authApiSlice';
import { API_KEY } from '../api/apiAuth';
import { GoDotFill } from 'react-icons/go';
import { useState } from 'react';

function NotificationElement({ notification }: { notification: Notification }) {
	const [isRead, setIsRead] = useState(notification.is_read);
	const diffTime =
		new Date().getTime() - new Date(notification.created_at).getTime();
	const days = Math.floor(diffTime / (1000 * 60 * 60 * 24));
	const hours = Math.floor(
		(diffTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
	);
	const minutes = Math.floor((diffTime % (1000 * 60 * 60)) / (1000 * 60));

	async function makeNotificationRead(notificationId: number) {
		const res = await fetch(
			`${API_KEY}/api/notification/is_read/${notificationId}/`,
			{
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ is_read: true }),
				credentials: 'include',
			}
		);
		if (res.ok) {
			setIsRead(true);
		}
	}

	return (
		<button
			onClick={() => {
				if (!isRead) {
					makeNotificationRead(notification.id);
				}
			}}
			key={notification.id}
		>
			<span className='p-2 text-left flex justify-between items-center hover:bg-whiteHover rounded-[4px] '>
				<span className='flex flex-col gap-1'>
					<span className='text-sm'>{notification.notification.message}</span>
					<span className='text-[12px] text-gray'>
						{days > 0
							? `${days} dni`
							: hours > 0
							? `${hours} godz.`
							: `${minutes} min.`}
					</span>
				</span>
				<span className='text-main text-sm'>
					{!isRead ? <GoDotFill /> : null}
				</span>
			</span>
		</button>
	);
}

export default NotificationElement;
