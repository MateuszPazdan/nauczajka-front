import { useState } from 'react';
import SettingsElement from './SettingsElement';
import { CiBullhorn, CiCalendar, CiCircleInfo, CiMedal } from 'react-icons/ci';
import TutorInfoHeader from '../instructorDetails/TutorInfoHeader';
import Modal from '../Modal';
import { useRetrieveTutorInfoQuery } from '@/redux/features/instructorsApiSlice';
import SkillsContainer from './SkillsContainer';

function TutorInfo() {
	// const { tutorShedule, refetchShedule } = useShowShedule();
	// const { data } = useGetDescription();
	const { data: tutorInfo } = useRetrieveTutorInfoQuery();
	const [showModal, setShowModal] = useState<string | null>(null);
	function handleModal(type: string | null) {
		setShowModal(type);
	}
	return (
		<div className='px-2 md:py-0 sm400:w-4/5 md:w-full md:px-5 mx-auto py-4'>
			<div className='mb-10'>
				<TutorInfoHeader icon={<CiCircleInfo />} label={'Opis'} />
				<SettingsElement onClick={() => handleModal('description')}>
					{tutorInfo?.description ? tutorInfo?.description : 'Brak'}
				</SettingsElement>
			</div>
			<div className='mb-10'>
				<TutorInfoHeader icon={<CiMedal />} label={'Umiejętności'} />
				<SkillsContainer />
			</div>
			<div className='mb-10'>
				<TutorInfoHeader icon={<CiBullhorn />} label={'Informacje'} />
				{/* <InfoContainer /> */}
			</div>
			<div>
				<TutorInfoHeader icon={<CiCalendar />} label={'Wolne terminy'} />
				{/* <CalendarContainer
					tutorShedule={tutorShedule}
					refetchShedule={refetchShedule}
				/> */}
			</div>

			{/* {showModal && (
				<Modal>
					<EditFormTutor
						showModal={showModal}
						setShowModal={setShowModal}
						description={data?.description}
					/>
				</Modal>
			)} */}
		</div>
	);
}

export default TutorInfo;
