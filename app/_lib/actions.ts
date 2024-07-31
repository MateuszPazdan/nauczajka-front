'use server';

import { API_KEY } from '../api/apiAuth';
import { sendReportIssue } from '../api/apiIssues';

export async function sendReportIssueAction(formData: FormData) {
	await sendReportIssue({
		category: String(formData.get('category')),
		title: String(formData.get('title')),
		description: String(formData.get('description')),
	});
}
