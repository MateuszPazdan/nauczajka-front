import getAnnouncements from '../api/apiAnnouncements';
import AddAnnouncementComponent from '../components/announcements/AddAnnouncementComponent';
import AnnouncementsList from '../components/announcements/AnnouncementsList';

export const metadata = {
	title: 'Ogłoszenia',
};

export const revalidate = 0;

async function Page() {
	const data = await getAnnouncements();

	return (
		<div className='flex flex-col items-center min-h-full w-full mx-auto max-w-[600px] pt-10 h-full'>
			<span className='text-2xl text-center pt-5 text-main'>Ogłoszenia</span>
			<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			<AddAnnouncementComponent />
			<div className='w-full h-px rounded-md mt-5 bg-whiteHover '></div>
			<AnnouncementsList data={data} />
		</div>
	);
}

export default Page;
