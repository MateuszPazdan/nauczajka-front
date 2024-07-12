import { CiBullhorn, CiCircleInfo } from 'react-icons/ci';
import SettingsElement from '../settings/SettingsElement';
import TutorInfoHeader from './TutorInfoHeader';
import TutorInfoAboutSession from './TutorInfoAboutSession';

function TutorInfoContainer({ intructorDetails }: { intructorDetails: any }) {
	return (
		<>
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
		</>
	);
}

export default TutorInfoContainer;
