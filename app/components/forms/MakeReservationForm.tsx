import { toast } from 'react-toastify';
import Button from '../Button';
import { SheduleObject } from '../instructorDetails/CalendarForm';
import DateShow from '../instructorDetails/DateShow';
import { useMakeReservationMutation } from '@/redux/features/instructorsApiSlice';

function MakeReservationForm({
	sheduleObject,
	handleClick,
}: {
	sheduleObject: SheduleObject;
	handleClick: () => void;
}) {
	const [makeReservation, { isLoading: isMakeReservationLoading }] =
		useMakeReservationMutation();

	const { id, start_time, end_time } = sheduleObject;

	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		makeReservation({ sheduleId: id })
			.unwrap()
			.then(() => {
				handleClick();
                toast.success('Termin został zarezerwowany');
			})
			.catch((err) => {
				toast.error(err.data.detail ?? 'Coś poszło nie tak');
			});
	}

	return (
		<form
			onSubmit={onSubmit}
			className='flex flex-col justify-center items-center md:py-6 '
		>
			<DateShow date={new Date(start_time)} />
			<div className='pb-5'>
				<p className='text-center'>
					{new Date(start_time).getHours()}:
					{String(new Date(start_time).getMinutes()).padStart(2, '0')}
					{' - '}
					{new Date(end_time).getHours()}:
					{String(new Date(end_time).getMinutes()).padStart(2, '0')}
				</p>
			</div>
			<div className='mt-6 flex gap-2'>
				<Button type={'button'} onClick={handleClick} className='w-1/2'>
					Anuluj
				</Button>
				<Button type={'submit'} className='w-1/2'>
					Rezerwuj
				</Button>
			</div>
		</form>
	);
}

export default MakeReservationForm;
