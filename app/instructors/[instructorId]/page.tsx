import {
	getAllInstructorsWithoutFiltersAction,
	getInstructorDetailsAction,
} from '@/app/api/apiInstructors';
import InstructorCalendarContainer from '@/app/components/instructorDetails/InstructorCalendarContainer';
import InstructorOpinionsContainer from '@/app/components/instructorDetails/InstructorOpinionsContainer';
import TutorInfoContainer from '@/app/components/instructorDetails/TutorInfoContainer';
import TutorInfoPageHeader from '@/app/components/instructorDetails/TutorInfoPageHeader';

export const revalidate = 0;
interface Params {
	params: { instructorId: string };
}

export async function generateMetadata({ params }: Params) {
	const { first_name, last_name } = await getInstructorDetailsAction(
		Number(params.instructorId)
	);
	return { title: `${first_name} ${last_name}` };
}

export async function generateStaticParams() {
	const cabins = await getAllInstructorsWithoutFiltersAction();
	const ids = cabins.map((instructor: any) => ({
		instructor: String(instructor.id),
	}));
	return ids;
}

async function Page({ params }: Params) {
	const intructorDetails = await getInstructorDetailsAction(
		Number(params.instructorId)
	);

	return (
		<div className='py-10 h-full max-w-7xl mx-auto w-full '>
			<div className='mb-14'>
				<TutorInfoPageHeader tutorInfo={intructorDetails} />
			</div>
			<div className='max-w-4xl mx-auto px-2 flex flex-col gap-16'>
				<TutorInfoContainer intructorDetails={intructorDetails} />
				<InstructorCalendarContainer
					instructorId={Number(params.instructorId)}
				/>
				<InstructorOpinionsContainer
					instructorId={Number(params.instructorId)}
				/>
			</div>
		</div>
	);
}

export default Page;
