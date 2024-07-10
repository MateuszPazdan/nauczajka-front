import { CiSquareChevDown, CiSquareChevUp } from 'react-icons/ci';
import ListElement from './ListElement';
import useSetIntructorsFilters from '@/app/hooks/useSetIntructorsFilters';

function SortList({ setFilters, filters }: { setFilters: any; filters: any }) {
	const { setFilters: setInstructorFilters } = useSetIntructorsFilters();
	function handleChooseSort(sortBy: any) {
		let instructorsFilters = {};
		if (sortBy === 'hourlyPriceDesc') {
			instructorsFilters = {
				...instructorsFilters,
				sorting_by_hourly_rate: 'desc',
			};
			setFilters((prevFilters: any) => ({
				...prevFilters,
				sorting_by_hourly_rate: 'desc',
				sorting_by_average_rating: '',
			}));
		}
		if (sortBy === 'hourlyPriceAsc') {
			instructorsFilters = {
				...instructorsFilters,
				sorting_by_hourly_rate: 'asc',
			};
			setFilters((prevFilters: any) => ({
				...prevFilters,
				sorting_by_hourly_rate: 'asc',
				sorting_by_average_rating: '',
			}));
		}
		if (sortBy === 'avgRatingDesc') {
			instructorsFilters = {
				...instructorsFilters,
				sorting_by_average_rating: 'desc',
			};
			setFilters((prevFilters: any) => ({
				...prevFilters,
				sorting_by_hourly_rate: '',
				sorting_by_average_rating: 'desc',
			}));
		}

		if (sortBy === 'avgRatingAsc') {
			instructorsFilters = {
				...instructorsFilters,
				sorting_by_average_rating: 'asc',
			};
			setFilters((prevFilters: any) => ({
				...prevFilters,
				sorting_by_hourly_rate: '',
				sorting_by_average_rating: 'asc',
			}));
		}
		setInstructorFilters(instructorsFilters, 'sort');
	}

	function handleClick(value: string) {
		handleChooseSort(value);
	}
	return (
		<>
			<ListElement
				icon={<CiSquareChevDown />}
				isActive={filters.sorting_by_hourly_rate === 'desc'}
				onClick={() => handleClick('hourlyPriceDesc')}
			>
				Cena
			</ListElement>
			<ListElement
				icon={<CiSquareChevUp />}
				isActive={filters.sorting_by_hourly_rate === 'asc'}
				onClick={() => handleClick('hourlyPriceAsc')}
			>
				Cena
			</ListElement>
			<ListElement
				icon={<CiSquareChevDown />}
				isActive={filters.sorting_by_average_rating === 'desc'}
				onClick={() => handleClick('avgRatingDesc')}
			>
				Ocena
			</ListElement>
			<ListElement
				icon={<CiSquareChevUp />}
				isActive={filters.sorting_by_average_rating === 'asc'}
				onClick={() => handleClick('avgRatingAsc')}
			>
				Ocena
			</ListElement>
		</>
	);
}

export default SortList;
