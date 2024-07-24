import { isSameDay, isSameMonth } from 'date-fns';

interface RenderDayProps {
	date: any;
	highlightedDates: Date[];
	selected: Date | undefined;
	setSelected: () => void;
	disabled: boolean;
}

export default function renderDay({
	date,
	highlightedDates,
	selected,
	setSelected,
	disabled,
}: RenderDayProps) {
	const isHighlighted = highlightedDates?.some((highlightedDate) =>
		isSameDay(date.date, highlightedDate)
	);
	const isSelected = selected && isSameDay(date.date, selected);

	if (!isSameMonth(date.displayMonth, date.date)) return null;
	return (
		<>
			{disabled ? (
				<span className='opacity-50 w-10'>{date.date.getDate()}</span>
			) : (
				<button
					className={`relative rounded-md aspect-square w-9 flex justify-center items-center hover:bg-mainHover hover:text-white hover:cursor-pointer z-0 ${
						isSelected ? 'bg-main text-white' : ''
					} transition-all duration-300`}
					onClick={setSelected}
					disabled={disabled}
				>
					{date.date.getDate()}
					{isHighlighted ? (
						<p className='absolute right-1 top-1 -translate-y-1/2 translate-x-1/2 -z-10'>
							🎯
						</p>
					) : null}
				</button>
			)}
		</>
	);
}
