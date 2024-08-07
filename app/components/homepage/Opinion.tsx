import Image from 'next/image';
import StarRating from '../StarRating';

function Opinion({
	size,
	rating,
	children,
	imageUrl,
	name,
}: {
	size: string;
	rating: number;
	children: string;
	imageUrl: string;
	name: string;
}) {
	return (
		<div
			className={`basis-full md:basis-1/2 lg:basis-1/3 flex-grow flex-shrink-0 px-3   `}
		>
			<div className='flex flex-col justify-around p-3 gap-5 bg-white rounded-md shadow-sm shadow-whiteHover'>
				<StarRating currRating={rating} readOnly={true} size='xl' />
				<p className='text-sm font-medium'>
					{children.length > 100 ? children.slice(0, 100) + '...' : children}
				</p>
				<div className='flex items-center gap-2'>
					<Image
						src={imageUrl}
						alt='Avatar użytkownika'
						width={42}
						height={42}
						className='rounded-full'
					/>
					<span className='text-gray'>{name}</span>
				</div>
			</div>
		</div>
	);
}

export default Opinion;
