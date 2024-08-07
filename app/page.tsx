import { Suspense } from 'react';
import { getBestRatings } from './api/apiInstructors';
import Footer from './components/Footer';
import BenefitsSection from './components/homepage/BenefitsSection';
import Header from './components/homepage/Header';
import HowToStartSteps from './components/homepage/HowToStartSteps';
import OpinionsSection from './components/homepage/OpinionsSection';
import Spinner from './components/Spinner';

export default async function Page() {
	const ratings = await getBestRatings(9);
	return (
		<div className='min-h-full flex flex-col gap-20'>
			<Header />
			<HowToStartSteps />
			<Suspense fallback={<Spinner size='medium' />} key={ratings}>
				<OpinionsSection ratings={ratings} />
			</Suspense>
			<BenefitsSection />
			<Footer />
		</div>
	);
}
