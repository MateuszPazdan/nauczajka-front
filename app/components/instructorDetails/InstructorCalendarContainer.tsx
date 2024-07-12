import { CiCalendar } from 'react-icons/ci';
import TutorInfoHeader from './TutorInfoHeader';

function InstructorCalendarContainer() {
	return (
		<div>
			<TutorInfoHeader icon={<CiCalendar />} label={'Wolne terminy'} />
		</div>
	);
}

export default InstructorCalendarContainer;
