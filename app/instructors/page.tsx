import InstructorsList from '../components/instructors/InstructorsList';

export const metadata = {
	title: 'Korepetytorzy',
};

function page({ searchParams }) {
	return <InstructorsList searchParams={searchParams} />;
}

export default page;
