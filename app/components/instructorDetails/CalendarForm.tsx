'use client';

import { useState } from 'react';
import Calendar from './Calendar';

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

	return (
		<div className='flex flex-row flex-wrap justify-between items-center'>
			<Calendar selected={selected} setSelected={setSelected} />
			{selected ? (
				<div className='flex flex-col w-1/2 h-full py-5'>
					{/* <p className='text-center text-lg '>
						{selected?.toLocaleDateString('pl-PL', {
							day: '2-digit',
							month: 'long',
							year: 'numeric',
						})}
					</p> */}
					<div className='flex flex-wrap gap-2 p-5'>
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
										{' - '}{new Date(sheduleObject?.end_time).getHours()}:
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
