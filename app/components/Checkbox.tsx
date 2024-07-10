import { UseFormRegister } from 'react-hook-form';

interface CheckboxProps {
	label: string;
	register: UseFormRegister<any>;
	defaultChecked: boolean;
}

function Checkbox({ label, register, defaultChecked }: CheckboxProps) {
	return (
		<label className='relative flex bg-white gap-2 p-2 shadow-sm shadow-black/25 rounded-md overflow-hidden'>
			<input
				type='checkbox'
				{...register(label)}
				defaultChecked={defaultChecked}
			/>
			<span>{label}</span>
		</label>
	);
}

export default Checkbox;
