import { API_KEY } from '@/app/api/apiAuth';
import Image from 'next/image';
import Link from 'next/link';

interface NavLogoProps {
	user: any;
}

function NavLogo({ user }: NavLogoProps) {
	return (
		<Link href='/account/settings' className='logo group '>
			<div className={`flex flex-col items-center gap-2 py-8`}>
				<div className='w-24 aspect-square relative'>
					<Image
						loader={({ src }) => src}
						placeholder='blur'
						blurDataURL={`${API_KEY}/static/media/uploads/user/default.jpg`}
						src={`${API_KEY}${'/static/media/uploads/user/default.jpg'}`}
						fill
						alt='User profile image'
						className='rounded-full shadow-md group-[.logo]:group-hover:border-main border-2 transition-colors duration-300'
					/>
				</div>

				<span className='text-xl text-gray'>
					{user?.first_name} {user?.last_name}
				</span>
			</div>
		</Link>
	);
}

export default NavLogo;
