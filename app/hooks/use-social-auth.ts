import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch } from '@/redux/hooks';
import { setAuth } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

export default function useSocialAuth(authenticate: any, provider: string) {
	const { refetch } = useRetrieveUserQuery();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const searchParams = useSearchParams();
	const effectRan = useRef(false);

	useEffect(() => {
		const state = searchParams.get('state');
		const code = searchParams.get('code');

		if (state && code && !effectRan.current) {
			authenticate({ provider, state, code })
				.unwrap()
				.then(() => {
					dispatch(setAuth());
					refetch();
					toast.success('Zalogowano pomyślnie');
					router.push('/instructors');
				})
				.catch(() => {
					toast.error('Nie udało się zalogować');
					router.push('/auth/login');
				});
		}

		return () => {
			effectRan.current = true;
		};
	}, [authenticate, provider, searchParams, router, dispatch, refetch]);
}
