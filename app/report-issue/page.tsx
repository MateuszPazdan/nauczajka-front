import { sendReportIssueAction } from '../_lib/actions';
import SubmitButton from '../components/SubmitButton';

export const metadata = {
	title: 'Zgłaszanie problemów',
};

function Page() {
	return (
		<div className='flex justify-center pt-10 min-h-full w-full max-w-96 mx-auto px-2'>
			<form
				action={sendReportIssueAction}
				className='flex flex-col gap-5 w-full'
			>
				<div className='flex flex-col'>
					<span className='text-xl text-center pt-5 text-main'>
						Formularz zgłoszeniowy
					</span>
					<div className='w-full h-px rounded-md my-5 bg-whiteHover '></div>
				</div>
				<span className='flex flex-col gap-2'>
					<label htmlFor='category' className='text-md'>
						Kategoria
					</label>
					<select
						name='category'
						required
						className='w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
					>
						<option value='' disabled>
							Wybierz
						</option>
						<option value='naruszenie_regulaminu'>Naruszenie regulaminu</option>
						<option value='problem_techniczny'>Problem techniczny</option>
						<option value='prosba_o_pomoc'>Prośba o pomoc</option>
					</select>
				</span>
				<span className='flex flex-col gap-2'>
					<label htmlFor='title'>Title</label>
					<input
						type='text'
						name='title'
						className='w-full p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
					/>
				</span>
				<span className='flex flex-col gap-2'>
					<label htmlFor='description'>Description</label>
					<textarea
						name='description'
						className='w-full max-h-36 min-h-28 p-2 border-2 focus:outline-none focus:ring-0 rounded-xl border-shadowBlack focus:border-main transition-colors duration-300'
					></textarea>
				</span>

				<SubmitButton>Wyślij</SubmitButton>
			</form>
		</div>
	);
}

export default Page;
