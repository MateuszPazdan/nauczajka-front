'use client';

import { useAppSelector } from '@/redux/hooks';
import { redirect } from 'next/navigation';
import Spinner from '../Spinner';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	if (isLoading) return <Spinner size='large' />;

	if (!isAuthenticated) {
		redirect('/auth/login');
	}

	return <>{children}</>;
}
