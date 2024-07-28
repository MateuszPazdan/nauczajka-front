import { Message } from '@/redux/features/chatsApiSlice';
import Image from 'next/image';
import Link from 'next/link';

import { CiFileOn } from 'react-icons/ci';
import { GoDownload } from 'react-icons/go';
import { saveAs } from 'file-saver';
interface MessageComponentProps {
	userData: any;
	message: Message;
}

function MessageComponent({ userData, message }: MessageComponentProps) {
	const createdBy = message?.created_by;
	const isImage = (file: string) => {
		return /\.(jpg|jpeg|png|gif|bmp|webp|svg)$/i.test(file);
	};

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
			<div className='max-w-[500px] overflow-hidden rounded-md '>
				{!message?.file && (
					<p
						className={` text-pretty p-2 shadow-sm shadow-whiteHover ${
							createdBy?.id === userData?.id
								? 'text-white bg-main'
								: ' bg-whiteHover'
						}`}
					>
						{message?.body}
					</p>
				)}
				{message?.file && (
					<>
						{isImage(message?.file) && (
							<button
								className='relative min-w-12 min-h-12 h-full w-full flex justify-center items-center'
								onClick={() => saveAs(message?.file, message?.body)}
							>
								<HoverableImage />
								<img alt={message?.body} src={`${message?.file}`} />
							</button>
						)}
						{!isImage(message?.file) && (
							<Link
								className='relative min-w-12 min-h-12 h-full w-full flex items-center justify-center p-2 bg-whiteHover/50 shadow-sm shadow-whiteHover rounded-md gap-1'
								href={message?.file}
							>
								<span className='text-md'>
									<CiFileOn />
								</span>
								<span className='text-sm  line-clamp-1'>{message?.body}</span>
								<HoverableImage />
							</Link>
						)}
					</>
				)}
			</div>
		</div>
	);
}

export default MessageComponent;

function HoverableImage() {
	return (
		<div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center hover:bg-mainBlue/90 opacity-0 hover:opacity-100 transition-all hover: cursor-pointer'>
			<span className='text-2xl text-white'>
				<GoDownload />
			</span>
		</div>
	);
}
