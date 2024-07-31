import SendReportIssueForm from '../components/forms/SendReportIssueForm';

export const metadata = {
	title: 'Zgłaszanie problemów',
};

async function Page() {
	return (
		<div className='flex justify-center pt-10 min-h-full w-full max-w-[500px] mx-auto px-2'>
			<SendReportIssueForm />
		</div>
	);
}

export default Page;
