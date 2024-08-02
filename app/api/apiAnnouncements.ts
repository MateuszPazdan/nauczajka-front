import { API_KEY } from './apiAuth';

export default async function getAnnouncements() {
	try {
		const response = await fetch(
			`${API_KEY}/api/announcement/announcements/?page_size=20`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
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
