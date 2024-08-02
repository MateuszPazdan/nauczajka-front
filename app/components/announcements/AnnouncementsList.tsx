import AnnouncementElement from './AnnouncementElement';

function AnnouncementsList({ data }: any) {
	return (
		<div className='px-2 w-full flex flex-col gap-2'>
			{data?.results?.length > 0 ? (
				data.results?.map((announcement: any) => (
					<AnnouncementElement
						announcement={announcement}
						key={announcement.id}
					/>
				))
			) : (
				<span>Brak ogłoszeń</span>
			)}
		</div>
	);
}

export default AnnouncementsList;
