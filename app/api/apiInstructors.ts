import { API_KEY } from '../api/apiAuth';

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
		if (key !== 'skills' && value !== '') {
			additionalFilters += additionalFilters.concat(`&${key}=`, String(value));
		}
	}
	console.log(additionalFilters, skillsList, 'dsadsadsa');
	const response = await fetch(
		`${API_KEY}/api/user/tutor/search/?${additionalFilters}${skillsList}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	);

	if (!response.ok) {
		throw new Error('Błąd przy pobieraniu listy korepetytorów');
	}
	const data = await response.json();

	return data;
}
