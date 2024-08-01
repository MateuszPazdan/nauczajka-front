import { SheduleObject } from './CalendarForm';
import SheduleElement from './SheduleElement';

function SheduleList({ currentDay }: { currentDay: SheduleObject[] }) {
	return (
		<div className='flex flex-wrap gap-2 justify-center overflow-auto py-2'>
			{currentDay?.length > 0 ? (
				currentDay?.map((sheduleObject: SheduleObject) => {
					return (
						<SheduleElement
							key={sheduleObject.id}
							sheduleObject={sheduleObject}
						/>
					);
				})
			) : (
				<span>Brak wolnych terminów w tym dniu</span>
			)}
		</div>
	);
}

export default SheduleList;
