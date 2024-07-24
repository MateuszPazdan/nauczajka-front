import Spinner from './Spinner';

interface SheduleObject {
	id: number;
	start_time: string;
	end_time: string;
}

function SheduleItem({
	sheduleObject,
	onClick,
	disabled,
}: {
	sheduleObject: SheduleObject;
	onClick?: () => void;
	disabled?: boolean;
}) {
	return (
		<button
			onClick={onClick ?? (() => {})}
			disabled={disabled}
			className='px-5 py-2 bg-white shadow-md shadow-whiteHover rounded-sm hover:cursor-pointer hover:bg-main hover:text-white transition-colors duration-300'
		>
			{disabled ? (
				<Spinner size='small' />
			) : (
				<>
					{new Date(sheduleObject?.start_time).getHours()}:
					{String(new Date(sheduleObject?.start_time).getMinutes()).padStart(
						2,
						'0'
					)}
					{' - '}
					{new Date(sheduleObject?.end_time).getHours()}:
					{String(new Date(sheduleObject?.end_time).getMinutes()).padStart(
						2,
						'0'
					)}{' '}
				</>
			)}
		</button>
	);
}

export default SheduleItem;
