'use client';

export default function Error({ error, reset }: any) {
	return (
		<main className='flex justify-center items-center flex-col gap-6'>
			<h1 className='text-3xl font-semibold'>Coś poszło nie tak</h1>
			<p className='text-lg'>{error.message}</p>

			<button
				onClick={reset}
				className='inline-block bg-accent-500 text-primary-800 px-6 py-3 text-lg'
			>
				Spróbuj ponownie
			</button>
		</main>
	);
}
