import { useForm } from 'react-hook-form';
import { CiFileOff } from 'react-icons/ci';
import { toast } from 'react-toastify';
import EditFormBtn from '../instructors/EditFormBtn';
import Spinner from '../Spinner';
import AvailableSkillElement from './AvailableSkillElement';
import {
	TutorSkill,
	TutorSkills,
	useRetrieveAllTutorSkillsQuery,
	useSetTutorSkillsMutation,
} from '@/redux/features/instructorsApiSlice';

interface AddSkillsContainerProps {
	tutorSkills: string[] | undefined;
	setModalVisible: (value: boolean) => void;
	refetchTutorSkills: () => void;
}

function AddSkillsContainer({
	tutorSkills = [],
	setModalVisible,
	refetchTutorSkills,
}: AddSkillsContainerProps) {
	const { data: availableSkills } = useRetrieveAllTutorSkillsQuery();
	const [setTutorSkills, { isLoading }] = useSetTutorSkillsMutation();

	const addedSkills =
		availableSkills?.filter((newSkill) =>
			tutorSkills?.includes(newSkill.skill)
		) ?? [];

	const { register, handleSubmit } = useForm();

	function onSubmit(data: any) {
		const choosenSkills = [];
		for (const [key, value] of Object.entries(data)) {
			if (value === true) choosenSkills.push(key);
		}

		setTutorSkills(choosenSkills)
			.unwrap()
			.then(() => {
				toast.success('Dodano przedmiot.');
				setModalVisible(false);
				refetchTutorSkills();
			})
			.catch(() => {
				toast.error('Nie udało się dodać przedmiotu.');
			});
	}

	const isAddingSkillsPending = false;

	return !isAddingSkillsPending ? (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex justify-center flex-col gap-10'
		>
			<p className='text-2xl text-center'>Dodaj swoje przedmioty</p>
			<div className='flex flex-wrap gap-2 md:mx-10'>
				{availableSkills && availableSkills?.length > 0 ? (
					availableSkills?.map((skill) => (
						<AvailableSkillElement
							register={register}
							key={skill.skill}
							label={skill.skill}
							defaultChecked={addedSkills.includes(skill)}
						/>
					))
				) : (
					<div className='flex w-full flex-col gap-2 justify-center items-center'>
						<span className='text-2xl'>
							<CiFileOff />
						</span>
						<p className='text-center'>Brak przedmiotów.</p>
					</div>
				)}
			</div>
			<div className='mt-6 flex flex-row flex-wrap-reverse gap-5 justify-center w-full'>
				<EditFormBtn onClick={() => setModalVisible(false)} type={'button'}>
					Anuluj
				</EditFormBtn>
				<EditFormBtn type={'submit'}>Zatwierdź</EditFormBtn>
			</div>
		</form>
	) : (
		<Spinner size='medium' />
	);
}

export default AddSkillsContainer;
