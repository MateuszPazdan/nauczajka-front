import { Chat } from '@/redux/features/chatsApiSlice';
import Image from 'next/image';

interface ConversationElementProps {
	choosenChat: Chat | null;
	onClick: () => void;
	chat: Chat;
	userData: any;
}

function ConversationElement({
	choosenChat,
	onClick,
	chat,
	userData,
}: ConversationElementProps) {
	const isChoosen = chat?.id === choosenChat?.id;
	const lastMessage = chat?.last_message;
	const users = chat?.users.slice().filter((user) => user.id !== userData?.id);

	return (
		<button
			onClick={onClick}
			className={`flex w-full items-center rounded-md p-2 hover:bg-whiteHover ${
				isChoosen ? 'bg-whiteHover' : ''
			} transition-colors duration-300`}
		>
			<span className='relative h-16 w-16 min-w-16'>
				<Image
					src={users[0].profile_image}
					fill
					className='rounded-full border-whiteHover border-2 '
					alt='profile image'
				/>
			</span>
			<span className='flex flex-col ml-3 text-left'>
				<span className='text-lg line-clamp-1'>
					{users[0].first_name} {users[0].last_name}
				</span>
				<span className=' text-gray text-sm line-clamp-1'>
					{lastMessage
						? lastMessage?.created_by?.id === choosenChat?.users[0]?.id
							? `Ty: ${lastMessage?.body}`
							: `${lastMessage?.created_by?.first_name}: ${lastMessage?.body}`
						: 'Napisz wiadomość'}
				</span>
			</span>
		</button>
	);
}

export default ConversationElement;
