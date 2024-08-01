import { useState } from 'react';
import MakeReservationForm from '../forms/MakeReservationForm';
import Modal from '../Modal';
import { SheduleObject } from './CalendarForm';

function SheduleElement({ sheduleObject }: { sheduleObject: SheduleObject }) {
	const [isOpen, setIsOpen] = useState(false);

	const handleClick = () => {
		setIsOpen((isOpen) => !isOpen);
	};
    console.log(sheduleObject);

	return (
		<>
			<button
				onClick={handleClick}
				className='px-5 py-2 bg-white shadow-md shadow-whiteHover rounded-sm hover:cursor-pointer hover:bg-main hover:text-white transition-colors duration-300'
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
					/>
				</Modal>
			)}
		</>
	);
}

export default SheduleElement;
