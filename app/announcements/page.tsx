import { Suspense } from 'react';
import getAnnouncements from '../api/apiAnnouncements';
import AnnouncementsList from '../components/announcements/AnnouncementsList';

export const metadata = {
	title: 'Ogłoszenia',
};

export const revalidate = 0;

async function Page() {
	const data = await getAnnouncements();

	return (
		<div className='flex flex-col items-center min-h-full w-full mx-auto max-w-[600px] pt-10 h-full'>
			<Suspense key={data}>
				<AnnouncementsList data={data} />
			</Suspense>
		</div>
	);
}

export default Page;
