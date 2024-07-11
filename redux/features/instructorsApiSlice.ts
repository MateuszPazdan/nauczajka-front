import { apiSlice } from '../services/apiSlice';

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		makeOpinion: builder.mutation({
			query: ({ review, rating, tutor_id }) => ({
				url: `/user/rate_tutor/${tutor_id}/`,
				method: 'POST',
				body: { review, rating },
			}),
		}),
		retrieveOpinions: builder.query({
			query: ({ tutor_id, page, page_size }) => ({
				url: `/user/tutor/reviews/${tutor_id}/?p=${page}&page_size=${page_size}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useMakeOpinionMutation, useRetrieveOpinionsQuery } =
	authApiSlice;
