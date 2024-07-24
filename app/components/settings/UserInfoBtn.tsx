interface UserInfoBtnProps {
	type: 'primary' | 'dangerous';
	children: React.ReactNode;
	onClick: () => void;
}

function UserInfoBtn({ type, children, onClick }: UserInfoBtnProps) {
	return (
		<button
			onClick={onClick}
			className={`p-4 flex flex-row gap-1 items-center justify-center transition-colors shadow-md shadow-shadowBlack rounded-md ${
				type === 'primary' &&
				' bg-main hover:bg-mainHover text-white '
			} ${
				type === 'dangerous' &&
				' hover:bg-white bg-red-500 hover:text-red-500 text-white border-2 border-red-500'
			} `}
		>
			{children}
		</button>
	);
}

export default UserInfoBtn;
