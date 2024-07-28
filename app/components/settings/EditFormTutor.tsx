import { useForm } from 'react-hook-form';
import EditFormBtn from '../instructors/EditFormBtn';
import Spinner from '../Spinner';
import { useSetTutorInfoMutation } from '@/redux/features/instructorsApiSlice';
import { toast } from 'react-toastify';

interface EditFormTutorProps {
	setShowModal: (value: string | null) => void;
	showModal: string | null;
	description: string | undefined;
	refetchTutorInfo: () => void;
}

function EditFormTutor({
	setShowModal,
	showModal,
	description,
	refetchTutorInfo,
}: EditFormTutorProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const [setTutorInfo, { isLoading: isUpdateDescriptionPending }] =
		useSetTutorInfoMutation();

	const onSubmit = (data: any) => {
		if (showModal === 'description') {
			setTutorInfo({ field: 'description', value: data.description })
				.unwrap()
				.then(() => {
					toast.success('Opis został zaktualizowany');
					refetchTutorInfo();
					setShowModal(null);
				})
				.catch(() => {
					toast.error('Wystąpił błąd podczas aktualizacji opisu');
				});
		}
	};

	return (
		<>
			{!isUpdateDescriptionPending ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col items-center gap-5 w-full '
				>
					<div className='relative w-full flex flex-col justify-center sm:px-10'>
						{showModal === 'description' && (
							<>
								<textarea
									{...register('description', {
										required: 'Wprowadź Opis',
									})}
									className='w-full p-2 border-2 border-gray/20 rounded-md min-h-48 focus:border-main active::border-main ring-0 outline-none max-h-80'
									defaultValue={description}
								/>
								<p className='text-red-400 ml-2'>
									{errors?.description?.message?.toString()}
								</p>
								<p className='text-gray mt-2 text-sm text-center'>
									W opisie zalecamy podkreślenie swojego doświadczenia i
									umiejętności w sposób przekonujący dla potencjalnych klientów.
								</p>
							</>
						)}
					</div>

					<div className='mt-6 flex flex-row flex-wrap-reverse gap-5 justify-center w-full'>
						<EditFormBtn type={'button'} onClick={() => setShowModal(null)}>
							Anuluj
						</EditFormBtn>
						<EditFormBtn type={'submit'} disabled={isUpdateDescriptionPending}>
							{showModal === 'description' && 'Zmień Opis'}
						</EditFormBtn>
					</div>
				</form>
			) : (
				<Spinner size='medium' />
			)}
		</>
	);
}

export default EditFormTutor;
