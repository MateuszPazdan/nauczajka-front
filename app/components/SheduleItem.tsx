import { IoTrashBinOutline } from 'react-icons/io5';
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
			className='relative px-5 py-2 bg-white shadow-md shadow-whiteHover rounded-sm  overflow-hidden'
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
			<div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center hover:bg-mainBlue/90 opacity-0 hover:opacity-100 transition-all hover: cursor-pointer'>
				<span className='text-2xl text-white'>
					<IoTrashBinOutline />
				</span>
			</div>
		</button>
	);
}

export default SheduleItem;
