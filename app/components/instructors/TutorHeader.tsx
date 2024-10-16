import { CiLocationOn } from 'react-icons/ci';
import { Tutor } from './InstructorsList';
import Image from 'next/image';

interface TutorHeaderProps {
	tutorInfo: Tutor;
	showLocation?: boolean;
}

function TutorHeader({ tutorInfo, showLocation }: TutorHeaderProps) {
	return (
		<div className='flex flex-col md:flex-row justify-center items-center gap-2 md:gap-5'>
			<Image
				src={`${tutorInfo?.profile_image}`}
				alt='awatar użytkownika'
				width={96}
				height={96}
				className='rounded-full border-whiteHover group-hover/tutorEl:border-mainHover shadow-md shadow-shadowBlack border-2 transition-colors duration-300'
			/>

			<div className='flex flex-col items-center md:items-baseline'>
				{showLocation && tutorInfo?.tutoring_location && (
					<p className='text-sm gap-2 flex justify-center items-center text-gray text-center w-fit'>
						<span className='text-lg text-black'>
							<CiLocationOn />
						</span>
						{tutorInfo?.tutoring_location}
					</p>
				)}
				<div className='flex flex-row gap-2 flex-wrap justify-center md:justify-start'>
					<p className='text-2xl'>{tutorInfo?.first_name}</p>
					<p className='text-2xl'>{tutorInfo?.last_name}</p>
				</div>
				<div className='flex flex-row flex-wrap justify-center md:justify-start gap-1 text-gray'>
					{tutorInfo?.skills.map((skill: string, index: number) => (
						<p key={skill} className='text-[0.75rem]'>
							{skill}
							{index != tutorInfo.skills.length - 1 && ','}
						</p>
					))}
				</div>
			</div>
		</div>
	);
}

export default TutorHeader;
