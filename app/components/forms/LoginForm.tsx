'use client';

import BackgroundContainer from '@/app/components/BackgroundContainer';
import TextInput from '@/app/components/TextInput';
import useLogin from '@/app/hooks/useLogin';
import { useUserWidth } from '@/app/hooks/useUserWidth';
import { validateEmail } from '@/app/utils/isInputCorrect';
import Link from 'next/link';
import Button from '../Button';
import { FcGoogle } from 'react-icons/fc';
import { continueWithGoogle } from '@/app/utils';
import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Spinner from '../Spinner';

function LoginForm() {
	const width = useUserWidth();
	const { errors, formRegister, getValues, isLoading, onSubmit, handleSubmit } =
		useLogin();
	const { isAuthenticated, isLoading: isAuthenticating } = useAppSelector(
		(state) => state.auth
	);
	const router = useRouter();
	if (isAuthenticating) return <Spinner size='large' />;

	if (isAuthenticated) router.push('/');

	return (
		<>
			{width >= 640 && <BackgroundContainer />}
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='relative flex justify-center items-center md:py-10 '
			>
				<div className='sm:w-[400px] md:w-[500px] w-full  sm:px-10 pb-6 pt-5 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
					<div className='relative'>
						<p className='pb-5 text-3xl mt-4'>Logowanie</p>
						<div className='absolute bottom-[21px] left-0 w-[36px] h-[2px] bg-main rounded-full'></div>
						<div className='absolute bottom-[21px] left-14 w-[108px] h-[2px] bg-main rounded-full'></div>
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
							className={`flex hover:text-main hover:cursor-pointer absolute text-[12px] text-center  ${
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
						<Button type={'submit'} isLoading={isLoading}>
							<span>Zaloguj się</span>
						</Button>
					</div>

					<div className='flex flex-col w-full items-center gap-3'>
						<div className='relative w-full h-[2px] bg-whiteHover rounded-full my-5'>
							<span className='absolute -top-3 px-5 left-1/2 -translate-x-1/2 bg-white'>
								{/* lub */}
							</span>
						</div>

						<button onClick={continueWithGoogle} type='button'>
							<span className='flex gap-4 items-center text-sm hover:bg-whiteHover transition-colors p-2 rounded-md hover:cursor-pointer'>
								<FcGoogle className='text-3xl' />
								{/* <span>Użyj konta Google</span> */}
							</span>
						</button>
					</div>

					<p className='text-sm'>
						Nie masz konta?{' '}
						<Link
							className='text-mainSalmon hover:text-mainSalmonHover'
							href={'/auth/register'}
						>
							Zarejestruj się
						</Link>
					</p>
				</div>
			</form>
		</>
	);
}

export default LoginForm;
