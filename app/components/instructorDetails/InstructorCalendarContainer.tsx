'use client';
import { CiCalendar } from 'react-icons/ci';
import TutorInfoHeader from './TutorInfoHeader';
import CalendarForm from './CalendarForm';
import { useRetrieveSheduleQuery } from '@/redux/features/instructorsApiSlice';
import Spinner from '../Spinner';

function InstructorCalendarContainer({
	instructorId,
}: {
	instructorId: number;
}) {
	const { data: shedule, isLoading } = useRetrieveSheduleQuery({
		tutor_id: instructorId,
	});
	return (
		<div>
			<TutorInfoHeader icon={<CiCalendar />} label={'Wolne terminy'} />
			{isLoading ? (
				<Spinner size='medium' />
			) : (
				<CalendarForm shedule={shedule} />
			)}
		</div>
	);
}

export default InstructorCalendarContainer;
