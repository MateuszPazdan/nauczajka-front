'use client';

import { useState } from 'react';
import CalendarContainer from '../CalendarContainer';
import SheduleList from './SheduleList';

export interface SheduleObject {
	id: number;
	start_time: string;
	end_time: string;
}

function CalendarForm({ shedule }: { shedule: SheduleObject[] }) {
	const [selected, setSelected] = useState<Date | undefined>();
	const currentDay: any = shedule?.filter((sheduleObject: SheduleObject) => {
		return (
			new Date(sheduleObject?.start_time).toDateString() ===
			selected?.toDateString()
		);
	});
	const highlightedDates: Date[] = shedule.map(
		(sheduleObject: SheduleObject) => {
			return new Date(sheduleObject?.start_time);
		}
	);

	return (
		<div className='flex flex-col items-center justify-between md:flex-row gap-5'>
			<CalendarContainer
				selected={selected}
				setSelected={setSelected}
				highlightedDates={highlightedDates}
			/>
			{selected ? (
				<div className='w-full'>
					<SheduleList currentDay={currentDay} />
				</div>
			) : (
				<span className='text-center w-1/2'>Wybierz dzień</span>
			)}
		</div>
	);
}

export default CalendarForm;
