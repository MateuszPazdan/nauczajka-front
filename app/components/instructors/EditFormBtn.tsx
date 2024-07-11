'use client';
import { useFormStatus } from 'react-dom';

interface EditFormBtnProps {
	children: React.ReactNode;
	onClick?: () => void;
	type: 'submit' | 'button' | 'reset';
	disabled?: boolean;
}

function EditFormBtn({ children, onClick, type, disabled }: EditFormBtnProps) {
	const { pending } = useFormStatus();
	return (
		<button
			onClick={onClick}
			type={type}
			disabled={disabled || pending}
			className='w-1/3 min-w-40 bg-main hover:bg-mainHover text-white transition-colors shadow-myShadow py-3 rounded-md disabled:opacity-60'
		>
			{children}
		</button>
	);
}

export default EditFormBtn;
