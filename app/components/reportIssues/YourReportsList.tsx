'use client';

import { useGetReportsQuery } from '@/redux/features/authApiSlice';
import ReportElement from './ReportElement';
import Spinner from '../Spinner';

function YourReportsList() {
	const { data: reports, isLoading: isReportsLoading } = useGetReportsQuery();

	return (
		<div className='flex flex-col w-full gap-5 max-w-[800px] pb-10'>
			<div className='flex flex-col max-w-[500px] mx-auto w-full'>
				<span className='text-xl text-center pt-5 text-main'>
					Twoje zgłoszenia
				</span>
				<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			</div>
			{!isReportsLoading ? (
				<>
					{reports && reports.length > 0 ? (
						reports
							.slice()
							.reverse()
							?.map((report) => (
								<ReportElement key={report.id} report={report} />
							))
					) : (
						<p className='text-center'>Brak zgłoszeń</p>
					)}
				</>
			) : (
				<Spinner size='medium' />
			)}
		</div>
	);
}

export default YourReportsList;
