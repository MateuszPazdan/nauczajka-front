import { useForm } from 'react-hook-form';
import Button from '../Button';
import { Dispatch, SetStateAction } from 'react';

function AddAnnouncementForm({
	setIsModalOpen,
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data: any) => {
        console.log(data);
    };
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col items-center'
		>
			<div className='flex items-center justify-center flex-wrap-reverse gap-2'>
				<Button
					type='button'
					onClick={() => setIsModalOpen(false)}
					className=' min-w-28'
				>
					Anuluj
				</Button>
				<Button type='submit' className=' min-w-28'>
					Dodaj
				</Button>
			</div>
		</form>
	);
}

export default AddAnnouncementForm;
