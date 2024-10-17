import { getAllSkillsAction } from '../api/apiInstructors';
import Spinner from '../components/Spinner';
import Filters from '../components/instructors/Filters';
import InstructorsList from '../components/instructors/InstructorsList';
import { Suspense } from 'react';

export const metadata = {
	title: 'Korepetytorzy',
};

interface SearchParams {
	searchParams: { query?: string; page?: string; [key: string]: any };
}

export const revalidate = 60;

async function page({ searchParams }: SearchParams) {
	const availableSkils = await getAllSkillsAction();
	return (
		<div className='flex flex-col w-full max-w-7xl pt-8 mx-auto mb-10'>
			<Filters availableSkils={availableSkils} />
			<Suspense
				fallback={<Spinner size='large' />}
				key={JSON.stringify(searchParams)}
			>
				<InstructorsList searchParams={searchParams} />
			</Suspense>
		</div>
	);
}

export default page;
