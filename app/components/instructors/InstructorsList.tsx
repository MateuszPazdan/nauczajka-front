import { getAllInstructorsAction } from '@/app/api/apiInstructors';

async function InstructorsList({ searchParams }) {
	const data = await getAllInstructorsAction(searchParams);
	console.log(data);
	return <div></div>;
}

export default InstructorsList;
