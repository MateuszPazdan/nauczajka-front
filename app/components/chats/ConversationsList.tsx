'use client';

import { useGetChatsQuery } from '@/redux/features/chatsApiSlice';
import { useEffect, useState } from 'react';

function ConversationsList() {
	const [load, setLoad] = useState(1);
	const [allChats, setAllChats] = useState<any[]>([]);
	const { data: chats, isSuccess } = useGetChatsQuery({
		p: load,
		page_size: 3,
	});

	return (
		<div>
			<div className=' overflow-scroll flex flex-col gap-5'>
				{chats?.map((chat) => (
					<div className='bg-orange-100' key={chat.id}>
						{chat.id}
					</div>
				))}
			</div>
			<button>Load more</button>
		</div>
	);
}

export default ConversationsList;
