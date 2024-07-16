import { motion } from 'framer-motion';

const burgerFirstVariants = {
	opened: {
		x: '105%',
		y: '150%',
		rotate: '45deg',
		width: '50%',
	},
	closed: {},
};

const burgerSecondVariants = {
	opened: { width: '100%' },
	closed: {},
};

const burgerThirdVariants = {
	opened: {
		x: '105%',
		y: '-150%',
		rotate: '-45deg',
		width: '50%',
	},
	closed: {},
};

function BurgerBtn({
	onClick,
	isMenuOpen,
}: {
	onClick: () => void;
	isMenuOpen: boolean;
}) {
	return (
		<button
			onClick={onClick}
			className='flex flex-col gap-[6px] min-w-10 hover:cursor-pointer hover:bg-whiteHover transition-colors duration-300 p-2 rounded-md'
		>
			<motion.div
				variants={burgerFirstVariants}
				animate={isMenuOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.3, type: 'tween', delay: 0.1 }}
				className='w-8 h-[5px] rounded-md bg-main'
			></motion.div>
			<motion.div
				variants={burgerSecondVariants}
				animate={isMenuOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.5, type: 'tween' }}
				className='w-8 h-[5px] rounded-md bg-main'
			></motion.div>
			<motion.div
				variants={burgerThirdVariants}
				animate={isMenuOpen ? 'opened' : 'closed'}
				transition={{ duration: 0.3, type: 'tween', delay: 0.1 }}
				className='w-8 h-[5px] rounded-md bg-main'
			></motion.div>
		</button>
	);
}

export default BurgerBtn;
