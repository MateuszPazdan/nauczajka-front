'use client';

import { useState } from 'react';
import Star from './Star';

interface StarRatingProps {
	maxRating?: number;
	currRating?: number | null;
	setCurrRating?: (rating: number) => void;
	readOnly?: boolean;
	size?: 'md' | 'xl';
}

function StarRating({
	maxRating = 5,
	currRating,
	setCurrRating,
	readOnly,
	size = 'md',
}: StarRatingProps) {
	const [tempRating, setTempRating] = useState<null | number>(null);

	return (
		<div className={`flex items-center gap-2 `}>
			<div className='flex'>
				{Array.from({ length: maxRating }, (_, i) =>
					!readOnly ? (
						<Star
							key={i}
							fill={
								tempRating ? i < tempRating : i < Math.floor(currRating || 0)
							}
							onHoverIn={() => setTempRating(i + 1)}
							onHoverOut={() => setTempRating(null)}
							onClick={setCurrRating ? () => setCurrRating(i + 1) : undefined}
							size={size}
						/>
					) : (
						<Star
							key={i}
							fill={i < Math.floor(currRating || 0)}
							readOnly={true}
							size={size}
						/>
					)
				)}
			</div>
		</div>
	);
}

export default StarRating;
