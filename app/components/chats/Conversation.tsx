'use client';

import {
	Chat,
	Message,
	useGetConversationDetailsQuery,
} from '@/redux/features/chatsApiSlice';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import ConversationHeader from './ConversationHeader';
import MessageArea from './MessageArea';
import Spinner from '../Spinner';
import MessageComponent from './MessageComponent';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { unstable_noStore as noStore } from 'next/cache';

interface ConversationProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function Conversation({ setChoosenChat, choosenChat }: ConversationProps) {
	noStore();
	const { data: userData } = useRetrieveUserQuery();
	const userId = choosenChat?.users[0].id;
	const conversationId = choosenChat?.id;
	const messagesContainer = useRef(null);
	const {
		data: messages,
		isSuccess,
		isLoading: isMessagesLoading,
		isFetching: isMessagesFetching,
	} = useGetConversationDetailsQuery(
		{
			id: conversationId,
			p: 1,
			page_size: 20,
		},
		{
			refetchOnMountOrArgChange: true,
		}
	);
	const [allMessages, setAllmessages] = useState<Message[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const {
		sendJsonMessage,
		lastJsonMessage,
	}: { sendJsonMessage: any; lastJsonMessage: Message } = useWebSocket(
		`ws://localhost:8000/ws/chat/${conversationId}/`
	);

	useEffect(() => {
		if (isSuccess && messages?.results) {
			setAllmessages(messages.results.slice()?.reverse());
			setNextLink(messages.next);
		}
	}, [isSuccess, messages]);

	useEffect(() => {
		if (lastJsonMessage) {
			setAllmessages((prevMessages) => [...prevMessages, lastJsonMessage]);
		}
	}, [lastJsonMessage]);

	async function handleLoadMoreMessages() {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data.next);
		setAllmessages((prevMesages) => [...prevMesages, ...data.results]);
	}

	const scrollToBottom = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	useEffect(() => {
		const timeout = setTimeout(() => {
			scrollToBottom();
		}, 100);

		return () => clearTimeout(timeout);
	}, [isSuccess]);

	useEffect(() => {
		if (messagesContainer.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				messagesContainer.current;
			const isScrolledToBottom = scrollHeight - scrollTop - clientHeight < 100;
			if (isScrolledToBottom) {
				scrollToBottom();
			}
		}
	}, [allMessages]);

	if (isMessagesLoading || isMessagesFetching)
		return <Spinner size='large' color='text-main' />;

	return (
		<div className='flex flex-col justify-between w-full h-full'>
			<ConversationHeader
				choosenChat={choosenChat}
				setChoosenChat={setChoosenChat}
			/>

			<div
				ref={messagesContainer}
				className='flex flex-col py-2 overflow-y-scroll h-full'
			>
				{allMessages?.length === 0 && (
					<p className='text-center py-5 text-gray'>
						Teraz możecie ze sobą pisać
					</p>
				)}
				{allMessages?.map((message) => {
					return (
						<MessageComponent
							message={message}
							userData={userData}
							key={message?.id}
						/>
					);
				})}
			</div>
			<MessageArea
				sendJsonMessage={sendJsonMessage}
				userId={userId}
				isLoading={isLoading}
			/>
		</div>
	);
}

export default Conversation;
