'use client';

import usePasswordReset from '@/app/hooks/usePasswordReset';
import Spinner from '../Spinner';
import TextInput from '../TextInput';
import { validateEmail } from '@/app/utils/isInputCorrect';
import Button from '../Button';

function PasswordResetForm() {
	const { errors, getValues, handleSubmit, isLoading, onSubmit, register } =
		usePasswordReset();
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='relative flex justify-center items-center '
		>
			<div className='sm:w-[400px] md:w-[500px] w-5/6 sm400:w-2/3 sm:px-10 py-10 pb-16 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
				<div className='relative'>
					<p className='pb-5 text-2xl mt-4'>Resetowanie hasła</p>
					<div className='absolute bottom-[21px] left-0 w-[240px] h-[2px] bg-main rounded-full'></div>
					<div className='absolute bottom-[21px] left-[172px] w-[76px] h-[2px] bg-main rounded-full'></div>
				</div>

				<TextInput
					register={register}
					error={errors?.email?.message}
					label={'E-mail'}
					field={'email'}
					type={'email'}
					validateFunction={() => validateEmail(getValues().email)}
				/>

				<div className='mt-6'>
					<button type='submit' disabled={isLoading}>
						{isLoading ? <Spinner size='small' /> : ''}
					</button>
					<Button type='submit' isLoading={isLoading}>
						Wyślij
					</Button>
				</div>
			</div>
		</form>
	);
}

export default PasswordResetForm;
