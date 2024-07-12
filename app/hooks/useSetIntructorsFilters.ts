import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Filters {
	skills?: string[];
	individual_sessions_available?: string;
	group_sessions_available?: string;
	in_person_sessions_available?: string;
	online_sessions_available?: string;
	avg_rating__gte?: string;
	avg_rating__lte?: string;
	price__gte?: string;
	price__lte?: string;
	sorting_by_hourly_rate?: string;
	sorting_by_average_rating?: string;
	tutoring_location?: string;
}

export default function useSetIntructorsFilters() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	function setFilters(filters: Filters, filterType: string) {
		const params = new URLSearchParams(searchParams);
		params.set('p', '1');
		if (filterType === 'location') {
			params.delete('tutoring_location');
		}
		if (filterType === 'sort') {
			params.delete('sorting_by_hourly_rate');
			params.delete('sorting_by_average_rating');
		}
		if (filterType === 'sessionMethods') {
			params.delete('individual_sessions_available');
			params.delete('group_sessions_available');
			params.delete('in_person_sessions_available');
			params.delete('online_sessions_available');
		}
		if (filterType === 'price_review') {
			params.delete('avg_rating__gte');
			params.delete('avg_rating__lte');
			params.delete('price__gte');
			params.delete('price__lte');
		}
		Object.entries(filters).forEach(([key, value]) => {
			if (value !== '' && key !== 'skills') params.set(key, value);
			else params.delete(key);
		});
		router.replace(`${pathname}?${params.toString()}`, {
			scroll: false,
		});
	}

	return { setFilters };
}
