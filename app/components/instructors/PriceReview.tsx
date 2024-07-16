import { useForm } from 'react-hook-form';
import EditFormBtn from './EditFormBtn';
import useSetIntructorsFilters from '@/app/hooks/useSetIntructorsFilters';
import { toast } from 'react-toastify';

interface PriceReviewProps {
	setModalVisible: React.Dispatch<React.SetStateAction<any>>;
	setFilters: React.Dispatch<React.SetStateAction<any>>;
	filters: any;
}

function PriceReview({
	setModalVisible,
	filters,
	setFilters,
}: PriceReviewProps) {
	const { register, handleSubmit } = useForm();
	const { setFilters: setIntructorsFilters } = useSetIntructorsFilters();

	function onSubmit(data: any) {
		if (data.avg_rating__gte !== '' && data.avg_rating__lte !== '')
			if (data.avg_rating__lte < data.avg_rating__gte) {
				toast.error('Minimalna ocena musi być większa od maksymalnej.');
				return null;
			}
		if (data.price__lte !== '' && data.price__gte !== '')
			if (data.price__lte < data.price__gte) {
				toast.error('Minimalna cena musi być większa od maksymalnej.');
				return null;
			}

		setIntructorsFilters(data, 'price_review');

		setFilters((prevFilters: any) => ({
			...prevFilters,
			avg_rating__gte: data.avg_rating__gte !== '' ? data.avg_rating__gte : '',
			avg_rating__lte: data.avg_rating__lte !== '' ? data.avg_rating__lte : '',
			price__gte: data.price__gte !== '' ? data.price__gte : '',
			price__lte: data.price__lte !== '' ? data.price__lte : '',
		}));
		setModalVisible(null);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex justify-center flex-col gap-10'
		>
			<div className='flex flex-col  justify-center gap-5  md:mx-10'>
				<p className='text-xl ml-2 sm:ml-6 md:ml-7 lg:ml-9'>Ocena</p>
				<div className='flex flex-row flex-wrap justify-center gap-5 mb-6'>
					<input
						min={1}
						max={5}
						type='number'
						placeholder='Ocena Od'
						className='w-full sm:w-5/12 p-2 border-2 border-whiteHover text-gray focus:outline-none focus:ring-0 rounded-xl focus:border-main'
						{...register('avg_rating__gte')}
						defaultValue={filters.avg_rating__gte}
					/>
					<input
						min={1}
						max={5}
						type='number'
						placeholder='Ocena Do'
						className='w-full sm:w-5/12 p-2 border-2 border-whiteHover text-gray focus:outline-none focus:ring-0 rounded-xl focus:border-main'
						{...register('avg_rating__lte')}
						defaultValue={filters.avg_rating__lte}
					/>
				</div>
				<p className='text-xl ml-2 sm:ml-6 md:ml-7 lg:ml-9'>Cena</p>
				<div className='flex flex-row flex-wrap justify-center gap-5 '>
					<input
						min={0}
						max={1000}
						type='number'
						placeholder='Cena Od'
						className='w-full sm:w-5/12 p-2 border-2 border-whiteHover text-gray focus:outline-none focus:ring-0 rounded-xl focus:border-main'
						{...register('price__gte')}
						defaultValue={filters.price__gte}
					/>
					<input
						min={0}
						max={1000}
						type='number'
						placeholder='Cena Do'
						className='w-full sm:w-5/12 p-2 border-2 border-whiteHover text-gray focus:outline-none focus:ring-0 rounded-xl focus:border-main'
						{...register('price__lte')}
						defaultValue={filters.price__lte}
					/>
				</div>
			</div>
			<div className='mt-6 flex flex-row flex-wrap-reverse gap-5 justify-center w-full'>
				<EditFormBtn onClick={() => setModalVisible(null)} type={'button'}>
					Anuluj
				</EditFormBtn>
				<EditFormBtn type={'submit'}>Zatwierdź</EditFormBtn>
			</div>
		</form>
	);
}

export default PriceReview;
