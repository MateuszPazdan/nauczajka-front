import Spinner from '../components/Spinner';
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

function page({ searchParams }: SearchParams) {
	return (
		<div className='flex flex-col h-full w-full max-w-7xl py-10 '>
			<p className='text-center'>pdsadsadas</p>
			<Suspense fallback={<Spinner size='large' />} key={searchParams}>
				<InstructorsList searchParams={searchParams} />;
			</Suspense>
		</div>
	);
}

export default page;
