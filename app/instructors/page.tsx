import InstructorsList from '../components/instructors/InstructorsList';

export const metadata = {
	title: 'Korepetytorzy',
};

interface SearchParams {
	query?: string;
	page?: string;
	[key: string]: string | undefined;
}

function page({ searchParams }: SearchParams) {
	return <InstructorsList searchParams={searchParams} />;
}

export default page;
