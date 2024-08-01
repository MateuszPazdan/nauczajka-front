'use client';

import { useForm } from 'react-hook-form';
import Button from '../Button';
import {
	useGetReportsQuery,
	useReportIssueMutation,
} from '@/redux/features/authApiSlice';
import { toast } from 'react-toastify';

function SendReportIssueForm() {
	const [reportIssue, { isLoading }] = useReportIssueMutation();
	const { refetch } = useGetReportsQuery();
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
				refetch();
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 w-full max-w-[500px]'
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
					required
					name='category'
					className={`w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl  transition-colors duration-300 ${
						errors?.category?.message
							? 'border-mainSalmon'
							: 'border-shadowBlack focus:border-main'
					}`}
				>
					<option value='violation'>Naruszenie regulaminu</option>
					<option value='technical_issue'>Problem techniczny</option>
					<option value='help_request'>Prośba o pomoc</option>
				</select>
				<span className='text-mainSalmon'>
					{errors?.category?.message?.toString()}
				</span>
			</span>
			<span className='flex flex-col gap-2'>
				<label htmlFor='title'>Tytuł</label>
				<input
					{...register('title', { required: 'Podaj tytuł' })}
					type='text'
					name='title'
					className={`w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl transition-colors duration-300 ${
						errors?.title?.message
							? 'border-mainSalmon'
							: 'border-shadowBlack focus:border-main'
					}`}
				/>
				<span className='text-mainSalmon'>
					{errors?.title?.message?.toString()}
				</span>
			</span>
			<span className='flex flex-col gap-2'>
				<label htmlFor='description'>Opis</label>
				<textarea
					{...register('description', { required: 'Podaj opis' })}
					name='description'
					className={`w-full max-h-36 min-h-28 p-2 border-2 focus:outline-none focus:ring-0 rounded-xl transition-colors duration-300 ${
						errors?.description?.message
							? 'border-mainSalmon'
							: 'border-shadowBlack focus:border-main'
					}`}
				></textarea>
				<span className='text-mainSalmon'>
					{errors?.description?.message?.toString()}
				</span>
			</span>

			<Button type={'submit'} isLoading={isLoading}>
				Wyślij
			</Button>
		</form>
	);
}

export default SendReportIssueForm;
