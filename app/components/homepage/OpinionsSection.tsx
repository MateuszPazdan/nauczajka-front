'use client';

import Opinion from './Opinion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

interface Rating {
	rating: number;
	review: string;
	created_at: string;
	student_first_name: string;
	student_last_name: string;
}

function OpinionsSection({ ratings }: { ratings: Rating[] }) {
	const [emblaRef, emblaApi] = useEmblaCarousel(
		{
			loop: true,
			align: 'center',
			slidesToScroll: 1,
			breakpoints: {
				'(min-width: 768px)': { slidesToScroll: 2 },
				'(min-width: 1024px)': { slidesToScroll: 3 },
			},
		},
		[Autoplay()]
	);
	console.log(ratings);

	return (
		<div className='bg-main pt-20 pb-32'>
			<div className='max-w-7xl mx-auto px-2 flex flex-col gap-14'>
				<p className='text-4xl sm:text-5xl mb-5S text-white font-semibold text-center'>
					Kilka słów od was
				</p>

				<div className='flex-grow overflow-hidden' ref={emblaRef}>
					<div className='flex touch-pan-y touch-pinch-zoom w-full md:w-full'>
						{ratings?.map((rating: Rating, id) => (
							<Opinion
								key={id}
								size={(id + 1) % 3 === 2 ? 'xl' : ''}
								imageUrl='/user.png'
								name={`${rating.student_first_name} ${rating.student_last_name}`}
								rating={rating.rating}
							>
								{rating.review}
							</Opinion>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OpinionsSection;
