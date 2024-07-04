import { useVerifyEmailMutation } from '@/redux/features/authApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

export default function useVerifyEmail() {
	const token = useSearchParams().get('token');
	const [verifyEmail, { isLoading }] = useVerifyEmailMutation();
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
	return {
		handleButton,
		isLoading,
	};
}
