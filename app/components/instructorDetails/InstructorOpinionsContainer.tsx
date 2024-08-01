'use client';
import { CiStar } from 'react-icons/ci';
import StarRating from '../StarRating';
import MakeTutorOpionion from './MakeTutorOpionion';
import TutorInfoHeader from './TutorInfoHeader';
import TutorRatings from './TutorRatings';
import { useRetrieveOpinionsQuery } from '@/redux/features/instructorsApiSlice';
import { useState } from 'react';
import OpinionsPagination from './OpinionsPagination';
import Spinner from '../Spinner';

const OPINIONS_PAGE_SIZE = 15;

interface InstructorOpinionsComponentProps {
	instructorId: number;
}

function InstructorOpinionsContainer({
	instructorId,
}: InstructorOpinionsComponentProps) {
	const [page, setPage] = useState<number>(1);
	const {
		data: opinions,
		refetch: refetchOpinions,
		isLoading: isOpinionsLoading,
	} = useRetrieveOpinionsQuery({
		tutor_id: instructorId,
		page: page,
		page_size: OPINIONS_PAGE_SIZE,
	});

	return (
		<div className='mb-20'>
			<div className='flex flex-wrap gap-4 items-center justify-between '>
				<TutorInfoHeader
					icon={<CiStar />}
					label={`Opinie (${opinions?.count || 0})`}
				/>
				<div className='flex flex-row items-center gap-2 text-lg'>
					<p>{opinions?.avg_rating} </p>
					<StarRating
						size='xl'
						currRating={opinions?.avg_rating}
						readOnly={true}
					/>
				</div>
			</div>
			<MakeTutorOpionion
				instructorId={instructorId}
				refetchOpinions={refetchOpinions}
				setPage={() => setPage(1)}
			/>
			{!isOpinionsLoading ? (
				<>
					<TutorRatings opinions={opinions} />
					<OpinionsPagination
						currentPage={page}
						pagesCount={Math.ceil(opinions?.count / OPINIONS_PAGE_SIZE) || 1}
						nextPage={() => setPage((page) => page + 1)}
						prevPage={() => setPage((page) => page - 1)}
					/>
				</>
			) : (
				<Spinner size='medium' />
			)}
		</div>
	);
}

export default InstructorOpinionsContainer;
