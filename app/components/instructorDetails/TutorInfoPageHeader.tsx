'use client';

import { CiMail } from 'react-icons/ci';
import TutorHeader from '../instructors/TutorHeader';
import Button from '../Button';
import { MouseEvent } from 'react';

function TutorInfoPageHeader({ tutorInfo }: any) {
	function openChatHandler(event: MouseEvent<HTMLButtonElement>) {
		event.preventDefault();
		console.log('open chat');
	}

	return (
		<form className='flex flex-col items-center justify-center md:flex-row md:justify-between px-5 gap-5 max-w-5xl mx-auto'>
			<TutorHeader tutorInfo={tutorInfo} showLocation={false} />
			<Button
				onClick={(e: MouseEvent<HTMLButtonElement>) => openChatHandler(e)}
				type='button'
				className={'flex items-center gap-2'}
			>
				<span className='text-2xl'>
					<CiMail />
				</span>
				Napisz wiadomość
			</Button>
		</form>
	);
}

export default TutorInfoPageHeader;
