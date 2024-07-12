'use client';

import { isPast } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { pl } from 'date-fns/locale';

function Calendar({
	selected,
	setSelected,
}: {
	selected: Date | undefined;
	setSelected: (date: Date | undefined) => void;
}) {
	return (
		<div className='w-1/2 flex justify-center'>
			<DayPicker
				locale={pl}
				mode='single'
				selected={selected}
				onSelect={setSelected}
				fromMonth={new Date()}
				fromDate={new Date()}
				disabled={(currDay: Date) => isPast(currDay)}
				toYear={new Date().getFullYear() + 1}
			/>
		</div>
	);
}

export default Calendar;
