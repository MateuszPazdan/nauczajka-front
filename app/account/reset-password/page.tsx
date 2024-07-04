import PasswordConfirmForm from '@/app/components/forms/PasswordConfirmForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Resetowanie hasła',
};

function Page() {
	return <PasswordConfirmForm />;
}

export default Page;
