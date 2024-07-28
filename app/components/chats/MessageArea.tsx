import { FormEvent, KeyboardEvent, useRef, useState } from 'react';
import { CiFileOn, CiPaperplane } from 'react-icons/ci';
import Spinner from '../Spinner';
import { IoIosClose } from 'react-icons/io';
import { useSendFileMutation } from '@/redux/features/chatsApiSlice';

interface MessageAreaProps {
	sendJsonMessage: (message: any) => void;
	userId: string;
	isLoading: boolean;
	conversationId: string | undefined;
}

function MessageArea({
	sendJsonMessage,
	userId,
	isLoading,
	conversationId,
}: MessageAreaProps) {
	const [message, setMessage] = useState('');
	const [files, setFiles] = useState<File[]>([]);
	const [sendFile, { isLoading: isFilesSending }] = useSendFileMutation();
	const fileInputRef = useRef<HTMLInputElement>(null);

	function handleFileChange(e: FormEvent<HTMLInputElement>) {
		const inputFiles = e.currentTarget.files;

		if (inputFiles) {
			setFiles((prevFiles) => [...prevFiles, ...Array.from(inputFiles)]);
		}
	}

	const sendMessage = () => {
		if (files.length > 0) {
			sendFile({ file: files[0], conversationId })
				.unwrap()
				.then((res) => {
					setFiles([]);
				});
		} else {
			sendJsonMessage({
				event: 'chat_message',
				data: {
					body: message,
					created_by: userId,
				},
			});
			setMessage('');
		}
	};

	function handleSendMessage(e: KeyboardEvent<HTMLTextAreaElement>) {
		if (e.key === 'Enter' && !e.shiftKey && message.trim() !== '') {
			e.preventDefault();
			sendMessage();
			setMessage('');
		} else return;
	}

	function handleBtnSendMessage() {
		if (message.trim() !== '' || files.length > 0) {
			sendMessage();
		}
	}

	return (
		<form onSubmit={handleBtnSendMessage}>
			{files?.length > 0 && (
				<div className='flex p-2 mx-2 gap-1 overflow-scroll'>
					{files.map((file, index) => (
						<button
							key={index}
							className='flex items-center p-2 bg-whiteHover rounded-md gap-1'
							onClick={(e) => {
								e.preventDefault();
								setFiles((prevFiles) =>
									prevFiles.filter((_, i) => i !== index)
								);
								if (fileInputRef.current) {
									fileInputRef.current.value = '';
								}
							}}
						>
							<span className='text-sm  line-clamp-1'>{file.name}</span>
							<span className='text-md'>
								<IoIosClose />
							</span>
						</button>
					))}
				</div>
			)}
			<div className='flex flex-row p-2 shadow-whiteHover shadow-md'>
				<textarea
					placeholder='Napisz wiadomość'
					id='usermsg'
					value={message}
					onChange={(e) => setMessage(e.target.value)}
					onKeyDown={(e) => handleSendMessage(e)}
					className='resize-none bg-whiteHover rounded-md w-full min-h-full max-h-full p-2 focus:outline-none focus:ring-0 border-2 border-transparent focus:border-main '
				></textarea>

				<label
					htmlFor='filePicker'
					className='flex items-center justify-center p-2 '
				>
					<input
						id='filePicker'
						type='file'
						className='sr-only'
						onChange={handleFileChange}
						ref={fileInputRef}
						multiple
					/>
					<span className='text-2xl hover:text-main hover:cursor-pointer transition-colors duration-300 '>
						<CiFileOn />
					</span>
				</label>
				<button
					type='button'
					onClick={handleBtnSendMessage}
					disabled={isLoading || isFilesSending}
					className='flex items-center p-2 focus:outline-none focus:ring-0 border-2 border-transparent rounded-md focus:text-main'
				>
					{!isLoading || !isFilesSending ? (
						<span className='text-2xl hover:text-main hover:cursor-pointer transition-colors duration-300'>
							<CiPaperplane />
						</span>
					) : (
						<Spinner size='small' />
					)}
				</button>
			</div>
		</form>
	);
}

export default MessageArea;
