import { Chat } from '@/redux/features/chatsApiSlice';
import { Dispatch, SetStateAction } from 'react';
import { IoIosClose } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

interface ConversationProps {
	setChoosenChat: Dispatch<SetStateAction<Chat | null>>;
	choosenChat: Chat | null;
}

function Conversation({ setChoosenChat, choosenChat }: ConversationProps) {
	console.log(choosenChat);
	return (
		<div className='flex flex-col w-full h-full'>
			<div className='flex items-center gap-2 border-b-2 p-2 border-whiteHover'>
				<button
					onClick={() => setChoosenChat(null)}
					className='hover:bg-whiteHover rounded-md'
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
		</div>
	);
}

export default Conversation;
