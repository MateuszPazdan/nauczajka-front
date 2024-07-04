'use client';

import Spinner from '@/app/components/Spinner';
import useVerifyEmail from '@/app/hooks/useVerifyEmail';
import { CiAt } from 'react-icons/ci';

function VerifyEmailForm() {
	const { isLoading, handleButton } = useVerifyEmail();
	return (
		<div className='flex justify-center items-center max-w-7xl mx-auto '>
			<div className='w-full md:w-1/2 rounded-md overflow-hidden md:shadow-myShadow'>
				<div className='flex items-center justify-center w-full h-1/5 md:bg-main py-8'>
					<span className='text-5xl md:text-white '>
						<CiAt />
					</span>
				</div>
				<div className='flex flex-col items-center gap-10 p-10'>
					<p className='text-center text-base'>
						Został tylko jeden krok, aby dokończyć rejestrację. Kliknij przycisk
						i znajdź odpowiedniego dla Ciebie korepetytora!
					</p>
					<button
						disabled={isLoading}
						onClick={handleButton}
						className='bg-main hover:bg-mainHover text-white px-6 py-2 rounded-md transition-colors duration-300 '
					>
						{isLoading ? (
							<span className='flex items-center justify-center'>
								<Spinner size='small' color='#ffffff' />
							</span>
						) : (
							'Potwierdź'
						)}
					</button>
				</div>
			</div>
		</div>
	);
}

export default VerifyEmailForm;
