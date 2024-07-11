'use client';
import { CiStar } from 'react-icons/ci';
import StarRating from '../StarRating';
import MakeTutorOpionion from './MakeTutorOpionion';
import TutorInfoHeader from './TutorInfoHeader';
import TutorRatings from './TutorRatings';
import { useRetrieveOpinionsQuery } from '@/redux/features/instructorsApiSlice';
import { useState } from 'react';
import OpinionsPagination from './OpinionsPagination';

const OPINIONS_PAGE_SIZE = 15;

interface InstructorOpinionsComponentProps {
	instructorId: number;
	intructorDetails: any;
}

function InstructorOpinionsComponent({
	instructorId,
	intructorDetails,
}: InstructorOpinionsComponentProps) {
	const [page, setPage] = useState(1);
	const { data: opinions, refetch: refetchOpinions } = useRetrieveOpinionsQuery(
		{
			tutor_id: instructorId,
			page: page,
			page_size: OPINIONS_PAGE_SIZE,
		}
	);

	return (
		<div>
			<div className='flex flex-wrap gap-4 items-center justify-between'>
				<TutorInfoHeader
					icon={<CiStar />}
					label={`Opinie (${opinions?.count || 0})`}
				/>
				<div className='flex flex-row items-center gap-2 text-lg'>
					<p>{intructorDetails?.avg_rating} </p>
					<StarRating
						size='xl'
						// currRating={1}
						currRating={intructorDetails?.avg_rating}
						readOnly={true}
					/>
				</div>
			</div>
			<MakeTutorOpionion
				instructorId={instructorId}
				refetchOpinions={refetchOpinions}
			/>
			<TutorRatings opinions={opinions} />
			<OpinionsPagination
				currentPage={page}
				pagesCount={Math.ceil(opinions?.count / OPINIONS_PAGE_SIZE) || 1}
				nextPage={() => setPage((page) => page + 1)}
				prevPage={() => setPage((page) => page - 1)}
			/>
		</div>
	);
}

export default InstructorOpinionsComponent;
