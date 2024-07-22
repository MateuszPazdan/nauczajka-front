import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import TextInput from '../TextInput';
import EditFormBtn from '../instructors/EditFormBtn';
import Spinner from '../Spinner';

interface InfoModalContainerProps {
	setModal: any;
	modal: string;
	handleSetTutorInfo: any;
	tutorCurrentPrice: number;
	tutorCurrentLocation: string;
	isTutorInfoLoadingOrFetching: boolean;
}

function InfoModalContainer({
	setModal,
	modal,
	handleSetTutorInfo,
	tutorCurrentPrice,
	tutorCurrentLocation,
	isTutorInfoLoadingOrFetching,
}: InfoModalContainerProps) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();

	const onSubmit = (data: any) => {
		if (modal === 'price') {
			handleSetTutorInfo('price', data.price);
		}
		if (modal === 'location') {
			handleSetTutorInfo('tutoring_location', data.location);
		}
		setModal(null);
	};

	return (
		<>
			{!isTutorInfoLoadingOrFetching ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col items-center gap-5'
				>
					<div className='md:w-4/5 w-full flex flex-col gap-5'>
						{modal === 'price' && (
							<TextInput
								register={register}
								error={errors?.price?.message}
								label={'Cena'}
								field={'price'}
								type={'number'}
								validateFunction={() => {
									if (getValues().price < 0) return 'Wprowadź Dodatnią Wartość';
									else return true;
								}}
								initialValue={tutorCurrentPrice}
							/>
						)}
						{modal === 'location' && (
							<TextInput
								register={register}
								error={errors?.location?.message}
								label={'Lokalizacja'}
								field={'location'}
								type={'text'}
								initialValue={tutorCurrentLocation}
							/>
						)}
					</div>

					<div className='mt-6 flex flex-row flex-wrap-reverse gap-5 justify-center w-full'>
						<EditFormBtn type={'button'} onClick={() => setModal(null)}>
							Anuluj
						</EditFormBtn>
						<EditFormBtn type={'submit'}>
							{modal === 'price' ? 'Zmień cenę' : 'Zmień'}
						</EditFormBtn>
					</div>
				</form>
			) : (
				<Spinner size='large' />
			)}
		</>
	);
}

export default InfoModalContainer;
