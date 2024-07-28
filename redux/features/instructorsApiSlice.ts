import { apiSlice } from '../services/apiSlice';

interface TutorInfo {
	description: string;
	price: number;
	online_sessions_available: boolean;
	in_person_sessions_available: boolean;
	tutoring_location: string;
	individual_sessions_available: boolean;
	group_sessions_available: boolean;
}

export interface TutorSkill {
	skill: string;
}

export interface TutorSkills {
	skills: string[];
}

const instructorsApiSlice = apiSlice.injectEndpoints({
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
		retrieveShedule: builder.query({
			query: ({ tutor_id }) => ({
				url: `/user/tutor/schedule/${tutor_id}/`,
				method: 'GET',
			}),
		}),
		retrieveSheduleMe: builder.query<any, void>({
			query: () => ({
				url: `/user/tutor/schedule/me/`,
				method: 'GET',
			}),
		}),
		deleteSheduleById: builder.mutation({
			query: ({ sheduleId }) => ({
				url: `/user/tutor/schedule/me/${sheduleId}/`,
				method: 'DELETE',
			}),
		}),
		createShedule: builder.mutation({
			query: ({ start_time, end_time }) => ({
				url: `/user/tutor/schedule/me/`,
				method: 'POST',
				body: { start_time, end_time },
			}),
		}),
		retrieveTutorInfo: builder.query<TutorInfo, void>({
			query: () => ({
				url: `/user/tutor/me/`,
				method: 'GET',
			}),
		}),
		setTutorInfo: builder.mutation({
			query: ({ field, value }) => ({
				url: `/user/tutor/me/`,
				method: 'PATCH',
				body: { [field]: value },
			}),
		}),
		retrieveAllTutorSkills: builder.query<TutorSkill[], void>({
			query: () => ({
				url: `/user/tutor/skills/`,
				method: 'GET',
			}),
		}),
		retrieveTutorSkills: builder.query<TutorSkills, void>({
			query: () => ({
				url: `/user/tutor/skills/me/`,
				method: 'GET',
			}),
		}),
		setTutorSkills: builder.mutation({
			query: (skills) => ({
				url: `/user/tutor/skills/me/`,
				method: 'PUT',
				body: { skills: skills },
			}),
		}),
	}),
});

export const {
	useMakeOpinionMutation,
	useRetrieveOpinionsQuery,
	useRetrieveSheduleQuery,
	useRetrieveSheduleMeQuery,
	useDeleteSheduleByIdMutation,
	useCreateSheduleMutation,
	useRetrieveTutorInfoQuery,
	useSetTutorInfoMutation,
	useRetrieveAllTutorSkillsQuery,
	useRetrieveTutorSkillsQuery,
	useSetTutorSkillsMutation,
} = instructorsApiSlice;
