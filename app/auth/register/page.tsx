import RegisterForm from '@/app/components/forms/RegisterForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Rejestracja',
};

function Page() {
	return <RegisterForm />;
}

export default Page;
