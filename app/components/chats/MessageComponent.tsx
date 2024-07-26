import { User } from '@/redux/features/authApiSlice';
import { Message } from '@/redux/features/chatsApiSlice';
import Image from 'next/image';

interface MessageComponentProps {
	userData: any;
	message: Message;
}

function MessageComponent({ userData, message }: MessageComponentProps) {
	const createdBy = message?.created_by;

	return (
		<div
			className={`p-2 flex gap-2  ${
				createdBy?.id === userData?.id
					? 'self-end flex-row-reverse'
					: 'self-start'
			}`}
		>
			{createdBy?.id !== userData?.id && (
				<span className='relative w-10 h-10'>
					<Image
						src={`${createdBy?.profile_image}`}
						alt='Avatar'
						fill
						className=' rounded-full'
					/>
				</span>
			)}
			<p
				className={`p-2 rounded-md shadow-sm shadow-whiteHover ${
					createdBy?.id === userData?.id
						? 'text-white bg-main'
						: ' bg-whiteHover'
				}`}
			>
				{message?.body}
			</p>
		</div>
	);
}

export default MessageComponent;
