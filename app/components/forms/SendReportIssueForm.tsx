'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button';
import { useReportIssueMutation } from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

function SendReportIssueForm() {
	const router = useRouter();
	const [reportIssue, { isLoading }] = useReportIssueMutation();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const onSubmit = (data: any) => {
		reportIssue({ ...data })
			.unwrap()
			.then(() => {
				reset();
				toast.success('Zgłoszenie zostało wysłane');
				router.push('/');
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-full'
		>
			<div className='flex flex-col'>
				<span className='text-xl text-center pt-5 text-main'>
					Formularz zgłoszeniowy
				</span>
				<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			</div>
			<span className='flex flex-col gap-2'>
				<label htmlFor='category' className='text-md'>
					Kategoria
				</label>
				<select
					{...register('category')}
					name='category'
					required
					className='w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
				>
					<option value='naruszenie_regulaminu'>Naruszenie regulaminu</option>
					<option value='problem_techniczny'>Problem techniczny</option>
					<option value='prosba_o_pomoc'>Prośba o pomoc</option>
				</select>
			</span>
			<span className='flex flex-col gap-2'>
				<label htmlFor='title'>Tytuł</label>
				<input
					{...register('title', { required: 'Podaj tytuł' })}
					required
					type='text'
					name='title'
					className='w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
				/>
			</span>
			<span className='flex flex-col gap-2'>
				<label htmlFor='description'>Opis</label>
				<textarea
					{...register('description', { required: 'Podaj opis' })}
					required
					name='description'
					className='w-full max-h-36 min-h-28 p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
				></textarea>
			</span>
			<span className='text-mainSalmon'>
				{Object.values(errors)[0]?.message?.toString()}
			</span>
			<Button type={'button'} isLoading={isLoading}>
				Wyślij
			</Button>
		</form>
	);
}

export default SendReportIssueForm;
