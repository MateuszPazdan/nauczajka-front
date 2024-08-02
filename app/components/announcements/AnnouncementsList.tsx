'use client';

import { useEffect, useRef, useState } from 'react';
import AnnouncementElement from './AnnouncementElement';
import Spinner from '../Spinner';

function AnnouncementsList({ data }: any) {
	const [allAnnouncements, setAllAnnouncements] = useState<any[]>(
		data?.results ?? []
	);
	const [isLoading, setIsLoading] = useState(false);
	const announcementsContainer = useRef<HTMLDivElement>(null);
	const [nextLink, setNextLink] = useState(data?.next);

	async function handleLoadMoreAnnoucements() {
		if (!nextLink) return;
		setIsLoading(true);
		const response = await fetch(nextLink, { credentials: 'include' });
		const data = await response.json();
		setIsLoading(false);
		setNextLink(data?.next ?? null);
		setAllAnnouncements((prevAnnouncements) => [
			...prevAnnouncements,
			...data.results,
		]);
	}

	// useEffect(() => {
	// 	if (announcementsContainer.current) {
	// 		if (
	// 			announcementsContainer.current.scrollHeight <=
	// 			announcementsContainer.current.clientHeight
	// 		) {
	// 			handleLoadMoreAnnoucements();
	// 		}
	// 	}
	// }, [handleLoadMoreAnnoucements]);

	function handleScroll() {
		if (announcementsContainer.current) {
			const { scrollTop, scrollHeight, clientHeight } =
				announcementsContainer.current;
			const scrollFromBottom = scrollHeight - scrollTop - clientHeight;

			if (scrollFromBottom < 5 && !isLoading) {
				handleLoadMoreAnnoucements();
				announcementsContainer.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
			if (scrollFromBottom < 5 && isLoading) {
				announcementsContainer.current.scrollTop =
					scrollHeight - clientHeight - 10;
			}
		}
	}
	return (
		<div
			className='px-2 pb-3 w-full flex flex-col gap-2 overflow-y-scroll'
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
	);
}

export default AnnouncementsList;
