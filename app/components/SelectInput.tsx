import { ChangeEvent } from 'react';
import { UseFormRegister } from 'react-hook-form';

interface SelectInputProps {
	register: UseFormRegister<any>;
	label: string;
	field: string;
	value: string;
	error?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function SelectInput({
	register,
	label,
	field,
	value,
	error,
	onChange,
}: SelectInputProps) {
	return (
		<div>
			<label className='flex gap-2 items-center'>
				<input
					type='radio'
					value={value}
					{...register(field)}
					onChange={onChange}
				/>
				{label}
			</label>
			{error && <p>{error.toString()}</p>}
		</div>
	);
}

export default SelectInput;
