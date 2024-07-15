import {
	useLoginMutation,
	useRetrieveUserQuery,
} from '@/redux/features/authApiSlice';
import { setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface FormData {
	email: string;
	password: string;
}

export default function useLogin() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const {
		register: formRegister,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>();
	const [login, { isLoading }] = useLoginMutation();

	const onSubmit = (data: FormData) => {
		login({ email: data.email, password: data.password })
			.unwrap()
			.then(() => {
				dispatch(setAuth());
				toast.success('Zalogowano pomyślnie');
				router.push('/');
			})
			.catch(() => {
				toast.error('Niepoprawne dane logowania');
			});
	};

	return { formRegister, errors, getValues, isLoading, onSubmit, handleSubmit };
}
