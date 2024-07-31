'use server';

import { API_KEY } from './apiAuth';

export async function sendReportIssue({
	category,
	title,
	description,
}: {
	category: string;
	title: string;
	description: string;
}) {
	try {
		const response = await fetch(`${API_KEY}/api/reporting/issue/create/`, {
			credentials: 'include',
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
			body: JSON.stringify({
				category: category,
				title: title,
				description: description,
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
