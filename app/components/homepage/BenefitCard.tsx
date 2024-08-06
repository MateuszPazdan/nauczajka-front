import { BsHouse } from 'react-icons/bs';

function BenefitCard({
	icon,
	title,
	description,
	className,
}: {
	icon: React.ReactNode;
	title: string;
	description: string;
	className?: string;
}) {
	return (
		<div
			className={`lg:basis-1/3 flex flex-col gap-10 w-full max-w-[350px] items-center text-center sm:px-5 py-14 bg-white border-black border-dashed ${className}`}
		>
			<span>{icon}</span>
			<span className='text-main text-xl font-semibold'>{title}</span>
			<span>{description}</span>
		</div>
	);
}

export default BenefitCard;
