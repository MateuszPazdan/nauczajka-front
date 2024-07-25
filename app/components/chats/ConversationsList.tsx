'use client';

import { Chat, useGetChatsQuery } from '@/redux/features/chatsApiSlice';
import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import useWebSocket from 'react-use-websocket';
import Spinner from '../Spinner';
import ConversationElement from './ConversationElement';

interface ConversationsListProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function ConversationsList({
	setChoosenChat,
	choosenChat,
}: ConversationsListProps) {
	const {
		data: chats,
		isSuccess,
		isLoading: isChatsLoading,
		isFetching: isChatsFetching,
	} = useGetChatsQuery({
		p: 1,
		page_size: 10,
	});
	const [allChats, setAllChats] = useState<Chat[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { lastJsonMessage }: { lastJsonMessage: Chat | null; readyState: any } =
		useWebSocket('ws://localhost:8000/ws/chat/list/');

	useEffect(() => {
		if (isSuccess && chats?.results) {
			setAllChats(chats.results);
			setNextLink(chats.next);
		}
	}, [isSuccess, chats]);

	useEffect(() => {
		if (lastJsonMessage) {
			setAllChats((prevChats) => {
				const filteredChats = prevChats.filter(
					(chat) => chat.id !== lastJsonMessage.id
				);
				return [lastJsonMessage, ...filteredChats];
			});
		}
	}, [lastJsonMessage]);

	async function handleLoadMoreChats() {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data.next);
		setAllChats((prevChats) => [...prevChats, ...data.results]);
	}

	if (isChatsLoading || isChatsFetching)
		return <Spinner size='large' color='text-main' />;

	return (
		<div className='flex flex-col justify-center items-center'>
			<div className='flex flex-col gap-2 overflow-y-scroll h-full w-full p-2'>
				{allChats?.map((chat) => (
					<ConversationElement
						choosenChat={choosenChat}
						chat={chat}
						key={chat.id}
						onClick={() => setChoosenChat(chat)}
					/>
				))}
				{isLoading && <Spinner size='small' color='text-main' />}
			</div>
		</div>
	);
}

export default ConversationsList;
