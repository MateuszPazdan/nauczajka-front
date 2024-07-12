import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

interface Filters {
	skills: string[];
	individual_sessions_available: string;
	group_sessions_available: string;
	in_person_sessions_available: string;
	online_sessions_available: string;
	avg_rating__gte: string;
	avg_rating__lte: string;
	price__gte: string;
	price__lte: string;
	sorting_by_hourly_rate: string;
	sorting_by_average_rating: string;
	tutoring_location: string;
}

export default function useInstructorsFilters() {
	const searchParams = useSearchParams();
	const params = new URLSearchParams(searchParams);
	const [modalVisible, setModalVisible] = useState<string | null>(null);
	const [isFilterActive, setIsFilterActive] = useState({
		skills: false,
		sessionMethods: false,
		price_review: false,
	});
	const [filters, setFilters] = useState<Filters>({
		skills: params.getAll('skills') || [],
		individual_sessions_available:
			params.get('individual_sessions_available') || '',
		group_sessions_available: params.get('group_sessions_available') || '',
		in_person_sessions_available:
			params.get('in_person_sessions_available') || '',
		online_sessions_available: params.get('online_sessions_available') || '',
		avg_rating__gte: params.get('avg_rating__gte') || '',
		avg_rating__lte: params.get('avg_rating__lte') || '',
		price__gte: params.get('price__gte') || '',
		price__lte: params.get('price__lte') || '',
		sorting_by_hourly_rate: params.get('sorting_by_hourly_rate') || '',
		sorting_by_average_rating: params.get('sorting_by_average_rating') || '',
		tutoring_location: params.get('tutoring_location') || '',
	});

	useEffect(() => {
		if (filters.skills.length > 0)
			setIsFilterActive((prevFilters) => ({ ...prevFilters, skills: true }));
		else
			setIsFilterActive((prevFilters) => ({ ...prevFilters, skills: false }));

		if (
			filters.individual_sessions_available !== '' ||
			filters.group_sessions_available !== '' ||
			filters.in_person_sessions_available !== '' ||
			filters.online_sessions_available !== ''
		)
			setIsFilterActive((prevFilters) => ({
				...prevFilters,
				sessionMethods: true,
			}));
		else
			setIsFilterActive((prevFilters) => ({
				...prevFilters,
				sessionMethods: false,
			}));

		if (
			filters.avg_rating__gte !== '' ||
			filters.avg_rating__lte !== '' ||
			filters.price__gte !== '' ||
			filters.price__lte !== ''
		) {
			setIsFilterActive((prevFilters) => ({
				...prevFilters,
				price_review: true,
			}));
		} else {
			setIsFilterActive((prevFilters) => ({
				...prevFilters,
				price_review: false,
			}));
		}
	}, [filters, setIsFilterActive]);
	return {
		modalVisible,
		setModalVisible,
		isFilterActive,
		setIsFilterActive,
		filters,
		setFilters,
	};
}
