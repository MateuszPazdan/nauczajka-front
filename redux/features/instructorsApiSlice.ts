import { apiSlice } from '../services/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveAllInstructors: builder.query({
			query: () => ({ url: '/user/tutor/all/', method: 'GET' }),
		}),
	}),
});

export const { useRetrieveAllInstructorsQuery } = authApiSlice;
