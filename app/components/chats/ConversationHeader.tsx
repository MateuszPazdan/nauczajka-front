import { Chat } from '@/redux/features/chatsApiSlice';
import { Dispatch, SetStateAction } from 'react';
import { IoIosClose } from 'react-icons/io';

interface ConversationHeaderProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function ConversationHeader({
	setChoosenChat,
	choosenChat,
}: ConversationHeaderProps) {
	return (
		<div className='flex items-center gap-2 border-b-2 p-2 border-whiteHover'>
			<button
				onClick={() => setChoosenChat(null)}
				className='hover:bg-whiteHover rounded-md duration-300 transition-colors'
			>
				<span className='text-3xl'>
					<IoIosClose />
				</span>
			</button>
			<div>
				<span className='text-md '>
					{choosenChat?.users[1].first_name} {choosenChat?.users[1].last_name}
				</span>
			</div>
		</div>
	);
}

export default ConversationHeader;
