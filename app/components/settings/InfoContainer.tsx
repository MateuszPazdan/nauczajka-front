import {
	CiBadgeDollar,
	CiDesktop,
	CiLocationOn,
	CiPen,
	CiSignpostDuo1,
	CiUser,
} from 'react-icons/ci';
import InfoElement from './InfoElement';
import TitleElement from './TitleElement';
import { useState } from 'react';
import TrueElement from '../TrueElement';
import FalseElement from '../FalseElement';
import Modal from '../Modal';
import Spinner from '../Spinner';
import { useSetTutorInfoMutation } from '@/redux/features/instructorsApiSlice';
import { fi } from 'date-fns/locale';
import { toast } from 'react-toastify';
import InfoModalContainer from './InfoModalContainer';

interface InfoContainerProps {
	tutorInfo: any;
	refetchTutorInfo: () => void;
	isTutorInfoLoadingOrFetching: boolean;
}

function InfoContainer({
	tutorInfo,
	refetchTutorInfo,
	isTutorInfoLoadingOrFetching,
}: InfoContainerProps) {
	const [setTutorInfo, { isLoading: isSettingTutorInfo }] =
		useSetTutorInfoMutation();

	const [modal, setModal] = useState<string | null>(null);

	function handleSetTutorInfo(type: string, value: boolean | number | string) {
		setTutorInfo({ field: type, value: value })
			.unwrap()
			.then(() => {
				refetchTutorInfo();
			})
			.catch(() => {
				toast.error('Nie udało się zaktualizować informacji');
			});
	}

	return (
		<>
			{!isTutorInfoLoadingOrFetching ? (
				<div className='flex flex-row flex-wrap gap-4 mt-6'>
					<InfoElement
						onClick={() => setModal('price')}
						title={<TitleElement title={'Cena'} logo={<CiBadgeDollar />} />}
					>
						{tutorInfo?.price} zł/godz
					</InfoElement>
					<InfoElement
						onClick={() => setModal('location')}
						title={
							<TitleElement title={'Lokalizacja'} logo={<CiLocationOn />} />
						}
					>
						{tutorInfo?.tutoring_location}
					</InfoElement>
					<InfoElement
						onClick={() =>
							handleSetTutorInfo(
								'individual_sessions_available',
								!tutorInfo?.individual_sessions_available
							)
						}
						disabled={isSettingTutorInfo}
						title={<TitleElement title={'Indywidualne'} logo={<CiUser />} />}
						currentBoolean={tutorInfo?.individual_sessions_available}
					>
						{tutorInfo?.individual_sessions_available ? (
							<TrueElement />
						) : (
							<FalseElement />
						)}
					</InfoElement>
					<InfoElement
						onClick={() =>
							handleSetTutorInfo(
								'group_sessions_available',
								!tutorInfo?.group_sessions_available
							)
						}
						disabled={isSettingTutorInfo}
						title={<TitleElement title={'Grupowe'} logo={<CiSignpostDuo1 />} />}
						currentBoolean={tutorInfo?.group_sessions_available}
					>
						{tutorInfo?.group_sessions_available ? (
							<TrueElement />
						) : (
							<FalseElement />
						)}
					</InfoElement>
					<InfoElement
						onClick={() =>
							handleSetTutorInfo(
								'in_person_sessions_available',
								!tutorInfo?.in_person_sessions_available
							)
						}
						disabled={isSettingTutorInfo}
						title={<TitleElement title={'Stacjonarne'} logo={<CiPen />} />}
						currentBoolean={tutorInfo?.in_person_sessions_available}
					>
						{tutorInfo?.in_person_sessions_available ? (
							<TrueElement />
						) : (
							<FalseElement />
						)}
					</InfoElement>
					<InfoElement
						onClick={() =>
							handleSetTutorInfo(
								'online_sessions_available',
								!tutorInfo?.online_sessions_available
							)
						}
						disabled={isSettingTutorInfo}
						title={<TitleElement title={'Online'} logo={<CiDesktop />} />}
						currentBoolean={tutorInfo?.online_sessions_available}
					>
						{tutorInfo?.online_sessions_available ? (
							<TrueElement />
						) : (
							<FalseElement />
						)}
					</InfoElement>
				</div>
			) : (
				<div className='h-20 flex justify-center items-center'>
					<Spinner size='large' />
				</div>
			)}
			{modal && (
				<Modal>
					<InfoModalContainer
						setModal={setModal}
						modal={modal}
						handleSetTutorInfo={handleSetTutorInfo}
						tutorCurrentPrice={tutorInfo?.price}
						tutorCurrentLocation={tutorInfo?.tutoring_location}
						isTutorInfoLoadingOrFetching={isTutorInfoLoadingOrFetching}
					/>
				</Modal>
			)}
		</>
	);
}

export default InfoContainer;
