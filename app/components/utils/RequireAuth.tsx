'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	if (isLoading) return <Spinner size='large' />;

	if (!isAuthenticated) {
		toast.error('Musisz być zalogowany, aby mieć dostęp do tej strony');
		redirect('/auth/login');
	}

	return <>{children}</>;
}
