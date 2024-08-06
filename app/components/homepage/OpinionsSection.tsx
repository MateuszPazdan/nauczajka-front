'use client';

import { useEffect, useState } from 'react';
import Opinion from './Opinion';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

const opinions = [
	{
		name: 'Pawel Ochal',
		rating: 4,
		content:
			'Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto tempore, sequi eveniet, repellendus sit sapiente fugit cum dolorem voluptates dolore odit dolorum vero atque voluptate aspernatur quasi officiis exercitationem a!',
	},
	{
		name: 'Anna Nowak',
		rating: 5,
		content:
			'Suspendisse potenti. Nulla facilisi. Cras suscipit, lorem id fringilla lacinia, nulla libero cursus lectus, nec lobortis lorem justo nec magna.',
	},
	{
		name: 'Jan Kowalski',
		rating: 3,
		content:
			'Vivamus vestibulum sagittis sapien, eu fringilla felis fermentum eu. Aliquam erat volutpat. Maecenas non mauris auctor, tincidunt nulla in, consequat ligula.',
	},
	{
		name: 'Magdalena Wiśniewska',
		rating: 4,
		content:
			'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin venenatis tellus eget eros feugiat, non ultricies metus dignissim.',
	},
	{
		name: 'Michał Lewandowski',
		rating: 2,
		content:
			'Phasellus ultrices, est in condimentum facilisis, velit ex consequat libero, a laoreet felis libero non justo. Nunc fermentum, orci nec gravida tempor, turpis lectus laoreet libero, ut tincidunt ligula eros ac urna.',
	},
	{
		name: 'Michał Lewandowski',
		rating: 2,
		content:
			'Phasellus ultrices, est in condimentum facilisis, velit ex consequat libero, a laoreet felis libero non justo. Nunc fermentum, orci nec gravida tempor, turpis lectus laoreet libero, ut tincidunt ligula eros ac urna.',
	},
];

function OpinionsSection() {
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

	useEffect(() => {
		if (emblaApi) {
			console.log(emblaApi.slideNodes());
		}
	}, [emblaApi]);

	return (
		<div className='bg-main pt-20 pb-32'>
			<div className='max-w-7xl mx-auto px-2 flex flex-col gap-14'>
				<p className='text-4xl sm:text-5xl mb-5S text-white font-semibold text-center'>
					Kilka słów od was
				</p>

				<div className='flex-grow overflow-hidden' ref={emblaRef}>
					<div className='flex touch-pan-y touch-pinch-zoom w-full md:w-full'>
						{opinions.map((opinion, id) => (
							<Opinion
								key={id}
								size={((id + 1) % 3) === 2 ? 'xl' : ''}
								imageUrl='/user.png'
								name={opinion.name}
								rating={opinion.rating}
							>
								{opinion.content}
							</Opinion>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default OpinionsSection;
