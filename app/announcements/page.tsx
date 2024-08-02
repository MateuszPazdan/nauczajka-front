import getAnnouncements from '../api/apiAnnouncements';
import AnnouncementsList from '../components/announcements/AnnouncementsList';

export const metadata = {
	title: 'Ogłoszenia',
};

async function Page() {
	const data = await getAnnouncements();
	
	return (
		<div className='flex flex-col items-center min-h-full w-full mx-auto max-w-[600px] py-10'>
			<span className='text-xl text-center pt-5 text-main'>Ogłoszenia</span>
			<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			<AnnouncementsList data={data} />
		</div>
	);
}

export default Page;
