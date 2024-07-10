import { CiSearch } from 'react-icons/ci';

interface SearchInputProps {
	placeholder?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onClick?: () => void;
	onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function SearchInput({
	placeholder,
	value,
	onChange,
	onClick,
	onKeyDown,
}: SearchInputProps) {
	return (
		<div className='relative flex'>
			<input
				type='text'
				placeholder={placeholder}
				className='w-full border-whiteHover border-2 rounded-md p-2 focus:outline-none focus:border-main pr-8'
				value={value}
				onChange={onChange}
				onKeyDown={onKeyDown}
			/>
			<button
				type='button'
				onClick={onClick}
				className='absolute right-0 h-full flex items-center px-2 text-2xl hover:text-mainHover transition-colors'
			>
				<span>
					<CiSearch />
				</span>
			</button>
		</div>
	);
}

export default SearchInput;
