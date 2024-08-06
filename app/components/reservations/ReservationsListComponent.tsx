'use client';

import { useState } from 'react';

import SelectRole from './SelectRole';
import ReservationElement from './ReservationElement';
import { useGetUserReservationsQuery } from '@/redux/features/instructorsApiSlice';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import Spinner from '../Spinner';

function ReservationsListComponent() {
	const { data: user, isLoading: isUserLoading } = useRetrieveUserQuery();
	const [role, setRole] = useState<'tutor' | 'user'>('user');

	const { data: reservations, isLoading: isReservationsLoading } =
		useGetUserReservationsQuery({ role });
	const sortedReservations = reservations?.slice()?.sort((a, b) => {
		return (
			new Date(a.schedule_item.start_time).getTime() -
			new Date(b.schedule_item.start_time).getTime()
		);
	});

	return (
		<div className='mx-auto max-w-7xl '>
			<div className='flex flex-col w-full h-full max-w-[600px] pt-8 mx-auto px-2'>
				<span className='text-2xl text-center pt-5 text-main'>Rezerwacje</span>
				<div className='h-px rounded-md my-5 bg-whiteHover '></div>
				{isUserLoading ? (
					<Spinner size={'medium'} />
				) : (
					user?.is_tutor && (
						<>
							<SelectRole role={role} setRole={setRole} />{' '}
							<div className='h-px rounded-md my-5 bg-whiteHover '></div>
						</>
					)
				)}

				{isReservationsLoading ? (
					<Spinner size='medium' />
				) : (
					<div className='mb-20'>
						{sortedReservations?.map((reservation) => (
							<ReservationElement
								key={reservation.id}
								reservation={reservation}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}

export default ReservationsListComponent;
