import { getAllInstructorsAction } from '@/app/api/apiInstructors';

interface SearchParams {
	query?: string;
	page?: string;
	[key: string]: string | undefined;
}

async function InstructorsList({ searchParams }: SearchParams) {
	const data = await getAllInstructorsAction(searchParams);
	console.log(data);
	return <div></div>;
}

export default InstructorsList;
