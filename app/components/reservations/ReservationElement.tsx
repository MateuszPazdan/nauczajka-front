import { CiClock1 } from 'react-icons/ci';

function ReservationElement() {
	const status = 'Zaakceptowano';
	const name = 'Mateusz';
	const surname = 'Pazdan';
	const startTime = new Date('2024-07-13T08:00:00');
	const endTime = new Date('2024-07-13T09:00:00');
	return (
		<div className='flex flex-col w-full mx-auto justify-center sm500:flex-row sm500:justify-between items-center bg-white hover:bg-whiteHover duration-300 transition-colors py-5 sm500:py-2 px-2 sm500:px-4 rounded-md shadow-md mt-4 '>
			<div className='flex flex-col gap-2 text-center sm500:text-left'>
				<p className='text-xl '>
					{name} {surname}
				</p>
				<p className='flex  items-center gap-2 text-sm text-gray'>
					<span>
						{startTime.toLocaleDateString('PL-pl', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</span>
					<span>
						<CiClock1 />
					</span>
					<span>
						{startTime.getHours()}.
						{String(startTime.getMinutes()).padStart(2, '0')}-
						{endTime.getHours()}.{String(endTime.getMinutes()).padStart(2, '0')}
					</span>
				</p>
			</div>

			<p className='px-4 py-2 bg-main rounded-[4px] text-white mt-4 sm500:mt-0'>
				{status}
			</p>
		</div>
	);
}

export default ReservationElement;
