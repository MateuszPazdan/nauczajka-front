import { useForm } from 'react-hook-form';
import Checkbox from '../Checkbox';
import EditFormBtn from './EditFormBtn';
import useSetIntructorsFilters from '@/app/hooks/useSetIntructorsFilters';

interface SessionMethodsProps {
	setModalVisible: React.Dispatch<React.SetStateAction<any>>;
	setFilters: React.Dispatch<React.SetStateAction<any>>;
	filters: any;
}

function SessionMethods({
	setModalVisible,
	filters,
	setFilters,
}: SessionMethodsProps) {
	const { register, handleSubmit } = useForm();
	const { setFilters: setIntructorsFilters } = useSetIntructorsFilters();

	function onSubmit(data: any) {
		let instructorsFilters = {};
		for (const [key, value] of Object.entries(data)) {
			if (value === true) {
				if (key === 'Indywidualnie')
					instructorsFilters = {
						...instructorsFilters,
						individual_sessions_available: true,
					};
				if (key === 'Grupowo')
					instructorsFilters = {
						...instructorsFilters,
						group_sessions_available: true,
					};
				if (key === 'Stacjonarnie')
					instructorsFilters = {
						...instructorsFilters,
						in_person_sessions_available: true,
					};
				if (key === 'Online')
					instructorsFilters = {
						...instructorsFilters,
						online_sessions_available: true,
					};
			}
		}
		setIntructorsFilters(instructorsFilters, 'sessionMethods');
		setFilters((prevFilters: any) => ({
			...prevFilters,
			individual_sessions_available: data.Indywidualnie === true ? true : '',
			group_sessions_available: data.Grupowo === true ? true : '',
			in_person_sessions_available: data.Stacjonarnie === true ? true : '',
			online_sessions_available: data.Online === true ? true : '',
		}));

		console.log('Ustawiono filtr metodyki nauczania.');
		setModalVisible(null);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex justify-center flex-col gap-10'
		>
			<p className='text-2xl text-center'>Wybierz Metodykę Nauczania</p>
			<div className='flex flex-wrap justify-center gap-2 md:mx-10'>
				<Checkbox
					label={'Indywidualnie'}
					defaultChecked={filters.individual_sessions_available}
					register={register}
				/>
				<Checkbox
					label={'Grupowo'}
					defaultChecked={filters.group_sessions_available}
					register={register}
				/>
				<Checkbox
					label={'Stacjonarnie'}
					defaultChecked={filters.in_person_sessions_available}
					register={register}
				/>
				<Checkbox
					label={'Online'}
					defaultChecked={filters.online_sessions_available}
					register={register}
				/>
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

export default SessionMethods;
