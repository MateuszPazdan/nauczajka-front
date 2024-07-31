'use server';

import { API_KEY } from './apiAuth';

export async function sendReportIssueAction(formData: FormData) {
	console.log(typeof formData.get('category'));
	try {
		const response = await fetch(`${API_KEY}/api/reporting/issue/create/`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				category: 'naruszenie_regulaminu',
				title: 'string',
				description: 'string',
			}),
		});

		if (!response.ok) {
			throw new Error(`Błąd serwera: ${response.status}`);
		}
		const data = await response.json();
		console.log(data);
	} catch (error) {
		console.log(error);
	}
}
