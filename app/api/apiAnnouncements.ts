import { API_KEY } from './apiAuth';

export default async function getAnnouncements() {
	try {
		const response = await fetch(
			`${API_KEY}/api/announcement/announcements/?page_size=10`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
				credentials: 'include'
			}
		);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}

		return data;
	} catch (error) {
		console.log(error);
	}
}
