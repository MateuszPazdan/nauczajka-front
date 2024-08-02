import { Reservation } from '@/redux/features/instructorsApiSlice';
import { CiClock1 } from 'react-icons/ci';

function ReservationElement({ reservation }: { reservation: Reservation }) {
	const {
		schedule_item: { start_time, end_time, is_reserved },
	} = reservation;

	let first_name = '';
	let last_name = '';

	if (
		typeof reservation.user === 'object' &&
		'first_name' in reservation.user &&
		'last_name' in reservation.user
	) {
		first_name = reservation.user.first_name;
		last_name = reservation.user.last_name;
	} else if (
		typeof reservation.tutor === 'object' &&
		'first_name' in reservation.tutor &&
		'last_name' in reservation.tutor
	) {
		first_name = reservation.tutor.first_name;
		last_name = reservation.tutor.last_name;
	}

	return (
		<div className='flex flex-col w-full mx-auto justify-center sm500:flex-row sm500:justify-between items-center bg-white hover:bg-whiteHover duration-300 transition-colors py-5 sm500:py-2 px-2 sm500:px-4 rounded-md shadow-md mt-4 '>
			<div className='flex flex-col gap-2 text-center sm500:text-left'>
				<p className='text-xl '>
					{first_name} {last_name}
				</p>
				<p className='flex  items-center gap-2 text-sm text-gray'>
					<span>
						{new Date(start_time).toLocaleDateString('PL-pl', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</span>
					<span>
						<CiClock1 />
					</span>
					<span>
						{new Date(start_time).getHours()}.
						{String(new Date(start_time).getMinutes()).padStart(2, '0')}-
						{new Date(end_time).getHours()}.
						{String(new Date(end_time).getMinutes()).padStart(2, '0')}
					</span>
				</p>
			</div>

			<p className='px-4 py-2  rounded-[4px] text-white mt-4 sm500:mt-0'>
				{is_reserved ? (
					<span className='text-green-500'>Potwierdzone</span>
				) : (
					<span className='text-mainSalmon'>Niepotwierdzone</span>
				)}
			</p>
		</div>
	);
}

export default ReservationElement;
