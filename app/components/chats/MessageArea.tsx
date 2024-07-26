import { FormEvent, KeyboardEvent, useState } from 'react';
import { CiPaperplane } from 'react-icons/ci';
import Spinner from '../Spinner';

interface MessageAreaProps {
	sendJsonMessage: (message: any) => void;
	userId: string;
	isLoading: boolean;
}

function MessageArea({ sendJsonMessage, userId, isLoading }: MessageAreaProps) {
	const [message, setMessage] = useState('');

	const sendMessage = () => {
		sendJsonMessage({
			event: 'chat_message',
			data: {
				body: message,
				created_by: userId,
			},
		});
		setMessage('');
	};

	function handleSendMessage(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter' && !e.shiftKey && message.trim() !== '') {
			e.preventDefault();
			sendMessage();
			setMessage('');
		} else return;
	}

	function handleBtnSendMessage() {
		if (message.trim() !== '') {
			sendMessage();
		}
	}

	return (
		<form
			onSubmit={handleBtnSendMessage}
			className='flex flex-row h-[10%] p-2 shadow-whiteHover shadow-md '
		>
			<textarea
				placeholder='Napisz wiadomość'
				id='usermsg'
				value={message}
				onChange={(e) => setMessage(e.target.value)}
				onKeyDown={(e) => handleSendMessage(e)}
				className='resize-none bg-whiteHover rounded-md w-full min-h-full max-h-full p-2 focus:outline-none focus:ring-0 border-2 border-transparent focus:border-mainPurple '
			></textarea>
			<button
				type='button'
				onClick={handleBtnSendMessage}
				disabled={isLoading}
				className='flex items-center p-2 focus:outline-none focus:ring-0 border-2 border-transparent rounded-md focus:text-mainPurple'
			>
				{!isLoading ? (
					<span className='text-2xl hover:text-mainPurple hover:cursor-pointer'>
						<CiPaperplane />
					</span>
				) : (
					<Spinner size='small' />
				)}
			</button>
		</form>
	);
}

export default MessageArea;
