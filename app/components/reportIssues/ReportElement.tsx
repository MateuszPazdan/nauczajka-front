import { Report } from '@/redux/features/authApiSlice';

function ReportElement({ report }: { report: Report }) {
	const { category, created_at, description, id, status, title, updated_at } =
		report;
	return (
		<div className='hover:bg-whiteHover p-2 rounded-md transition-colors duration-300'>
			<p>element</p>
		</div>
	);
}

export default ReportElement;
