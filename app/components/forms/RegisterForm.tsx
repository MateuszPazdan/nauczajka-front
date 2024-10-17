'use client';

import BackgroundContainer from '@/app/components/BackgroundContainer';
import TextInput from '@/app/components/TextInput';
import {
	validateEmail,
	validatePassword,
	validateRepeatPassword,
} from '@/app/utils/isInputCorrect';

import SelectInput from '@/app/components/SelectInput';
import useRegister from '@/app/hooks/useRegister';
import { useUserWidth } from '@/app/hooks/useUserWidth';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import { useAppSelector } from '@/redux/hooks';
import Spinner from '../Spinner';

function RegisterForm() {
	const width = useUserWidth();
	const {
		handleSubmit,
		formRegister,
		errors,
		getValues,
		isLoading,
		isTutor,
		handleRadioInputChange,
		onSubmit,
	} = useRegister();
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
				className='relative flex justify-center items-center md:py-10'
			>
				<div className='sm:w-[400px] md:w-[500px] px-0 w-5/6 sm400:w-2/3 sm:px-10 pb-10 pt-5 bg-white sm:shadow-myShadow shadow-shadowBlack rounded-xl gap-8 flex flex-col items-center'>
					<div className='relative'>
						<p className='pb-5 text-3xl mt-4'>Rejestracja</p>
						<div className='absolute bottom-[21.5px] left-0 w-[36px] h-[2.5px] bg-main rounded-full'></div>
						<div className='absolute bottom-[21.5px] left-14 w-[105px] h-[2.5px] bg-main rounded-full'></div>
						<div className='absolute bottom-[21.5px] left-[180px] w-[19px] h-[2.5px] bg-main rounded-full'></div>
					</div>

					<div className='flex  flex-row mx-auto gap-5 sm400:gap-10'>
						<SelectInput
							register={formRegister}
							field={'isTutor'}
							label={'Korepetytor'}
							value={'true'}
							onChange={handleRadioInputChange}
						/>
						<SelectInput
							register={formRegister}
							field={'isTutor'}
							label={'Uczeń'}
							value={'false'}
							onChange={handleRadioInputChange}
						/>
					</div>

					<TextInput
						register={formRegister}
						error={errors?.firstName?.message}
						label={'Imię'}
						field={'firstName'}
						type={'text'}
					/>

					<TextInput
						register={formRegister}
						error={errors?.lastName?.message}
						label={'Nazwisko'}
						field={'lastName'}
						type={'text'}
					/>

					<TextInput
						register={formRegister}
						error={errors?.email?.message}
						label={'E-mail'}
						field={'email'}
						type={'email'}
						validateFunction={() => validateEmail(getValues().email, isTutor)}
						info={
							isTutor === 'true' &&
							'Korepetytorzy mogą korzystać tylko z domeny @prz.edu.pl lub @stud.prz.edu.pl'
						}
					/>

					<TextInput
						register={formRegister}
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
						register={formRegister}
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

					<div className='mt-5'>
						<Button type={'submit'} isLoading={isLoading}>
							<span>Zarejestruj się</span>
						</Button>
					</div>
				</div>
			</form>
		</>
	);
}

export default RegisterForm;
