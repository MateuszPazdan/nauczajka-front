'use client';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import useVerify from '@/app/hooks/useVerify';

export default function ToastProvider() {
	useVerify();
	return <ToastContainer position='top-center' autoClose={2000} limit={3} />;
}
