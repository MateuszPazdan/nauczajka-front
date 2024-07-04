'use client';
import Spinner from '@/app/components/Spinner';
import { useVerifyEmailMutation } from '@/redux/features/authApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

function Page() {
	const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
	const token = useSearchParams().get('token');
	const route = useRouter();

	function handleButton() {
		verifyEmail({ token })
			.unwrap()
			.then(() => {
				toast.success('E-mail został potwierdzony');
				route.push('/auth/login');
			})
			.catch(() => {
				toast.error(
					'Wystąpił błąd przy potwierdzaniu konta. Spróbuj ponownie.'
				);
			});
	}

	return (
		<div>
			<p>Stronka Do Potwierdzania E-mail</p>
			<button
				disabled={isLoading}
				onClick={handleButton}
				className='bg-mainPurple hover:bg-mainPurpleHover'
			>
				{isLoading ? <Spinner size='small' /> : 'Potwierdź'}
			</button>
		</div>
	);
}

export default Page;
