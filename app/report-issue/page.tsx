import SendReportIssueForm from '../components/forms/SendReportIssueForm';
import YourReportsList from '../components/reportIssues/YourReportsList';
import RequireAuth from '../components/utils/RequireAuth';

export const metadata = {
	title: 'Zgłaszanie problemów',
};

async function Page() {
	return (
		<RequireAuth>
			<div className='flex flex-col items-center pt-10 min-h-full w-full  mx-auto px-2 gap-20'>
				<SendReportIssueForm />
				<YourReportsList />
			</div>
		</RequireAuth>
	);
}

export default Page;
