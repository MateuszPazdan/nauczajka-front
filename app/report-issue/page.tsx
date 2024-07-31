'use client';

import { useReportIssueMutation } from '@/redux/features/authApiSlice';
// import { sendReportIssueAction } from '../api/apiIssues';
import SubmitButton from '../components/SubmitButton';

function Page() {
	const [report] = useReportIssueMutation();
	function sendReportIssueAction(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		report({
			category: formData.get('category'),
			title: formData.get('title'),
			description: formData.get('description'),
		});
	}
	return (
		<div className='flex justify-center items-center min-h-full'>
			<form onSubmit={sendReportIssueAction}>
				<span>
					<label htmlFor='category'>Category</label>
					<select name='category'>
						<option value=''>Select</option>
						<option value='naruszenie_regulaminu'>Bug</option>
						<option value='problem_techniczny'>Feature</option>
						<option value='prosba_o_pomoc'>Enhancement</option>
					</select>
				</span>
				<span>
					<label htmlFor='title'>Title</label>
					<input type='text' name='title' />
				</span>
				<span>
					<label htmlFor='description'>Description</label>
					<textarea name='description'></textarea>
				</span>
                <button>aa</button>
				{/* <SubmitButton>Wyślij</SubmitButton> */}
			</form>
		</div>
	);
}

export default Page;
