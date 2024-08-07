'use client';

import { Chat, useGetChatsQuery } from '@/redux/features/chatsApiSlice';
import {
	useEffect,
	useState,
	Dispatch,
	SetStateAction,
	useRef,
	useCallback,
} from 'react';
import useWebSocket from 'react-use-websocket';
import Spinner from '../Spinner';
import ConversationElement from './ConversationElement';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
import { WS_KEY } from '@/app/api/apiAuth';

interface ConversationsListProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function ConversationsList({
	setChoosenChat,
	choosenChat,
}: ConversationsListProps) {
	const { data: userData } = useRetrieveUserQuery();
	const {
		data: chats,
		isSuccess,
		isLoading: isChatsLoading,
		isFetching: isChatsFetching,
	} = useGetChatsQuery({
		p: 1,
		page_size: 8,
	});
	const [allChats, setAllChats] = useState<Chat[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const conversationsContaner = useRef<HTMLDivElement>(null);

	const {
		lastJsonMessage,
		readyState,
	}: { lastJsonMessage: Chat | null; readyState: any } = useWebSocket(
		`${WS_KEY}/ws/chat/list/`,
		{ shouldReconnect: () => true, reconnectInterval: 1000 }
	);

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

	const handleLoadMoreChats = useCallback(async () => {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data.next);
		setAllChats((prevChats) => {
			const chatIds = new Set(prevChats.map((chat) => chat.id));
			const newChats = data.results.filter(
				(chat: Chat) => !chatIds.has(chat.id)
			);
			return [...prevChats, ...newChats];
		});
	}, [nextLink]);

	useEffect(() => {
		if (conversationsContaner.current) {
			if (
				conversationsContaner.current.scrollHeight <=
				conversationsContaner.current.clientHeight
			) {
				handleLoadMoreChats();
			}
		}
	}, [handleLoadMoreChats]);

	function handleScroll() {
		if (conversationsContaner.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				conversationsContaner.current;
			const scrollFromBottom = scrollHeight - scrollTop - clientHeight;

			if (scrollFromBottom < 5 && !isLoading) {
				handleLoadMoreChats();
				conversationsContaner.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
			if (scrollFromBottom < 5 && isLoading) {
				conversationsContaner.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
		}
	}

	if (isChatsLoading || isChatsFetching)
		return <Spinner size='large' color='text-main' />;

	return (
		<div className='flex flex-col justify-center items-center h-full w-full'>
			<div
				ref={conversationsContaner}
				onScroll={handleScroll}
				className='flex flex-col gap-2 w-full h-full p-2 overflow-y-scroll'
			>
				{allChats.length > 0 ? (
					allChats?.map((chat) => (
						<ConversationElement
							choosenChat={choosenChat}
							chat={chat}
							key={chat.id}
							onClick={() => {
								setChoosenChat(chat);
							}}
							userData={userData}
						/>
					))
				) : (
					<span className='text-center text-md py-10'>Brak konwersacji</span>
				)}
				{isLoading && <Spinner size='small' color='text-main' />}
			</div>
		</div>
	);
}

export default ConversationsList;
