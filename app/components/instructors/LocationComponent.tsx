import useSetIntructorsFilters from '@/app/hooks/useSetIntructorsFilters';

function LocationComponent({ setFilters }: { setFilters: any }) {
	const { setFilters: setInstructorFilters } = useSetIntructorsFilters();
	return (
		<div className='w-full '>
			<input
				type='text'
				className='text-sm min-w-32 py-1 px-2  focus:border-main  w-full border-whiteHover border-2 rounded-md focus:outline-none focus:ring-0'
				placeholder='Miasto'
				onChange={(e) => {
					setInstructorFilters({ tutoring_location: e.target.value }, 'location');
					setFilters((prevFilters: any) => ({
						...prevFilters,
						tutoring_location: e.target.value,
					}));
				}}
			/>
		</div>
	);
}

export default LocationComponent;
