import SendReportIssueForm from '../components/forms/SendReportIssueForm';
import YourReportsList from '../components/reportIssues/YourReportsList';

export const metadata = {
	title: 'Zgłaszanie problemów',
};

async function Page() {
	return (
		<div className='flex flex-col items-center pt-10 min-h-full w-full  mx-auto px-2 gap-20'>
			<SendReportIssueForm />
			<YourReportsList />
		</div>
	);
}

export default Page;
