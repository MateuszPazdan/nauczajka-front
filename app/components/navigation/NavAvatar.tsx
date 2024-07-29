import { API_KEY } from '@/app/api/apiAuth';
import { User } from '@/redux/features/authApiSlice';
import Image from 'next/image';
import Link from 'next/link';

interface NavAvatarProps {
	user: User | undefined;
	size?: 'small' | 'large';
	href?: string;
	onClick?: () => void;
}
// NAPRAWIĆ
function NavAvatar({ user, size = 'large', href, onClick }: NavAvatarProps) {
	const content = (
		<div
			className={`flex flex-col items-center gap-2  ${
				size === 'large' && 'py-8'
			} ${size === 'small' && 'py-2 px-5'}`}
		>
			<div
				className={`aspect-square relative ${size === 'small' && 'w-12'} ${
					size === 'large' && 'w-24'
				}`}
			>
				<Image
					loader={({ src }) => src}
					placeholder='blur'
					blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
					src={`${user?.profile_image}`}
					fill
					alt='User profile image'
					className='rounded-full shadow-md group-[.logo]:group-hover:border-main border-2 transition-colors duration-300'
				/>
			</div>

			{size === 'large' && (
				<span className={`text-xl  text-gray`}>{user?.first_name}</span>
			)}
		</div>
	);
	return (
		<>
			{href && (
				<Link href={href} onClick={onClick} className='logo group '>
					{content}
				</Link>
			)}

			{onClick && !href && (
				<button onClick={onClick} className='logo group '>
					{content}
				</button>
			)}
		</>
	);
}

export default NavAvatar;
