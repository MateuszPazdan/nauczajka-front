'use client';

import { useLogoutMutation } from '@/redux/features/authApiSlice';
import { useAppDispatch } from '@/redux/hooks';
import { useRouter } from 'next/navigation';
import { logout as setLogout } from '@/redux/features/authSlice';
import { toast } from 'react-toastify';

export default function useLogout() {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const [logout] = useLogoutMutation();

	function handleLogout() {
		logout(undefined)
			.unwrap()
			.then(() => {
				dispatch(setLogout());
			})
			.finally(() => {
				toast.success('Wylogowano pomyślnie');
				router.push('/');
			});
	}
	return { handleLogout };
}
