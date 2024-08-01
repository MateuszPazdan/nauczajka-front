'use client';

import { useState } from 'react';
import { CiClock1 } from 'react-icons/ci';
import SelectRole from './SelectRole';
import ReservationElement from './ReservationElement';

function ReservationsListComponent() {
	const [role, setRole] = useState<'tutor' | 'student'>('tutor');

	return (
		<div className='mx-auto max-w-7xl '>
			<div className='flex flex-col w-full h-full max-w-[600px] pt-8 mx-auto px-2'>
				<span className='text-2xl text-center pt-5 text-main'>Rezerwacje</span>
				<div className='h-px rounded-md my-5 bg-whiteHover '></div>
				<SelectRole role={role} setRole={setRole} />
				<div className='h-px rounded-md my-5 bg-whiteHover '></div>
				<div className='mb-20'>
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
					<ReservationElement />
				</div>
			</div>
		</div>
	);
}

export default ReservationsListComponent;
