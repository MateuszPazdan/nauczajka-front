import { useEffect } from 'react';
import { useVerifyTokenMutation } from '@/redux/features/authApiSlice';
import { finishInitialLoad, setAuth } from '@/redux/features/authSlice';
import { useAppDispatch } from '@/redux/hooks';

export default function useVerify() {
	const [verifyToken] = useVerifyTokenMutation();
	const dispatch = useAppDispatch();

	useEffect(() => {
		verifyToken(undefined)
			.unwrap()
			.then(() => {
				dispatch(setAuth());
			})
			.finally(() => {
				dispatch(finishInitialLoad());
			});
	}, [dispatch, verifyToken]);
}
