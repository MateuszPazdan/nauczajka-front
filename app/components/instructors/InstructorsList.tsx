import { getAllInstructorsAction } from '@/app/api/apiInstructors';
import { CiFileOff } from 'react-icons/ci';
import TutorElement from './TutorElement';
import { unstable_noStore as noStore } from 'next/cache';

interface SearchParams {
	query?: string;
	page?: string;
	[key: string]: string | undefined;
}

async function InstructorsList({ searchParams }: SearchParams) {
	noStore();
	const data = await getAllInstructorsAction(searchParams);
	console.log(data);
	return (
		<div className='w-full mx-auto py-5 flex flex-col gap-2 '>
			<div className='flex gap-2 flex-col p-2 rounded-md'>
				{data?.results?.length > 0 ? (
					data.results?.map((listEl) => (
						<TutorElement tutorInfo={listEl} key={listEl.id} />
					))
				) : (
					<div className='flex w-full flex-col gap-2 justify-center items-center'>
						<span className='text-2xl'>
							<CiFileOff />
						</span>
						<p className='text-center'>Brak korepetytorów na liście.</p>
					</div>
				)}
			</div>
		</div>
	);
}

export default InstructorsList;
