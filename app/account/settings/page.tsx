'use client';

import Spinner from '@/app/components/Spinner';
import TutorInfo from '@/app/components/settings/TutorInfo';
import UserInfo from '@/app/components/settings/UserInfo';
import RequireAuth from '@/app/components/utils/RequireAuth';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

function Page() {
	const { data: user, isLoading } = useRetrieveUserQuery();

	return (
		<RequireAuth>
			{isLoading ? (
				<Spinner size='large' />
			) : (
				<div className='max-w-7xl mx-auto w-full'>
					{user?.is_tutor === true ? (
						<div className='flex flex-wrap justify-center w-full flex-row pt-10'>
							<div className='min-w-64 sm400:w-4/5 md:w-2/5 md:px-2 w-full mx-auto'>
								<UserInfo user={user} />
							</div>
							<div className='w-full  md:w-3/5 '>
								<TutorInfo />
							</div>
						</div>
					) : (
						<div className='w-full mx-auto sm400:w-2/3 md:w-96'>
							<UserInfo user={user} />
						</div>
					)}
				</div>
			)}
		</RequireAuth>
	);
}

export default Page;
