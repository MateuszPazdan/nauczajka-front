'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import AnnouncementElement from './AnnouncementElement';
import Spinner from '../Spinner';
import AddAnnouncementComponent from './AddAnnouncementComponent';
import { useRetrieveUserQuery } from '@/redux/features/authApiSlice';

function AnnouncementsList({ data }: any) {
	const { data: user, isLoading: isUserLoading } = useRetrieveUserQuery();
	const [allAnnouncements, setAllAnnouncements] = useState<any[]>(
		data?.results ?? []
	);
	const [isLoading, setIsLoading] = useState(false);
	const announcementsContainer = useRef<HTMLDivElement>(null);
	const [nextLink, setNextLink] = useState(data?.next);

	const handleLoadMoreAnnouncements = useCallback(async () => {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data?.next ?? null);
		setAllAnnouncements((prevAnnouncements) => {
			const announcementsIds = new Set(
				prevAnnouncements.map((announcement) => announcement.id)
			);
			const newAnnouncements = data.results.filter(
				(announcement: any) => !announcementsIds.has(announcement.id)
			);
			return [...prevAnnouncements, ...newAnnouncements];
		});
	}, [nextLink]);

	useEffect(() => {
		if (announcementsContainer.current) {
			if (
				announcementsContainer.current.scrollHeight <=
				announcementsContainer.current.clientHeight
			) {
				handleLoadMoreAnnouncements();
			}
		}
	}, [handleLoadMoreAnnouncements]);

	function handleScroll() {
		if (announcementsContainer.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				announcementsContainer.current;
			const scrollFromBottom = scrollHeight - scrollTop - clientHeight;

			if (scrollFromBottom < 5 && !isLoading) {
				handleLoadMoreAnnouncements();
				announcementsContainer.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
			if (scrollFromBottom < 5 && isLoading) {
				announcementsContainer.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
		}
	}

	if (isUserLoading) return <Spinner size='large' />;

	return (
		<>
			<span className='text-2xl text-center pt-5 text-main'>Ogłoszenia</span>
			<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
			{user?.is_tutor && (
				<div className='w-full mx-auto px-2'>
					<AddAnnouncementComponent />
					<div className='w-full h-px rounded-md mt-5 bg-whiteHover '></div>
				</div>
			)}
			<div
				className='px-2 pt-5 pb-5 w-full flex flex-col gap-2 overflow-y-scroll'
				onScroll={handleScroll}
				ref={announcementsContainer}
			>
				{allAnnouncements.length > 0 ? (
					allAnnouncements.map((announcement: any) => (
						<AnnouncementElement
							announcement={announcement}
							key={announcement.id}
						/>
					))
				) : (
					<span>Brak ogłoszeń</span>
				)}
				{isLoading && <Spinner size='small' />}
			</div>
		</>
	);
}

export default AnnouncementsList;
