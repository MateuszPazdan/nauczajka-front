'use client';

import {
	validatePassword,
	validateRepeatPassword,
} from '@/app/utils/isInputCorrect';
import TextInput from '../TextInput';
import Spinner from '../Spinner';
import usePasswordConfirm from '@/app/hooks/usePasswordConfirm';

function PasswordConfirmForm() {
	const { errors, getValues, handleSubmit, isLoading, onSubmit, register } =
		usePasswordConfirm();

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
					error={errors?.password?.message}
					label={'Hasło'}
					field={'password'}
					type={'password'}
					validateFunction={() => validatePassword(getValues().password)}
					info={
						'Hasło powinno składać sie z conajmniej 8 znaków (mała litera, duża litera, cyfra, znak specjalny)'
					}
				/>

				<TextInput
					register={register}
					error={errors?.repeatPassword?.message}
					label={'Powtórz Hasło'}
					field={'repeatPassword'}
					type={'password'}
					validateFunction={() =>
						validateRepeatPassword(
							getValues().password,
							getValues().repeatPassword
						)
					}
				/>

				<div className='mt-6'>
					<button type='submit'>
						{isLoading ? <Spinner size='small' /> : 'Resetuj Hasło'}
					</button>
				</div>
			</div>
		</form>
	);
}

export default PasswordConfirmForm;
