import { UseFormRegister } from "react-hook-form";

interface AvailableSkillElementProps {
	label: string;
	register: UseFormRegister<any>;
	defaultChecked: boolean;
}

function AvailableSkillElement({
	label,
	register,
	defaultChecked,
}: AvailableSkillElementProps) {
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

export default AvailableSkillElement;
