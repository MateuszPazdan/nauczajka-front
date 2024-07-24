import { useDeleteSheduleByIdMutation } from '@/redux/features/instructorsApiSlice';
import SheduleItem from './SheduleItem';
import { toast } from 'react-toastify';

interface SheduleObject {
	id: number;
	start_time: string;
	end_time: string;
}

function Shedule({
	shedule,
	refetchShedule,
}: {
	shedule: SheduleObject[];
	refetchShedule: () => void;
}) {
	const [deleteSheduleById, { isLoading: isDeleting }] =
		useDeleteSheduleByIdMutation();

	function handleOnClick(sheduleId: number) {
		deleteSheduleById({ sheduleId })
			.unwrap()
			.then(() => {
				toast.success('Usunięto termin');
				refetchShedule();
			})
			.catch(() => {
				toast.error('Nie udało się usunąć terminu');
			});
	}

	return (
		<div className='flex flex-wrap gap-2 justify-center overflow-auto py-2'>
			{shedule?.length > 0 ? (
				shedule?.map((sheduleObject: SheduleObject) => {
					return (
						<SheduleItem
							key={sheduleObject.id}
							onClick={() => handleOnClick(sheduleObject.id)}
							sheduleObject={sheduleObject}
							disabled={isDeleting}
						/>
					);
				})
			) : (
				<p className='py-5'>Brak ustalonych godzin w tym dniu</p>
			)}
		</div>
	);
}

export default Shedule;
