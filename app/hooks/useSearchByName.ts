'use client';
import { useState } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

export default function useSearchByName() {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();
	const [search, setSearch] = useState(
		searchParams.get('search_by_full_name') || ''
	);

	function handleSearchFilter() {
		const params = new URLSearchParams(searchParams);
		if (search !== '') {
			params.set('search_by_full_name', search);
			params.delete('p');
		}
		if (search === '') params.delete('search_by_full_name');
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			handleSearchFilter();
		}
	}

	return { search, setSearch, handleSearchFilter, handleKeyDown };
}
