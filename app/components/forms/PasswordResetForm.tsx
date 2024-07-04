'use client';

import { useForm } from 'react-hook-form';
import TextInput from '../TextInput';
import { validateEmail } from '@/app/utils/isInputCorrect';
import { useResetPasswordMutation } from '@/redux/features/authApiSlice';
import { GiConfirmed } from 'react-icons/gi';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface FormData {
	email: string;
}

function PasswordResetForm() {
	const route = useRouter();
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm<FormData>();
	const [resetPassword, { isLoading, isSuccess }] = useResetPasswordMutation();

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
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='relative flex justify-center items-center '
		>
			<div className='sm:w-[400px] md:w-[500px] w-5/6 sm400:w-2/3 sm:px-10 py-10 pb-16 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
				<div className='relative'>
					<p className='pb-5 text-2xl mt-4'>Resetowanie Hasła</p>
					<div className='absolute bottom-[21px] left-0 w-[240px] h-[2px] bg-mainPurple rounded-full'></div>
					<div className='absolute bottom-[21px] left-[172px] w-[76px] h-[2px] bg-mainPurple rounded-full'></div>
				</div>

				<TextInput
					register={register}
					// error={errors?.email?.message}
					label={'E-mail'}
					field={'email'}
					type={'email'}
					validateFunction={() => validateEmail(getValues().email)}
				/>

				<div className='mt-6'>
					<button type='submit' disabled={isLoading}>
						{isLoading ? <Spinner size='small' /> : 'Wyślij e-mail'}
					</button>
				</div>
			</div>
		</form>
	);
}

export default PasswordResetForm;
