'use client';

import Spinner from '@/app/components/Spinner';
import useSocialAuth from '@/app/hooks/use-social-auth';
import { useSocialAuthenticateMutation } from '@/redux/features/authApiSlice';

function Page() {
	const [socialAuthenticate] = useSocialAuthenticateMutation();
	useSocialAuth(socialAuthenticate, 'google-oauth2');
	return (
		<div className='h-full'>
			<Spinner size='large' />
		</div>
	);
}

export default Page;
