import { useState } from 'react';
import CalendarContainer from '../CalendarContainer';
import { useRetrieveSheduleMeQuery } from '@/redux/features/instructorsApiSlice';
import Spinner from '../Spinner';
import { isSameDay } from 'date-fns';
import Button from '../Button';
import Shedule from '../Shedule';
import AddSheduleForm from './AddSheduleForm';
interface SheduleObject {
	id: number;
	start_time: string;
	end_time: string;
}

function TutorShedule() {
	const {
		data: shedule,
		isLoading,
		isFetching,
		refetch: refetchShedule,
	} = useRetrieveSheduleMeQuery();
	const [selected, setSelected] = useState<Date | undefined>(undefined);
	const [isAdding, setIsAdding] = useState<boolean>(false);
	const selectedShedule = shedule?.filter((sheduleObject: SheduleObject) => {
		return isSameDay(new Date(sheduleObject?.start_time), selected || '');
	});
	const highlightedDates: Date[] = shedule?.map(
		(sheduleObject: SheduleObject) => {
			return new Date(sheduleObject?.start_time);
		}
	);

	if (isLoading || isFetching) return <Spinner size='small' />;
	return (
		<div className='flex flex-col items-center mb-10'>
			<CalendarContainer
				selected={selected}
				setSelected={setSelected}
				highlightedDates={highlightedDates}
			/>
			{selected && (
				<div className='w-full flex flex-col gap-5'>
					{isAdding ? (
						<AddSheduleForm
							setIsAdding={setIsAdding}
							selected={selected}
							refetchShedule={refetchShedule}
						/>
					) : (
						<>
							<Shedule
								shedule={selectedShedule}
								refetchShedule={refetchShedule}
							/>
							<Button
								className='mx-auto'
								type='button'
								onClick={() => setIsAdding(true)}
							>
								Dodaj
							</Button>
						</>
					)}
				</div>
			)}
		</div>
	);
}

export default TutorShedule;
