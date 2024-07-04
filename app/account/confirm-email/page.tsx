import VerifyEmailForm from '@/app/components/VerifyEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Potwierdź email',
};

function Page() {
	return <VerifyEmailForm />;
}

export default Page;
