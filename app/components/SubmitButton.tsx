'use client';

import { useFormStatus } from 'react-dom';
import Spinner from './Spinner';

export default function SubmitButton({
	children,
}: {
	children: React.ReactNode;
}) {
	const { pending } = useFormStatus();

	return (
		<button
			disabled={pending}
			className='px-6 py-2 rounded-xl text-white bg-main hover:bg-mainHover transition-colors duration-300'
		>
			{!pending ? children : <Spinner size='small' />}
		</button>
	);
}
