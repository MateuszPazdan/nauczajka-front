import {
	CiBadgeDollar,
	CiDesktop,
	CiLocationOn,
	CiPen,
	CiSignpostDuo1,
	CiUser,
} from 'react-icons/ci';
import TrueElement from '../TrueElement';
import FalseElement from '../FalseElement';
import InfoElement from '../settings/InfoElement';
import TitleElement from '../settings/TitleElement';

function TutorInfoAboutSession({ tutorInfo }: any) {
	function TrueOrFalseElement(boolean: boolean) {
		if (boolean) return <TrueElement />;
		else return <FalseElement />;
	}

	return (
		<div className='flex flex-row flex-wrap gap-4 mt-6'>
			<InfoElement
				title={<TitleElement title={'Cena'} logo={<CiBadgeDollar />} />}
			>
				{tutorInfo?.price} zł/godz
			</InfoElement>
			<InfoElement
				title={<TitleElement title={'Lokalizacja'} logo={<CiLocationOn />} />}
			>
				{tutorInfo?.tutoring_location}
			</InfoElement>
			<InfoElement
				title={<TitleElement title={'Indywidualne'} logo={<CiUser />} />}
			>
				{TrueOrFalseElement(tutorInfo?.individual_sessions_available)}
			</InfoElement>
			<InfoElement
				title={<TitleElement title={'Grupowe'} logo={<CiSignpostDuo1 />} />}
			>
				{TrueOrFalseElement(tutorInfo?.group_sessions_available)}
			</InfoElement>
			<InfoElement
				title={<TitleElement title={'Stacjonarne'} logo={<CiPen />} />}
			>
				{TrueOrFalseElement(tutorInfo?.in_person_sessions_available)}
			</InfoElement>
			<InfoElement
				title={<TitleElement title={'Online'} logo={<CiDesktop />} />}
			>
				{TrueOrFalseElement(tutorInfo?.online_sessions_available)}
			</InfoElement>
		</div>
	);
}

export default TutorInfoAboutSession;
