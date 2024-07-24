import { apiSlice } from '../services/apiSlice';

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
