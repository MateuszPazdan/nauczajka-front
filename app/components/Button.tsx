import Link from 'next/link';
import { MouseEvent, ReactNode } from 'react';
import Spinner from './Spinner';

interface BaseProps {
	children: ReactNode;
	className?: string;
}

interface ButtonProps extends BaseProps {
	type: 'button' | 'submit';
	href?: never;
	disabled?: boolean;
	onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
	isLoading?: boolean;
}

interface LinkProps extends BaseProps {
	type: 'link';
	href: string;
	disabled?: never;
	onClick?: never;
	isLoading?: never;
}

type Props = ButtonProps | LinkProps;

function Button({
	children,
	type,
	href,
	disabled,
	onClick,
	isLoading,
	className,
}: Props) {
	const isButton = type === 'button' || type === 'submit';

	return (
		<>
			{isButton && (
				<button
					className={`px-6 py-2 rounded-xl text-white bg-main hover:bg-mainHover transition-colors duration-300 hover:cursor-pointer ${className}`}
					disabled={disabled || isLoading}
					onClick={onClick}
					type={type}
				>
					{isLoading ? (
						<span className='flex justify-center items-center'>
							<Spinner size='small' color='white' />
						</span>
					) : (
						children
					)}
				</button>
			)}
			{type === 'link' && (
				<Link
					href={href}
					className={`px-6 py-2 rounded-xl text-white bg-main hover:bg-mainHover transition-colors duration-300`}
				>
					{children}
				</Link>
			)}
		</>
	);
}

export default Button;
