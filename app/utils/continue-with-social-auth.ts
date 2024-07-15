import { toast } from 'react-toastify';
import { API_KEY } from '../api/apiAuth';

export default async function continueWithSocialAuth(
	provider: string,
	redirect: string
) {
	try {
		const url = `${API_KEY}/api/o/${provider}/?redirect_uri=${
			process.env.NODE_ENV === 'production'
				? process.env.NEXT_PUBLIC_REDIRECT_URL
				: 'http://localhost:3000'
		}/auth/${redirect}`;
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				Aceept: 'application/json',
			},
			credentials: 'include',
		});
		const data = await response.json();
		if (response.status === 200 && typeof window !== 'undefined') {
			window.location.replace(data.authorization_url);
		} else {
			toast.error('Coś poszło nie tak');  
		}
	} catch (err) {
		toast.error('Coś poszło nie tak');
	}
}
