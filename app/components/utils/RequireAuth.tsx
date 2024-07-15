'use client';

import { useAppSelector } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import Spinner from '../Spinner';
import { toast } from 'react-toastify';

interface RequireAuthProps {
	children: React.ReactNode;
}

export default function RequireAuth({ children }: RequireAuthProps) {
	const router = useRouter();
	const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

	if (isLoading) return <Spinner size='large' />;

	if (!isAuthenticated) {
		toast.error('Musisz być zalogowany, aby mieć dostęp do tej strony');
        router.push('/auth/login');
	}

	return <>{children}</>;
}
