import { isPast } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { pl } from 'date-fns/locale';
import renderDay from './RenderDay';

interface CalendarContainerProps {
	selected: Date | undefined;
	setSelected: (date: Date | undefined) => void;
	highlightedDates: Date[];
}

function CalendarContainer({
	selected,
	setSelected,
	highlightedDates,
}: CalendarContainerProps) {
	return (
		<div>
			<DayPicker
				locale={pl}
				mode='single'
				fromMonth={new Date()}
				fromDate={new Date()}
				toYear={new Date().getFullYear() + 1}
				components={{
					Day: (date) =>
						renderDay({
							date,
							highlightedDates,
							selected,
							setSelected: () => setSelected(date.date),
							disabled: isPast(date.date),
						}),
				}}
			/>
		</div>
	);
}

export default CalendarContainer;
