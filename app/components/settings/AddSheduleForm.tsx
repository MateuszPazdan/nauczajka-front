import setTimeInDate from '@/app/utils/setTimeInDate';
import Button from '../Button';
import { useCreateSheduleMutation } from '@/redux/features/instructorsApiSlice';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

function AddSheduleForm({
	setIsAdding,
	selected,
	refetchShedule,
}: {
	setIsAdding: (value: boolean) => void;
	selected: Date;
	refetchShedule: () => void;
}) {
	const [createShedule, { isLoading }] = useCreateSheduleMutation();
	function handleAddShedule(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const start_time = e.currentTarget.start_time.value;
		const end_time = e.currentTarget.end_time.value;
		const start_date = setTimeInDate(selected, start_time);
		const end_date = setTimeInDate(selected, end_time);
		createShedule({ start_time: start_date, end_time: end_date })
			.unwrap()
			.then(() => {
				setIsAdding(false);
				refetchShedule();
			})
			.catch(() => {
				toast.error('Nie udało się dodać terminu');
			});
	}

	return (
		<form onSubmit={(e) => handleAddShedule(e)} className='flex flex-col gap-5 items-center'>
			<div className='flex flex-col gap-5'>
				<label htmlFor='start_time'>Godzina rozpoczęcia</label>
				<input type='time' id='start_time' name='start_time' required />
			</div>
			<div className='flex flex-col gap-5'>
				<label htmlFor='end_time'>Godzina zakończenia</label>
				<input type='time' id='end_time' name='end_time' required />
			</div>
			<div className='flex justify-center gap-5'>
				<Button
					type='button'
					onClick={(e) => {
						e.preventDefault();
						setIsAdding(false);
					}}
				>
					Anuluj
				</Button>
				<Button type='button' disabled={isLoading}>
					{isLoading ? <Spinner size='small' /> : 'Dodaj'}
				</Button>
			</div>
		</form>
	);
}

export default AddSheduleForm;
