'use client';

import { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useRegisterMutation } from '@/redux/features/authApiSlice';

interface FormData {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	repeatPassword: string;
	isTutor: string;
}

export default function useRegister() {
	const [isTutor, setisTutor] = useState('false');
	const router = useRouter();

	const [register, { isLoading }] = useRegisterMutation();
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>({
		defaultValues: { isTutor: 'false' },
	});

	function handleRadioInputChange(event: ChangeEvent<HTMLInputElement>) {
		setisTutor(event.target.value);
	}

	const onSubmit: SubmitHandler<FormData> = (data) => {
		console.log(data);
		register({
			email: data.email,
			first_name: data.firstName,
			is_tutor: data.isTutor === 'true',
			last_name: data.lastName,
			password: data.password,
		})
			.unwrap()
			.then(() => {
				toast.success(
					'Konto utworzone. Sprawdź swojego maila w celu aktywacji konta.'
				);
				router.push('/auth/login');
			})
			.catch((error) => {
				if (
					error &&
					typeof error.data === 'object' &&
					!Array.isArray(error.data)
				) {
					const values = Object.values(error.data);
					if (values.length > 0 && Array.isArray(values[0])) {
						const firstErrorMessage = values[0][0];
						toast.error(firstErrorMessage);
					}
				} else {
					toast.error('Wystąpił błąd podczas rejestracji.');
				}
			});
	};

	return {
		onSubmit,
		formRegister,
		handleRadioInputChange,
		errors,
		getValues,
		isLoading,
		handleSubmit,
		isTutor,
	};
}
