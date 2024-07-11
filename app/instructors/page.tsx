import { getAllSkillsAction } from '../api/apiInstructors';
import Spinner from '../components/Spinner';
import Filters from '../components/instructors/Filters';
import InstructorsList from '../components/instructors/InstructorsList';
import { Suspense } from 'react';

export const metadata = {
	title: 'Korepetytorzy',
};

interface SearchParams {
	query?: string;
	page?: string;
	[key: string]: string | undefined;
}

async function page({ searchParams }: SearchParams) {
	const availableSkils = await getAllSkillsAction();

	return (
		<div className='flex flex-col w-full h-full max-w-7xl pt-8 '>
			<Filters availableSkils={availableSkils} />
			<Suspense fallback={<Spinner size='large' />} key={searchParams}>
				<InstructorsList searchParams={searchParams} />;
			</Suspense>
		</div>
	);
}

export default page;
