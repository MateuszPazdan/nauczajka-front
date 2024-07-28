'use client';

import { useEffect, useState } from 'react';
import Conversation from '../components/chats/Conversation';
import ConversationsList from '../components/chats/ConversationsList';
import { Chat } from '@/redux/features/chatsApiSlice';
import { CiChat1 } from 'react-icons/ci';
import { API_KEY } from '../api/apiAuth';

function Page({ searchParams }: any) {
	const [choosenChat, setChoosenChat] = useState<Chat | null>(null);

	useEffect(() => {
		if (searchParams?.conversation_id) {
			handleOpenChat();
		}
		async function handleOpenChat() {
			const response = await fetch(
				`${API_KEY}/api/chat/conversation/${searchParams.conversation_id}/`,
				{ credentials: 'include' }
			);
			if (!response.ok) {
				return;
			}
			const data = await response.json();
			setChoosenChat(data);
		}
	}, [searchParams?.conversation_id]);

	return (
		<div className='bg-whiteHover w-full mx-auto flex h-full justify-center items-center'>
			<div className='max-w-7xl w-full h-full justify-center items-center flex flex-row flex-wrap md:p-5 gap-5 '>
				<div
					className={`${
						choosenChat ? 'hidden md:block' : 'block'
					} sm:min-w-[350px]  w-full  flex-[2] bg-white md:rounded-md  md:shadow-md shadow-whiteHover h-full`}
				>
					<ConversationsList
						setChoosenChat={setChoosenChat}
						choosenChat={choosenChat}
					/>
				</div>

				<div
					className={`${
						choosenChat ? 'block' : 'hidden md:block'
					} flex-[3] sm:min-w-[300px]   bg-white md:rounded-md h-full md:shadow-md shadow-whiteHover`}
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
							<span className='text-center px-2'>Wybierz konwersację, aby ją przeczytać</span>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Page;
