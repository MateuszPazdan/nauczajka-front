'use client';

import {
	Chat,
	Message,
	useGetConversationDetailsQuery,
} from '@/redux/features/chatsApiSlice';
import {
	Dispatch,
	SetStateAction,
	useCallback,
	useEffect,
	useRef,
	useState,
} from 'react';
import useWebSocket from 'react-use-websocket';
import ConversationHeader from './ConversationHeader';
import MessageArea from './MessageArea';
import Spinner from '../Spinner';
import MessageComponent from './MessageComponent';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { WS_KEY } from '@/app/api/apiAuth';

interface ConversationProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function Conversation({ setChoosenChat, choosenChat }: ConversationProps) {
	const { data: userData } = useRetrieveUserQuery();
	const userId = choosenChat?.users[0].id;
	const conversationId = choosenChat?.id;
	const messagesContainer = useRef<HTMLDivElement>(null);
	const {
		data: messages,
		isSuccess,
		isLoading: isMessagesLoading,
		isFetching: isMessagesFetching,
	} = useGetConversationDetailsQuery(
		{
			id: conversationId,
			p: 1,
			page_size: 8,
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
		`${WS_KEY}/ws/chat/${conversationId}/`,
		{ shouldReconnect: () => true, reconnectInterval: 1000 }
	);

	useEffect(() => {
		if (messages?.results) {
			setAllmessages(messages.results.slice()?.reverse());
			setNextLink(messages.next);
			const timeout = setTimeout(() => {
				scrollToBottom();
			}, 100);
			return () => clearTimeout(timeout);
		}
	}, [isSuccess, messages]);

	useEffect(() => {
		if (lastJsonMessage) {
			setAllmessages((prevMessages) => [...prevMessages, lastJsonMessage]);
		}
	}, [lastJsonMessage]);

	const handleLoadMoreMessages = useCallback(async () => {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setNextLink(data.next);
		setAllmessages((prevMessages) => [
			...data.results.slice().reverse(),
			...prevMessages,
		]);
		setIsLoading(false);
	}, [nextLink]);

	useEffect(() => {
		if (messagesContainer.current) {
			if (
				messagesContainer.current.scrollHeight <=
				messagesContainer.current.clientHeight
			) {
				handleLoadMoreMessages();
			}
		}
	}, [handleLoadMoreMessages]);

	function handleScroll() {
		if (messagesContainer.current) {
			const { scrollTop } = messagesContainer.current;

			if (scrollTop < 5 && !isLoading) {
				handleLoadMoreMessages();
				messagesContainer.current.scrollTop = 10;
			}
			if (scrollTop === 0 && isLoading) {
				messagesContainer.current.scrollTop = 10;
			}
		}
	}

	const scrollToBottom = () => {
		if (messagesContainer.current) {
			messagesContainer.current.scrollTop =
				messagesContainer.current.scrollHeight;
		}
	};

	useEffect(() => {
		if (!isMessagesFetching) {
			scrollToBottom();
		}
	}, [isMessagesFetching]);

	useEffect(() => {
		if (messagesContainer.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				messagesContainer.current;
			const scrolledFromBottom = scrollHeight - scrollTop - clientHeight;
			const isScrolledToBottom = scrolledFromBottom < 100;
			if (isScrolledToBottom) {
				scrollToBottom();
			}
		}
	}, [allMessages, isLoading]);

	if (isMessagesLoading || isMessagesFetching)
		return <Spinner size='large' color='text-main' />;

	return (
		<div className='flex flex-col w-full h-full'>
			<ConversationHeader
				choosenChat={choosenChat}
				setChoosenChat={setChoosenChat}
			/>

			<div
				ref={messagesContainer}
				onScroll={handleScroll}
				className='flex flex-col py-2 overflow-y-scroll w-full h-full'
			>
				{isLoading && (
					<span className='py-5'>
						<Spinner size='small' color='text-main' />
					</span>
				)}
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
				conversationId={conversationId}
			/>
		</div>
	);
}

export default Conversation;
