import { apiSlice } from '../services/apiSlice';

export interface User {
	id: string;
	email: string;
	first_name: string;
	last_name: string;
	profile_image: string;
	is_tutor: boolean;
	created_at: string;
}

export interface Notification {
	id: number;
	notification: { message: string };
	is_read: boolean;
	created_at: string;
}

export interface NotificationsCount {
	unread_notification_count: number;
}

export interface NotificationsRepsonse {
	count: number;
	next: string;
	previous: string;
	results: Notification[];
}

const authApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		retrieveUser: builder.query<User, void>({
			query: () => ({ url: '/user/profile/', method: 'GET' }),
		}),
		checkPassword: builder.mutation({
			query: (password) => ({
				url: '/user/check_password/',
				method: 'POST',
				body: { password },
			}),
		}),
		updateUser: builder.mutation({
			query: ({ fieldToUpdate, valueToUpdate }) => ({
				url: '/user/profile/',
				method: 'PATCH',
				body: { [fieldToUpdate]: valueToUpdate },
			}),
		}),
		updateAvatar: builder.mutation({
			query: (file) => {
				const formData = new FormData();
				formData.append('profile_image', file);
				return {
					url: '/user/profile_image/',
					method: 'PATCH',
					body: formData,
				};
			},
		}),
		socialAuthenticate: builder.mutation({
			query: ({ provider, state, code }) => ({
				url: `/o/${provider}/?state=${encodeURIComponent(
					state
				)}&code=${encodeURIComponent(code)}`,
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			}),
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
		verifyToken: builder.mutation({
			query: () => ({
				url: '/token/verify/',
				method: 'POST',
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
		logout: builder.mutation({
			query: () => ({ url: '/token/logout/', method: 'POST' }),
		}),
		deleteAccount: builder.mutation({
			query: () => ({ url: '/user/delete/', method: 'DELETE' }),
		}),
		getNotifications: builder.query<NotificationsRepsonse, any>({
			query: ({ p, page_size }) => ({
				url: `/notification/list/?p=${p}&page_size=${page_size}`,
				method: 'GET',
			}),
		}),
	}),
});

export const {
	useRetrieveUserQuery,
	useCheckPasswordMutation,
	useUpdateUserMutation,
	useSocialAuthenticateMutation,
	useUpdateAvatarMutation,
	useLoginMutation,
	useRegisterMutation,
	useVerifyTokenMutation,
	useVerifyEmailMutation,
	useResetPasswordMutation,
	useConfirmPasswordMutation,
	useLogoutMutation,
	useDeleteAccountMutation,
	useGetNotificationsQuery,
} = authApiSlice;
