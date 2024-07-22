import { format, isPast } from 'date-fns';
import { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

const renderDay = (date, highlightedDates) => {
	const dateString = format(date, 'yyyy-MM-dd');
	const isHighlighted = highlightedDates.some(
		(d) => format(d, 'yyyy-MM-dd') === dateString
	);
	return (
		<div
			style={{
				position: 'relative',
				display: 'inline-block',
				width: '100%',
				height: '100%',
			}}
		>
			{isHighlighted ? (
				<span role='img' aria-label='highlighted'>
					🎉
				</span>
			) : null}
			<div>{date.getDate()}</div>
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
