import { SubmitHandler, useForm } from 'react-hook-form';

import {
	validateEmail,
	validatePassword,
	validateRepeatPassword,
} from '../../utils/isInputCorrect';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import Spinner from '../Spinner';
import TextInput from '../TextInput';
import EditFormBtn from '../instructors/EditFormBtn';
import FileUploader from './FileUploader';
import {
	useCheckPasswordMutation,
	useUpdateUserMutation,
} from '@/redux/features/authApiSlice';

interface EditFormProps {
	setShowModal: React.Dispatch<React.SetStateAction<string | null>>;
	showModal: string | null;
}

interface FormValues {
	email?: string;
	newPassword?: string;
	repeatPassword?: string;
	password?: string;
}

function EditForm({ setShowModal, showModal }: EditFormProps) {
	const [updateUser, { isLoading: isUpdatePending }] = useUpdateUserMutation();
	const [checkPassword] = useCheckPasswordMutation();
	// const { deleteAccount, isAccountDeleting } = useDeleteUser();
	// const {
	// 	updateAvatar,
	// 	isUpdatePending: isUpdateAvatarPending,
	// 	isAvatarUpdated,
	// } = useUpdateAvatar();
	const [file, setFile] = useState<File | null>(null);
	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
	} = useForm();
	const handleChange = (file: File) => {
		setFile(file);
	};

	const onSubmit: SubmitHandler<FormValues> = (data) => {
		checkPassword(data.password)
			.unwrap()
			.then((password) => {
				if (password.password_matches === true) {
					if (showModal === 'image') {
						if (file !== null) {
							// updateAvatar(file);
						} else {
							toast.error('Wybierz zdjęcie.');
						}
					}
					if (showModal === 'password') {
						updateUser({
							fieldToUpdate: 'password',
							valueToUpdate: data.newPassword,
						})
							.unwrap()
							.then(() => {
								toast.success('Hasło zostało zmienione.');
								setShowModal(null);
							})
							.catch(() => {
								toast.error('Nieprawidłowe hasło.');
							});
					}
					if (showModal === 'deleteAccount') {
						// deleteAccount(data.password);
					}
				} else {
					toast.error('Nieprawidłowe hasło.');
					
				}
			});
	};

	// useEffect(() => {
	// 	if (isUserUpdated === true || isAvatarUpdated === true) {
	// 		setShowModal(null);
	// 	}
	// }, [isUserUpdated, setShowModal, isAvatarUpdated]);

	const isUpdateAvatarPending = false;
	const isAccountDeleting = false;

	return (
		<>
			{!isUpdateAvatarPending && !isAccountDeleting && !isUpdatePending ? (
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col items-center gap-5'
				>
					<div className='md:w-4/5 w-full flex flex-col gap-5'>
						{showModal === 'image' && (
							<div className=' mx-auto mb-2'>
								<FileUploader
									handleChange={handleChange}
									file={file}
									types={['JPG', 'PNG', 'GIF', 'JPEG']}
								/>
							</div>
						)}
						{showModal === 'email' && (
							<TextInput
								register={register}
								error={errors?.email?.message}
								label={'E-mail'}
								field={'email'}
								type={'email'}
								validateFunction={() => validateEmail(getValues().email)}
							/>
						)}
						{showModal === 'password' && (
							<>
								<TextInput
									register={register}
									error={errors?.password?.message}
									label={'Nowe Hasło'}
									field={'newPassword'}
									type={'password'}
									validateFunction={() =>
										validatePassword(getValues().newPassword)
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
											getValues().newPassword,
											getValues().repeatPassword
										)
									}
								/>
							</>
						)}

						{showModal !== 'image' && (
							<TextInput
								register={register}
								error={errors?.password?.message}
								label={'Aktualne Hasło'}
								field={'password'}
								type={'password'}
							/>
						)}
					</div>

					<div className='mt-6 flex flex-row flex-wrap-reverse gap-5 justify-center w-full'>
						<EditFormBtn type={'button'} onClick={() => setShowModal(null)}>
							Anuluj
						</EditFormBtn>
						<EditFormBtn
							// disabled={
							// 	isUpdatePending || isAccountDeleting || isUpdateAvatarPending
							// }
							type={'submit'}
						>
							{showModal === 'email' && 'Zmień E-mail'}
							{showModal === 'password' && 'Zmień Hasło'}
							{showModal === 'image' && 'Zmień Obraz'}
							{showModal === 'deleteAccount' && 'Usuń Konto'}
						</EditFormBtn>
					</div>
				</form>
			) : (
				<Spinner size='large' />
			)}
		</>
	);
}

export default EditForm;
