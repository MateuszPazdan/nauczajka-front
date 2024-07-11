import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';

interface OpinionsPaginationProps {
	currentPage: number;
	pagesCount: number;
	nextPage: () => void;
	prevPage: () => void;
}

function OpinionsPagination({
	currentPage,
	pagesCount,
	nextPage,
	prevPage,
}: OpinionsPaginationProps) {
	return (
		<div>
			<div className='flex justify-center gap-2'>
				<ArrowButton disabled={Number(currentPage) <= 1} onClick={prevPage}>
					<FaAngleLeft />
				</ArrowButton>
				<span>{currentPage}</span>
				<span>z</span>
				<span>{pagesCount}</span>
				<ArrowButton
					disabled={Number(currentPage) >= pagesCount}
					onClick={nextPage}
				>
					<FaAngleRight />
				</ArrowButton>
			</div>
		</div>
	);
}

export default OpinionsPagination;

function ArrowButton({
	disabled,
	onClick,
	children,
}: {
	disabled: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	if (disabled) return null;
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={
				'text-black hover:text-mainHover cursor-pointer transition-colors'
			}
		>
			{children}
		</button>
	);
}
