import { verify } from 'crypto';
import { apiSlice } from '../services/apiSlice';

interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
	is_tutor: string;
	created_at: string;
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/user/profile/', method: 'GET' }),
		}),
		login: builder.mutation({
			query: ({ email, password }) => ({
				url: '/token/',
				method: 'POST',
				body: { email, password },
			}),
		}),
		register: builder.mutation({
			query: ({ email, first_name, last_name, password, is_tutor }) => ({
				url: '/user/create/',
				method: 'POST',
				body: { email, first_name, last_name, password, is_tutor },
			}),
		}),
		verifyEmail: builder.mutation({
			query: ({ token }) => ({
				url: '/user/confirm_user/',
				method: 'POST',
				body: { token },
			}),
		}),
		resetPassword: builder.mutation({
			query: ({ email }) => ({
				url: '/user/password_reset/',
				method: 'POST',
				body: { email },
			}),
		}),
		confirmPassword: builder.mutation({
			query: ({ token, password }) => ({
				url: '/user/password_reset/confirm/',
				method: 'POST',
				body: { token, password },
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useLoginMutation,
	useRegisterMutation,
	useVerifyEmailMutation,
	useResetPasswordMutation,
	useConfirmPasswordMutation,
} = authApiSlice;
