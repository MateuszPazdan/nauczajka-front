'use client';

import { useState } from 'react';
import Conversation from '../components/chats/Conversation';
import ConversationsList from '../components/chats/ConversationsList';
import { Chat } from '@/redux/features/chatsApiSlice';
import { CiChat1 } from 'react-icons/ci';

function Page() {
	const [choosenChat, setChoosenChat] = useState<Chat | null>(null);

	return (
		<div className='bg-whiteHover w-full h-full flex flex-row flex-wrap md:p-5 gap-5'>
			<div
				className={`${
					choosenChat ? 'hidden md:block' : 'block'
				} flex-1 sm:min-w-[300px] bg-white md:rounded-md  overflow-hidden md:shadow-md shadow-whiteHover`}
			>
				<ConversationsList setChoosenChat={setChoosenChat} choosenChat={choosenChat}/>
			</div>

			<div
				className={`${
					choosenChat ? 'block' : 'hidden md:block'
				} flex-[2] sm:min-w-[300px] bg-white md:rounded-md  overflow-hidden md:shadow-md shadow-whiteHover`}
			>
				{choosenChat ? (
					<Conversation
						setChoosenChat={setChoosenChat}
						choosenChat={choosenChat}
					/>
				) : (
					<div className='flex flex-col justify-center items-center gap-5 w-full h-full'>
						<span className='text-5xl'>
							<CiChat1 />
						</span>
						<span>Wybierz konwersację, aby ją przeczytać</span>
					</div>
				)}
			</div>
		</div>
	);
}

export default Page;
