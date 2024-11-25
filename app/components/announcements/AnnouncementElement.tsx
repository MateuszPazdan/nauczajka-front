'use client';
import Image from 'next/image';
import { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function AnnouncementElement({ announcement }: any) {
	const [isExpanded, setIsExpanded] = useState(false);
	const tutor = announcement?.tutor;

	return (
		<button
			className={`w-full flex flex-col p-4 rounded-md hover:bg-whiteHover group announcement ${
				isExpanded && 'bg-whiteHover hover:bgwhite'
			} border-[2px] border-whiteHover transition-colors duration-300 `}
			onClick={() => setIsExpanded(!isExpanded)}
		>
			<div className='w-full flex flex-row justify-between items-center'>
				<div className='flex flex-col items-start'>
					<span className='text-xl'>{announcement.title}</span>
					<span>
						{announcement.tags.map((tag: any, index: number) => (
							<span key={index} className='text-sm'>
								{tag.name}
								{announcement.tags.length !== index + 1 ? ', ' : ''}
							</span>
						))}
					</span>
				</div>
				<span
					className={`text-2xl transition-all duration-300 group-[.announcement]:group-hover:text-main ${
						isExpanded && 'rotate-180 '
					}`}
				>
					<IoIosArrowDown />
				</span>
			</div>
			<div
				className={`overflow-y-auto transition-[max-height, opacity] duration-300 ease-in-out ${
					isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
				}`}
			>
				<p className='text-left font-bold pt-5'>Opis:</p>
				<p className='py-2 text-sm text-left'>{announcement?.description}</p>
				<p className='text-left font-bold pt-5 pb-2'>Prowadzący:</p>
				<div className='flex items-center gap-5'>
					<Image
						src={`${tutor?.profile_image}`}
						alt='awatar użytkownika'
						width={52}
						height={52}
						className='rounded-full border-whiteHover group-hover/tutorEl:border-mainHover shadow-md shadow-shadowBlack border-2 transition-colors duration-300 aspect-square object-cover'
					/>
					<p className='text-xl'>
						{tutor?.first_name} {tutor?.last_name}
					</p>
				</div>
			</div>
		</button>
	);
}

export default AnnouncementElement;
