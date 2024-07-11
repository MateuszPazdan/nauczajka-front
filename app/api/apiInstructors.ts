import { API_KEY } from '../api/apiAuth';

export const INSTRUCTORS_PAGE_SIZE: number = 15;

export async function getAllInstructorsAction(searchParams: any) {
	let skillsList = '';

	if (searchParams?.skills?.length > 1 && Array.isArray(searchParams?.skills)) {
		skillsList = searchParams?.skills.reduce((acc: string, skill: string) => {
			return acc.concat('&skills=', skill);
		}, '');
	} else {
		skillsList = searchParams.skills ? `&skills=${searchParams.skills}` : '';
	}

	let additionalFilters = '';
	for (const [key, value] of Object.entries(searchParams)) {
		if (key !== 'skills' && value !== '' && key !== 'page_size') {
			additionalFilters += additionalFilters.concat(`&${key}=`, String(value));
		}
	}

	try {
		const response = await fetch(
			`${API_KEY}/api/user/tutor/search/?${additionalFilters}${skillsList}&page_size=${INSTRUCTORS_PAGE_SIZE}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
				},
			}
		);
		// await new Promise((res) => setTimeout(res, 2000));
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Nie udało się pobrać listy korepetytorów');
	}
}

export async function getAllSkillsAction() {
	try {
		const response = await fetch(`${API_KEY}/api/user/tutor/skills/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		await new Promise((res) => setTimeout(res, 2000));
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Nie udało się pobrać listy umiejętności');
	}
}

export async function getInstructorDetailsAction(instructorId: number) {
	try {
		const response = await fetch(`${API_KEY}/api/user/tutor/details/${instructorId}/`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});
		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data = await response.json();
		return data;
	} catch (error) {
		throw new Error('Nie udało się pobrać danych korepetytora');
	}
}
