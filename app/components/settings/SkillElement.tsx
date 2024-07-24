import {
	TutorSkills,
	useSetTutorSkillsMutation,
} from '@/redux/features/instructorsApiSlice';
import { IoTrashBinOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';

function SkillElement({
	skill,
	tutorSkills,
	refetchTutorSkills,
}: {
	skill: string;
	tutorSkills: TutorSkills;
	refetchTutorSkills: () => void;
}) {
	const [setTutorSkills, { isLoading }] = useSetTutorSkillsMutation();

	function handleDeleteSkill() {
		const restSkills = tutorSkills?.skills.filter(
			(currSkill) => currSkill !== skill
		);

		setTutorSkills(restSkills)
			.unwrap()
			.then(() => {
				toast.success('Przedmiot został usunięty.');
				refetchTutorSkills();
			})
			.catch(() => {
				toast.error('Nie udało się usunąć przedmiotu.');
			});
	}

	return (
		<button
			onClick={handleDeleteSkill}
			className='relative bg-white p-2 shadow-sm shadow-black/25 rounded-md overflow-hidden'
			disabled={isLoading}
		>
			{isLoading ? (
				<Spinner size='small' />
			) : (
				<>
					<p>{skill}</p>
					<div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center hover:bg-mainBlue/90 opacity-0 hover:opacity-100 transition-all hover: cursor-pointer'>
						<span className='text-2xl text-white'>
							<IoTrashBinOutline />
						</span>
					</div>
				</>
			)}
		</button>
	);
}

export default SkillElement;
