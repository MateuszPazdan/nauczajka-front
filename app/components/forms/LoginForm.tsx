'use client';

import BackgroundContainer from '@/app/components/BackgroundContainer';
import Spinner from '@/app/components/Spinner';
import TextInput from '@/app/components/TextInput';
import useLogin from '@/app/hooks/useLogin';
import { useUserWidth } from '@/app/hooks/useUserWidth';
import { validateEmail } from '@/app/utils/isInputCorrect';
import Link from 'next/link';

function LoginForm() {
	const width = useUserWidth();
	const { errors, formRegister, getValues, isLoading, onSubmit, handleSubmit } =
		useLogin();

	return (
		<>
			{width >= 640 && <BackgroundContainer />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative flex justify-center items-center md:py-10 '
			>
				<div className='sm:w-[400px] md:w-[500px] w-5/6 sm400:w-2/3 sm:px-10 pb-6 pt-5 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
					<div className='relative'>
						<p className='pb-5 text-2xl mt-4'>Logowanie</p>
						<div className='absolute bottom-[21px] left-0 w-[28px] h-[2px] bg-mainPurple rounded-full'></div>
						<div className='absolute bottom-[21px] left-11 w-[86px] h-[2px] bg-mainPurple rounded-full'></div>
					</div>

					<TextInput
						register={formRegister}
						error={errors?.email?.message}
						label={'E-mail'}
						field={'email'}
						type={'email'}
						validateFunction={() => validateEmail(getValues().email)}
					/>

					<div className='relative w-full'>
						<TextInput
							register={formRegister}
							error={errors?.password?.message}
							label={'Hasło'}
							field={'password'}
							type={'password'}
						/>
						<Link
							className={`flex hover:text-mainPurple hover:cursor-pointer absolute text-[12px] text-center  ${
								!errors.password && ' right-2 -bottom-6 '
							} ${
								errors.password &&
								' w-6 right-16 -bottom-[40px] sm:w-full sm:left-44 sm:-bottom-6'
							}`}
							href={'/account/reset'}
						>
							Zapomniałem hasła
						</Link>
					</div>

					<div className='mt-6'>
						<button type='submit' disabled={isLoading}>
							{isLoading ? <Spinner size='small' /> : 'Zaloguj się'}
						</button>
					</div>

					<Link href={'/auth/register'}>Zarejestruj się</Link>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
