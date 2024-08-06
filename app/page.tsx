import Header from './components/homepage/Header';
import HowToStartSteps from './components/homepage/HowToStartSteps';
import OpinionsSection from './components/homepage/OpinionsSection';

export default async function Page() {
	return (
		<div className='min-h-full flex flex-col gap-20'>
			<Header />
			<HowToStartSteps />
			<OpinionsSection />
		</div>
	);
}
