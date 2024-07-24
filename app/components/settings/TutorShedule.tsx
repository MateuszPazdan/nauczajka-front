import { useState } from 'react';
import CalendarContainer from '../CalendarContainer';
import { useRetrieveSheduleMeQuery } from '@/redux/features/instructorsApiSlice';
import Spinner from '../Spinner';
interface SheduleObject {
	id: number;
	start_time: string;
	end_time: string;
}

function TutorShedule() {
	const { data: shedule, isLoading, isFetching } = useRetrieveSheduleMeQuery();
	const [selected, setSelected] = useState<Date | undefined>(undefined);

	const highlightedDates: Date[] = shedule?.map(
		(sheduleObject: SheduleObject) => {
			return new Date(sheduleObject?.start_time);
		}
	);
	if (isLoading || isFetching) return <Spinner size='small' />;
	return (
		<div>
			<CalendarContainer
				selected={selected}
				setSelected={setSelected}
				highlightedDates={highlightedDates}
			/>
		</div>
	);
}

export default TutorShedule;
