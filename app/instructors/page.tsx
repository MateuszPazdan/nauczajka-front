import Pagination from '../components/Pagination';
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

function page({ searchParams }: SearchParams) {
	return (
		<div className='flex flex-col w-full h-full max-w-7xl pt-8 '>
			<Filters />
			<Suspense fallback={<Spinner size='large' />} key={searchParams}>
				<InstructorsList searchParams={searchParams} />;
			</Suspense>
		</div>
	);
}

export default page;
