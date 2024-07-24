import { useState } from 'react';
import CalendarContainer from '../CalendarContainer';

function TutorShedule() {
	const [selected, setSelected] = useState<Date | undefined>(undefined);
	const highlightedDates: Date[] = [];

	return (
		<CalendarContainer
			selected={selected}
			setSelected={setSelected}
			highlightedDates={highlightedDates}
		/>
	);
}

export default TutorShedule;
