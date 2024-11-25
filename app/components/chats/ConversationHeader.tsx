import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';
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
	const { data: user } = useRetrieveUserQuery();
	const choosenUser =
		choosenChat?.users[0].id === user?.id
			? choosenChat?.users[1]
			: choosenChat?.users[0];
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
					{choosenUser?.first_name} {choosenUser?.last_name}
				</span>
			</div>
		</div>
	);
}

export default ConversationHeader;
