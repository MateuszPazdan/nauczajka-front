import { apiSlice } from '../services/apiSlice';

export interface Chat {
	id: string;
	last_message: any;
	updated_at: string;
	users: any[];
	created_at: string;
	created_by: any;
}

const chatsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getChats: builder.query({
			query: ({ p, page_size }) => ({
				url: `/chat/conversations/?p=${p}&page_size=${page_size}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetChatsQuery } = chatsApiSlice;
