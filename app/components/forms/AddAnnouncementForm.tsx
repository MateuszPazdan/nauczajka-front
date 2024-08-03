import { useForm } from 'react-hook-form';
import Button from '../Button';
import { Dispatch, SetStateAction, useState } from 'react';
import { CiCirclePlus, CiCircleRemove } from 'react-icons/ci';
import {
	useAddAnnouncementMutation,
	useGetAnnouncementsQuery,
} from '@/redux/features/instructorsApiSlice';
import { toast } from 'react-toastify';

function AddAnnouncementForm({
	setIsModalOpen,
}: {
	setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
		setValue,
	} = useForm();
	const [tags, setTags] = useState(['']);

	const [addAnnouncement, { isLoading: isAnnouncementIsLoading }] =
		useAddAnnouncementMutation();
	const { refetch: refetchAnnouncements } = useGetAnnouncementsQuery();

	const handleTagChange = (index: number, value: string) => {
		setTags((prevTags) =>
			prevTags.map((tag, i) => (i === index ? value : tag))
		);
	};

	const onSubmit = (data: any) => {
		addAnnouncement({
			tags: tags.map((tag) => ({ name: tag })),
			title: data.title,
			description: data.description,
		})
			.unwrap()
			.then(() => {
				toast.success('Dodano ogłoszenie');
				setIsModalOpen(false);
				reset();
				refetchAnnouncements();
			})
			.catch(() => {
				toast.error('Nie udało się dodać ogłoszenia');
			});
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-5 items-center w-full'
		>
			<div className='flex flex-col'>
				<span className='text-2xl text-center pt-5 text-main'>
					Dodaj ogłoszenie
				</span>
				<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			</div>
			<span className='flex flex-col gap-2 md800:w-2/3'>
				<label htmlFor='title'>Tytuł</label>
				<input
					{...register('title', { required: 'Podaj tytuł' })}
					type='text'
					id='title'
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
			<span className='flex flex-col gap-2 md800:w-2/3'>
				<label>Tagi</label>
				{tags.map((tag, index) => (
					<div key={index} className='relative'>
						{index === tags.length - 1 && (
							<>
								<div className='absolute text-3xl right-2 -bottom-10'>
									<button
										type='button'
										className={`text-mainSalmon ${index === 0 && 'hidden'}`}
										onClick={() =>
											setTags((prevTags) => {
												setValue(`tag${index}`, '');
												return prevTags.length > 1
													? prevTags.slice(0, -1)
													: prevTags;
											})
										}
									>
										<CiCircleRemove />
									</button>
									<button
										type='button'
										className={`text-green-500 ${
											tags.length === 10 && 'hidden'
										}`}
										onClick={() =>
											setTags((tags) =>
												tags.length < 10 ? [...tags, ''] : tags
											)
										}
									>
										<CiCirclePlus />
									</button>
								</div>
							</>
						)}
						<input
							{...register(`tag${index}`)}
							type='text'
							id={`tag${index}`}
							value={tag}
							onChange={(e) => handleTagChange(index, e.target.value)}
							className={`w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl transition-colors duration-300 border-shadowBlack focus:border-main`}
						/>
					</div>
				))}
			</span>
			<span className='flex flex-col gap-2 md800:w-2/3'>
				<label htmlFor='description'>Opis</label>
				<textarea
					{...register('description', { required: 'Podaj opis' })}
					id='description'
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
			<div className='flex items-center justify-center flex-wrap-reverse gap-2 pt-10'>
				<Button
					type='button'
					onClick={() => setIsModalOpen(false)}
					className=' min-w-28'
				>
					Anuluj
				</Button>
				<Button type='submit' className=' min-w-28'>
					Dodaj
				</Button>
			</div>
		</form>
	);
}

export default AddAnnouncementForm;
