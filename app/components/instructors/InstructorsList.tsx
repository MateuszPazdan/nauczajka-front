import { getAllInstructorsAction } from '@/app/api/apiInstructors';
import { CiFileOff } from 'react-icons/ci';
import TutorElement from './TutorElement';
import { unstable_noStore as noStore } from 'next/cache';

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
	console.log(data.results);
	return (
		<div className='w-full h-full mx-auto py-5 flex flex-col gap-2 '>
			<div className='flex gap-2 h-full flex-col'>
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
		</div>
	);
}

export default InstructorsList;
