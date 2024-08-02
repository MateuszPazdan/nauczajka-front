import { Dispatch } from 'react';

function SelectRole({
	role,
	setRole,
}: {
	role: 'tutor' | 'user';
	setRole: Dispatch<React.SetStateAction<'tutor' | 'user'>>;
}) {
	return (
		<div className='w-full flex rounded-md border-[1px] border-whiteHover overflow-hidden'>
			<button
				onClick={() => setRole('user')}
				className={`w-1/2 text-center p-1 transition-colors duration-300  ${
					role === 'user'
						? 'bg-main text-white hover:bg-mainHover hover:text-white'
						: 'hover:bg-whiteHover'
				}`}
			>
				<p>Jako uczeń</p>
			</button>
			<button
				onClick={() => setRole('tutor')}
				className={`w-1/2 text-center p-1 transition-colors duration-300  ${
					role === 'tutor'
						? 'bg-main text-white hover:bg-mainHover hover:text-white'
						: 'hover:bg-whiteHover'
				}`}
			>
				<p>Jako korepetytor</p>
			</button>
		</div>
	);
}

export default SelectRole;
