import {
	getAllInstructorsWithoutFiltersAction,
	getInstructorDetailsAction,
} from '@/app/api/apiInstructors';
import InstructorOpinionsComponent from '@/app/components/instructorDetails/InstructorOpinionsComponent';
import TutorInfoAboutSession from '@/app/components/instructorDetails/TutorInfoAboutSession';
import TutorInfoHeader from '@/app/components/instructorDetails/TutorInfoHeader';
import TutorInfoPageHeader from '@/app/components/instructorDetails/TutorInfoPageHeader';
import SettingsElement from '@/app/components/settings/SettingsElement';
import { unstable_noStore } from 'next/cache';
import { CiBullhorn, CiCalendar, CiCircleInfo } from 'react-icons/ci';

interface Params {
	params: { instructorId: number };
}

export async function generateMetadata({ params }: Params) {
	const { first_name, last_name } = await getInstructorDetailsAction(
		params.instructorId
	);
	return { title: `${first_name} ${last_name}` };
}

// export const revalidate = 60;

export async function generateStaticParams() {
	const cabins = await getAllInstructorsWithoutFiltersAction();
	const ids = cabins.map((instructor: any) => ({
		instructor: String(instructor.id),
	}));
	return ids;
}

async function Page({ params }: Params) {
	unstable_noStore();
	const intructorDetails = await getInstructorDetailsAction(
		params.instructorId
	);

	return (
		<div className='py-10 h-full max-w-7xl mx-auto w-full'>
			<div className='mb-14'>
				<TutorInfoPageHeader tutorInfo={intructorDetails} />
			</div>
			<div className='max-w-4xl mx-auto px-2 flex flex-col gap-16'>
				<div className='flex flex-col gap-2'>
					<TutorInfoHeader icon={<CiCircleInfo />} label={'Opis'} />
					<SettingsElement hoverDisabled={true}>
						{intructorDetails?.description
							? intructorDetails?.description
							: 'Brak'}
					</SettingsElement>
				</div>
				<div className='flex flex-col gap-2'>
					<TutorInfoHeader icon={<CiBullhorn />} label={'Informacje'} />
					<TutorInfoAboutSession tutorInfo={intructorDetails} />
				</div>
				<div>
					<TutorInfoHeader icon={<CiCalendar />} label={'Wolne terminy'} />
					{/* <CalendarContainer
						readOnly={true}
						tutorShedule={intructorDetails?.tutor_schedule_items}
					/> */}
				</div>

				<InstructorOpinionsComponent instructorId={params.instructorId} intructorDetails={intructorDetails} />
			</div>
		</div>
	);
}

export default Page;
