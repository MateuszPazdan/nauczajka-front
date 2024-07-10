'use client';

import { useState } from 'react';
import SearchInput from './SearchInput';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

function Filters() {
	const [search, setSearch] = useState('');
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const router = useRouter();

	function handleSearchFilter() {
		const params = new URLSearchParams(searchParams);
		if (search !== '') params.set('search_by_full_name', search);
		if (search === '') params.delete('search_by_full_name');
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === 'Enter') {
			handleSearchFilter();
		}
	}

	return (
		<div className='w-full'>
			<SearchInput
				onClick={handleSearchFilter}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
		</div>
	);
}

export default Filters;
