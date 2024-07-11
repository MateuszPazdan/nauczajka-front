'use client';

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import StarRating from '../StarRating';
import EditFormBtn from '../instructors/EditFormBtn';
import { useMakeOpinionMutation } from '@/redux/features/instructorsApiSlice';

type FormData = {
	review: string;
};

function MakeTutorOpionion({
	instructorId,
	refetchOpinions,
}: {
	instructorId: number;
	refetchOpinions: any;
}) {
	const [makeOpinion, { isLoading }] = useMakeOpinionMutation();
	const [rating, setRating] = useState<null | number>(null);
	const [review, setReview] = useState<'' | string>('');
	const { register, handleSubmit } = useForm<FormData>();

	function onSubmit(data: any) {
		makeOpinion({
			review: data.review,
			rating: rating,
			tutor_id: instructorId,
		}).then(() => {
			setRating(null);
			setReview('');
			refetchOpinions();
			// window.location.reload();
		});
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col my-10 py-5 gap-5  rounded-md border-whiteHover sm400:px-10 px-2'
		>
			<div className='flex flex-row flex-wrap gap-2 justify-between'>
				<p className='text-xl'>Twoja opinia</p>
				<StarRating size='xl' setCurrRating={setRating} currRating={rating} />
			</div>

			<textarea
				{...register('review', {
					required: 'Wprowadź opinię.',
				})}
				value={review}
				onChange={(e) => setReview(e.target.value)}
				placeholder='Napisz opinię'
				className='w-full p-2 border-b-2 border-gray/20 max-h-48 focus:border-mainPurple active::border-mainPurple outline-none'
			/>

			<div className='flex justify-end'>
				<EditFormBtn
					type={'submit'}
					disabled={!rating || review == '' || isLoading}
				>
					{isLoading ? 'Wysyłanie...' : 'Wyślij'}
				</EditFormBtn>
			</div>
		</form>
	);
}

export default MakeTutorOpionion;
