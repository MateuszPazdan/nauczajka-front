'use client';
import { useForm } from 'react-hook-form';
import { useConfirmPasswordMutation } from '@/redux/features/authApiSlice';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

interface FormData {
	password: string;
	repeatPassword: string;
}

export default function usePasswordConfirm() {
	const token = useSearchParams().get('reset_token');
	const route = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>();
	const [confirmPassword, { isLoading }] = useConfirmPasswordMutation();

	const onSubmit = (data: FormData) => {
		confirmPassword({ token, password: data.password })
			.unwrap()
			.then(() => {
				toast.success('Hasło zostało zmienione');
				route.push('/auth/login');
			})
			.catch(() => {
				toast.error('Wystąpił błąd podczas zmiany hasła');
			});
	};

	return { register, handleSubmit, errors, getValues, isLoading, onSubmit };
}
