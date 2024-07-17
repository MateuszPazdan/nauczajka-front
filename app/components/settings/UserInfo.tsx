import { CiImageOn, CiMail, CiRead } from 'react-icons/ci';
import SettingsElement from './SettingsElement';
import { useState } from 'react';
import { IoTrashBinOutline } from 'react-icons/io5';
import { User } from '@/redux/features/authApiSlice';
import Modal from '../Modal';
import UserInfoBtn from './UserInfoBtn';
import EditForm from './EditForm';
import Image from 'next/image';
import { API_KEY } from '@/app/api/apiAuth';

function UserInfo({ user }: { user: User | undefined }) {
	const [showModal, setShowModal] = useState<string | null>(null);
	function handleModal(type: string | null) {
		setShowModal(type);
	}

	return (
		<div className='mx-auto w-full flex flex-col justify-center md:px-5'>
			<div className='flex flex-col flex-wrap items-center justify-center pb-6 px-10 text-2xl text-gray'>
				<div className='flex flex-col justify-center items-center gap-5'>
					<div className='relative' onClick={() => handleModal('image')}>
						<div className='relative aspect-square'>
							<Image
								loader={({ src }) => src}
								placeholder='blur'
								blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
								src={`${user?.profile_image}`}
								alt='User Avatar'
								width={80}
								height={80}
								className='w-20 border-white bg-white shadow-myShadow rounded-full'
							/>
						</div>
						<div className='absolute opacity-0 top-0 left-0 rounded-full h-full w-full hover:opacity-100 transition-all hover:bg-mainBlue/90 hover:cursor-pointer flex justify-center items-center'>
							<span className='text-white text-4xl'>
								<CiImageOn />
							</span>
						</div>
					</div>
					<p className=''>
						{user?.first_name} {user?.last_name}
					</p>
				</div>
				<div className='text-sm flex flex-row items-center gap-2'>
					<p>{user?.is_tutor ? 'Korepetytor' : 'Uczeń'}</p>
				</div>
			</div>
			<div className='flex flex-col gap-6 p-2 text-sm '>
				<SettingsElement
					hoverDisabled={true}
					labelIcon={<CiMail />}
					label={'E-mail'}
				>
					{user?.email}
				</SettingsElement>
				<SettingsElement
					label={'Hasło'}
					labelIcon={<CiRead />}
					onClick={() => handleModal('password')}
				>
					********
				</SettingsElement>
				<UserInfoBtn
					type={'dangerous'}
					onClick={() => handleModal('deleteAccount')}
				>
					<span className='text-xl'>
						<IoTrashBinOutline />
					</span>
					Usuń Konto
				</UserInfoBtn>
			</div>
			{showModal && (
				<Modal>
					<EditForm setShowModal={setShowModal} showModal={showModal} />
				</Modal>
			)}
		</div>
	);
}

export default UserInfo;
