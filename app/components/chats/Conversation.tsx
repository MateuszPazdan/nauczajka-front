import {
	Chat,
	Message,
	useGetConversationDetailsQuery,
} from '@/redux/features/chatsApiSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import ConversationHeader from './ConversationHeader';
import MessageArea from './MessageArea';

interface ConversationProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function Conversation({ setChoosenChat, choosenChat }: ConversationProps) {
	const userId = choosenChat?.users[0].id;
	const conversationId = choosenChat?.id;

	const { data: messages, isSuccess } = useGetConversationDetailsQuery({
		id: conversationId,
		p: 1,
		page_size: 12,
	});
	const [message, setMessage] = useState<string>('');
	const [allMessages, setAllmessages] = useState<Message[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const { sendJsonMessage, lastJsonMessage } = useWebSocket(
		`ws://localhost:8000/ws/chat/${conversationId}/`
	);

	useEffect(() => {
		if (isSuccess && messages?.results) {
			setAllmessages(messages.results);
			setNextLink(messages.next);
		}
	}, [isSuccess, messages]);
	// console.log(choosenChat);

	useEffect(() => {
		console.log('halo');
		if (lastJsonMessage) {
			console.log(lastJsonMessage);
		}
		if (
			lastJsonMessage &&
			typeof lastJsonMessage === 'object' &&
			!Array.isArray(lastJsonMessage)
		) {
			setAllmessages((prevMessages) => [...prevMessages, lastJsonMessage]);
		}
	}, [lastJsonMessage]);

	return (
		<div className='flex flex-col justify-between w-full h-full'>
			<ConversationHeader
				choosenChat={choosenChat}
				setChoosenChat={setChoosenChat}
			/>
			<div>
				{allMessages.map((message) => (
					<div key={message?.id}>{message?.body}</div>
				))}
			</div>
			<MessageArea sendJsonMessage={sendJsonMessage} userId={userId} />
		</div>
	);
}

export default Conversation;
