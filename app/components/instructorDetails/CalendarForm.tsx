'use client';

import { useState } from 'react';
import CalendarContainer from '../CalendarContainer';

interface SheduleObject {
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
					<div className='flex flex-wrap gap-2 justify-center overflow-auto'>
						{currentDay?.length > 0 ? (
							currentDay?.map((sheduleObject: SheduleObject) => {
								return (
									<span
										key={sheduleObject.id}
										className='px-5 py-2 bg-white shadow-md shadow-whiteHover rounded-sm hover:cursor-pointer hover:bg-main hover:text-white transition-colors duration-300'
									>
										{new Date(sheduleObject?.start_time).getHours()}:
										{String(
											new Date(sheduleObject?.start_time).getMinutes()
										).padStart(2, '0')}
										{' - '}
										{new Date(sheduleObject?.end_time).getHours()}:
										{String(
											new Date(sheduleObject?.end_time).getMinutes()
										).padStart(2, '0')}{' '}
									</span>
								);
							})
						) : (
							<span>Brak wolnych terminów w tym dniu</span>
						)}
					</div>
				</div>
			) : (
				<span className='text-center w-1/2'>Wybierz dzień</span>
			)}
		</div>
	);
}

export default CalendarForm;
