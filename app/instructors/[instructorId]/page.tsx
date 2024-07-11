import { getInstructorDetailsAction } from '@/app/api/apiInstructors';
import TutorInfoAboutSession from '@/app/components/instructorDetails/TutorInfoAboutSession';
import TutorInfoHeader from '@/app/components/instructorDetails/TutorInfoHeader';
import TutorInfoPageHeader from '@/app/components/instructorDetails/TutorInfoPageHeader';
import SettingsElement from '@/app/components/settings/SettingsElement';
import { CiBullhorn, CiCalendar, CiCircleInfo, CiStar } from 'react-icons/ci';

async function Page({ params }) {
	const intructorDetails = await getInstructorDetailsAction(
		params.instructorId
	);
	console.log(intructorDetails);
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
				<div>
					<div className='flex flex-wrap gap-4 items-center justify-between'>
						<TutorInfoHeader icon={<CiStar />} label={'Opinie'} />
						<div className='flex flex-row items-center gap-2 text-lg'>
							<p>{intructorDetails?.avg_rating}</p>
							{/* <StarRating
								size='xl'
								currRating={intructorDetails?.avg_rating}
								readOnly={true}
							/> */}
						</div>
					</div>
					{/* <MakeTutorOpionion
						tutorId={params.instructorId}
						getTutorInfo={getTutorInfo}
					/>
					<TutorRatings tutorInfo={intructorDetails} /> */}
				</div>
			</div>
		</div>
	);
}

export default Page;
