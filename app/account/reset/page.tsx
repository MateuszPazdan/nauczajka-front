import PasswordResetForm from '@/app/components/forms/PasswordResetForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetowanie hasła',
};

function Page() {
	return <PasswordResetForm />;
}

export default Page;
