'use client';

import { CiMail } from 'react-icons/ci';
import TutorHeader from '../instructors/TutorHeader';
import Button from '../Button';

function TutorInfoPageHeader({ tutorInfo }: any) {
	function messageHandler() {
		console.log('napisz wiadomosc');
	}

	return (
		<div className='flex flex-col items-center justify-center md:flex-row md:justify-between px-5 gap-5 max-w-5xl mx-auto'>
			<TutorHeader tutorInfo={tutorInfo} showLocation={false} />
			<Button
				type='button'
				className={'flex items-center gap-2'}
				onClick={messageHandler}
			>
				<span className='text-2xl'>
					<CiMail />
				</span>
				Napisz wiadomość
			</Button>
		</div>
	);
}

export default TutorInfoPageHeader;
