'use client';

import { useForm } from 'react-hook-form';
import { useResetPasswordMutation } from '@/redux/features/authApiSlice';
import { GiConfirmed } from 'react-icons/gi';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface FormData {
	email: string;
}

export default function usePasswordReset() {
	const route = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>();
	const [resetPassword, { isLoading }] = useResetPasswordMutation();

	const onSubmit = (data: FormData) => {
		resetPassword({ email: data.email })
			.unwrap()
			.then(() => {
				toast.success('E-mail do resetowania hasła został wysłany');
				route.push('/auth/login');
			})
			.catch(() => {
				toast.error('Wystąpił błąd przy resetowaniu hasła. Spróbuj ponownie.');
			});
	};
	return {
		register,
		handleSubmit,
		errors,
		getValues,
		isLoading,
		onSubmit,
	};
}
