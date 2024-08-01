import ReservationsListComponent from '@/app/components/reservations/ReservationsListComponent';
import RequireAuth from '@/app/components/utils/RequireAuth';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Rezerwacje',
};

function Page() {
	return (
		<RequireAuth>
			<ReservationsListComponent />
		</RequireAuth>
	);
}

export default Page;
