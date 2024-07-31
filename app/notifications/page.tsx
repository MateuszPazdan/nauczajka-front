'use client';

import NotificationListComponent from '../components/notifications/NotificationListComponent';
import RequireAuth from '../components/utils/RequireAuth';

function Page() {
	return (
		<RequireAuth>
			<NotificationListComponent />
		</RequireAuth>
	);
}

export default Page;
