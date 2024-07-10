'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { INSTRUCTORS_PAGE_SIZE } from '../api/apiInstructors';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import React from 'react';

function Pagination({ searchParams, data }: { searchParams: any; data: any }) {
	const pagesCount = Math.ceil(data.count / INSTRUCTORS_PAGE_SIZE);
	const currentPage = searchParams.p ?? 1;

	const pathname = usePathname();
	const router = useRouter();

	function handleChangePage(pageNumber: number) {
		const params = new URLSearchParams(searchParams);
		if (searchParams?.p !== '') params.set('p', String(pageNumber));
		router.replace(`${pathname}?${params.toString()}`, { scroll: false });
	}

	return (
		<div>
			<div className='flex justify-center gap-2'>
				<ArrowButton
					disabled={Number(currentPage) <= 1}
					onClick={() => handleChangePage(Number(currentPage) - 1)}
				>
					<FaAngleLeft />
				</ArrowButton>
				<span>{currentPage}</span>
				<span>z</span>
				<span>{pagesCount}</span>
				<ArrowButton
					disabled={Number(currentPage) >= pagesCount}
					onClick={() => handleChangePage(Number(currentPage) + 1)}
				>
					<FaAngleRight />
				</ArrowButton>
			</div>
		</div>
	);
}

function ArrowButton({
	disabled,
	onClick,
	children,
}: {
	disabled: boolean;
	onClick: () => void;
	children: React.ReactNode;
}) {
	if (disabled) return null;
	return (
		<button
			disabled={disabled}
			onClick={onClick}
			className={
				'text-black hover:text-mainHover cursor-pointer transition-colors'
			}
		>
			{children}
		</button>
	);
}

export default Pagination;
