import { CiStar } from 'react-icons/ci';

interface StarProps {
	fill?: boolean;
	onHoverIn?: () => void;
	onHoverOut?: () => void;
	onClick?: () => void;
	readOnly?: boolean;
	size?: 'md' | 'xl';
}

function Star({
	fill,
	onHoverIn,
	onHoverOut,
	onClick,
	readOnly,
	size,
}: StarProps) {
	return (
		<span
			className={` ${fill && ' text-mainSalmon '} ${
				!readOnly && ' hover:cursor-pointer '
			} ${
				size === 'md' ? ' text-lg ' : size === 'xl' ? ' text-2xl ' : null
			} transition-colors`}
			onMouseEnter={onHoverIn}
			onMouseLeave={onHoverOut}
			onClick={onClick}
		>
			<CiStar />
		</span>
	);
}

export default Star;
