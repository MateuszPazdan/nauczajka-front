import { format, isPast } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const renderDay = (date, highlightedDates) => {
	console.log(date.date);
	const isHighlighted = highlightedDates.some(
		(highlightedDate) =>
			format(highlightedDate, 'MM-dd') === format(date.date, 'MM-dd')
	);

	return (
		<div className='relative'>
			<p className='relative rounded-full aspect-square flex justify-center items-center hover:bg-main hover:cursor-pointer z-0'>
				{date.date.getDate()}
				{isHighlighted ? (
					<p className='absolute right-0 top-0 -z-10 opacity-70'>🎯</p>
				) : null}
			</p>
		</div>
	);
};

function CalendarContainer() {
	const [selected, setSelected] = useState<Date>();
	const highlightedDates = [
		new Date('2024-07-29'),
		new Date('2024-07-31'),
		new Date('2024-07-21'),
	];

	return (
		<div>
			<DayPicker
				mode='single'
				selected={selected}
				onSelect={setSelected}
				footer={
					selected
						? `Selected: ${selected.toLocaleDateString()}`
						: 'Pick a day.'
				}
				disabled={(currDay: Date) => isPast(currDay)}
				components={{ Day: (date) => renderDay(date, highlightedDates) }}
			/>
		</div>
	);
}

export default CalendarContainer;
