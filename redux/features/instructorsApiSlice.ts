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
	}),
});

export const { useMakeOpinionMutation } = authApiSlice;
