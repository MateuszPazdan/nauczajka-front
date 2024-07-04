import { useLoginMutation } from '@/redux/features/authApiSlice';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormData {
	email: string;
	password: string;
}

export default function useLogin() {
	const router = useRouter();
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>();
	const [register, { isLoading }] = useLoginMutation();

	const onSubmit = (data: FormData) => {
		register({ email: data.email, password: data.password })
			.unwrap()
			.then(() => {
				toast.success('Zalogowano pomyślnie');
				router.push('/');
			})
			.catch(() => {
				toast.error('Niepoprawne dane logowania');
			});
	};

	return { formRegister, errors, getValues, isLoading, onSubmit, handleSubmit };
}
