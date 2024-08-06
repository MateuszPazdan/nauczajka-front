import { CiMail, CiUser } from 'react-icons/ci';
import { PiBookLight } from 'react-icons/pi';
import SectionTitle from './SectionTitle';
import IconCard from './IconCard';

function HowToStartSteps() {
	return (
		<div className='mx-auto max-w-7xl flex flex-col justify-center  w-3/4'>
			<SectionTitle description='Aby zacząć naukę wystarczą 3 proste kroki'>
				Czy wiesz, że...?
			</SectionTitle>

			<span className='mx-auto w-4/5 border-t-[3px] border-black border-dashed mt-5'></span>

			<div className='flex flex-wrap justify-around py-16 gap-5'>
				<IconCard icon={<PiBookLight />} text='Wybierz przedmiot' />
				<IconCard icon={<CiUser />} text='Wybierz korepetytora' />
				<IconCard icon={<CiMail />} text='Napisz wiadomość' />
			</div>
		</div>
	);
}

export default HowToStartSteps;
