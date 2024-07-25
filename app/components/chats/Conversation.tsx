import {
	Chat,
	Message,
	useGetConversationDetailsQuery,
} from '@/redux/features/chatsApiSlice';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ConversationHeader from './ConversationHeader';

interface ConversationProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function Conversation({ setChoosenChat, choosenChat }: ConversationProps) {
	const [allMessages, setAllmessages] = useState<Message[]>([]);
	const [nextLink, setNextLink] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const { data: messages, isSuccess } = useGetConversationDetailsQuery({
		id: choosenChat?.id,
		p: 1,
		page_size: 12,
	});
	console.log(messages);
	useEffect(() => {
		if (isSuccess && messages?.results) {
			setAllmessages(messages.results);
			setNextLink(messages.next);
		}
	}, [isSuccess, messages]);
	return (
		<div className='flex flex-col w-full h-full'>
			<ConversationHeader
				choosenChat={choosenChat}
				setChoosenChat={setChoosenChat}
			/>
			<div>
				{allMessages.map((message) => (
					<div key={message?.id}>{message?.body}</div>
				))}
			</div>
		</div>
	);
}

export default Conversation;
