import { useForm } from 'react-hook-form';
import { CiFileOff } from 'react-icons/ci';
import EditFormBtn from './EditFormBtn';
import Checkbox from '../Checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface AddFilterContainerProps {
	setModalVisible: React.Dispatch<React.SetStateAction<any>>;
	setFilters: React.Dispatch<React.SetStateAction<any>>;
	filters: any;
	availableSkils: Skill[];
}

interface Skill {
	skill: string;
}
function AddFilterContainer({
	setModalVisible,
	setFilters,
	filters,
	availableSkils,
}: AddFilterContainerProps) {
	const availableSkills: Skill[] = availableSkils;
	const { register, handleSubmit } = useForm();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const params = new URLSearchParams(searchParams);

	function onSubmit(data: any) {
		const choosenSkills: string[] = [];

		for (const [key, value] of Object.entries(data)) {
			if (value === true) choosenSkills.push(key);
		}

		params.delete('skills');
		params.set('p', '1');
		choosenSkills.forEach((skill) => {
			params.append('skills', skill);
		});

		router.replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
		setFilters((prevFilters: any) => ({
			...prevFilters,
			skills: choosenSkills,
		}));

		console.log('Ustawiono filtr przedmiotów');
		setModalVisible(null);
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex justify-center flex-col gap-10'
		>
			<p className='text-2xl text-center'>Wybierz przedmioty</p>
			<div className='flex flex-wrap gap-2 md:mx-10'>
				{availableSkills?.length > 0 ? (
					availableSkills?.map((skill) => (
						<Checkbox
							register={register}
							key={skill.skill}
							defaultChecked={filters?.skills?.find(
								(el: string) => el === skill.skill
							)}
							label={skill.skill}
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
				<EditFormBtn onClick={() => setModalVisible(null)} type={'button'}>
					Anuluj
				</EditFormBtn>
				<EditFormBtn type={'submit'}>Zatwierdź</EditFormBtn>
			</div>
		</form>
	);
}

export default AddFilterContainer;
