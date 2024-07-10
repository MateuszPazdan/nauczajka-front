import { getAllInstructorsAction } from '@/app/api/apiInstructors';
import { CiFileOff } from 'react-icons/ci';
import TutorElement from './TutorElement';
import { unstable_noStore as noStore } from 'next/cache';
import Pagination from '../Pagination';

interface SearchParams {
	query?: string;
	page?: string;
	[key: string]: string | undefined;
}

export interface Tutor {
	id: number;
	first_name: string;
	last_name: string;
	profile_image: string;
	description: string;
	price: number;
	avg_rating: string;
	skills: string[];
	online_sessions_available: boolean;
	in_person_sessions_available: boolean;
	tutoring_location: string;
	individual_sessions_available: boolean;
	group_sessions_available: boolean;
}

async function InstructorsList({ searchParams }: SearchParams) {
	noStore();
	const data = await getAllInstructorsAction(searchParams);

	return (
		<div className='w-full h-full mx-auto py-2 flex flex-col '>
			<div className='flex h-full gap-2 flex-col pb-5'>
				{data?.results?.length > 0 ? (
					data.results?.map((tutor: Tutor) => (
						<TutorElement tutorInfo={tutor} key={tutor.id} />
					))
				) : (
					<div className='flex w-full h-full flex-col gap-3 justify-center items-center'>
						<span className='text-2xl'>
							<CiFileOff />
						</span>
						<p className='text-center'>
							Nie możemy znaleźć odpowiedniego korepetytora dla Ciebie.
						</p>
					</div>
				)}
			</div>
			<Pagination searchParams={searchParams} data={data} />
		</div>
	);
}

export default InstructorsList;
