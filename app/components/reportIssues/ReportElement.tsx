import { Report } from '@/redux/features/authApiSlice';

function ReportElement({ report }: { report: Report }) {
	const { category, created_at, description, id, status, title, updated_at } =
		report;
	return (
		<div className='flex flex-col gap-5 hover:bg-whiteHover p-2 rounded-md transition-colors duration-300'>
			<div className='flex flex-col md800:flex-row flex-wrap md800:justify-between gap-2'>
				<div className='flex flex-col gap-2 md800:justify-around'>
					<p className='text-md800 font-bold'>{title}</p>
					<p className='text-sm text-gray'>{category}</p>
				</div>
				<div className='flex flex-col gap-2 md800:items-center justify-between'>
					<p>
						{new Date(created_at).toLocaleDateString('pl-PL', {
							day: '2-digit',
							year: 'numeric',
							month: 'long',
						})}
					</p>
					<p className='md800:w-full w-fit rounded-md text-white p-1 bg-main text-center'>
						{status}
					</p>
				</div>
			</div>
			<p className='text-sm'>{description}</p>
		</div>
	);
}

export default ReportElement;
