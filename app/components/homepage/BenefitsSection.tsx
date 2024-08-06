import { PiPiggyBank } from 'react-icons/pi';
import SectionTitle from './SectionTitle';
import { BsCalendar4Week, BsHouse } from 'react-icons/bs';
import BenefitCard from './BenefitCard';

function BenefitsSection() {
	return (
		<div className='flex flex-col py-10'>
			<SectionTitle description='Nie zwlekaj! Sprawdź, jak Nauczajka może zmienić Twoje podejście do nauki i pomóc Ci osiągnąć sukces. Rozpocznij już dziś!'>
				Twoja edukacja, twoje zasady!
			</SectionTitle>
			{/* <span className='mx-auto w-4/5 border-t-[3px] border-black border-dashed mt-5'></span> */}
			<div className='relative flex flex-row flex-wrap justify-center py-20 px-2 md:px-10 gap-5 lg:gap-0'>
				<BenefitCard
					className='lg:half-a-border-on-left lg:border-t-[3px] '
					title='Bądź niezależny'
					icon={<BsHouse className='text-6xl text-black' />}
					description='Korzystaj z lekcji od najlepszych korepetytorów, niezależnie od tego,
				gdzie się znajdujesz.'
				/>
				<span className='mx-auto w-1/2 border-t-[3px] sm:hidden border-black border-dashed'></span>
				<BenefitCard
					className='lg:border-l-[3px] lg:border-b-[3px] lg:border-r-[3px] '
					title='Zaoszczędź czas'
					icon={<PiPiggyBank className='text-6xl text-black' />}
					description='Ucz się ze swojego domu, eliminując utratę czasu związaną z dojazdami.'
				/>
				<span className='mx-auto w-1/2 border-t-[3px] sm:hidden border-black border-dashed mt-5'></span>
				<BenefitCard
					className='lg:half-a-border-on-right lg:border-t-[3px] '
					title='Dopasuj pod siebie'
					icon={<BsCalendar4Week className='text-6xl text-black' />}
					description='Dostosuj godziny zajęć do swojego planu dnia, ucząc się wtedy, kiedy Ci pasuje.'
				/>
				<span className='-z-10 absolute lg:border-t-[3px] border-black w-full border-dashed top-1/2'></span>
			</div>
		</div>
	);
}

export default BenefitsSection;
