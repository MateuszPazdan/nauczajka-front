import { useState } from 'react';
import MakeReservationForm from '../forms/MakeReservationForm';
import Modal from '../Modal';
import { SheduleObject } from './CalendarForm';

function SheduleElement({ sheduleObject }: { sheduleObject: SheduleObject }) {
	const [isOpen, setIsOpen] = useState(false);
	const [isReserved, setIsReserved] = useState(sheduleObject?.is_reserved);

	const handleClick = () => {
		setIsOpen((isOpen) => !isOpen);
	};
	console.log(sheduleObject);

	return (
		<>
			<button
				disabled={isReserved}
				onClick={handleClick}
				className='px-5 py-2 bg-white shadow-md shadow-whiteHover rounded-sm hover:cursor-pointer hover:bg-main hover:text-white transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-black'
			>
				{new Date(sheduleObject?.start_time).getHours()}:
				{String(new Date(sheduleObject?.start_time).getMinutes()).padStart(
					2,
					'0'
				)}
				{' - '}
				{new Date(sheduleObject?.end_time).getHours()}:
				{String(new Date(sheduleObject?.end_time).getMinutes()).padStart(
					2,
					'0'
				)}{' '}
			</button>
			{isOpen && (
				<Modal>
					<MakeReservationForm
						sheduleObject={sheduleObject}
						handleClick={handleClick}
                        setIsReserved={setIsReserved}
					/>
				</Modal>
			)}
		</>
	);
}

export default SheduleElement;
