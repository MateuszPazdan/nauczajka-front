'use client';

import useSearchByName from '@/app/hooks/useSearchByName';
import SearchInput from './SearchInput';
import SearchButton from './SearchButton';
import { CiFilter } from 'react-icons/ci';
import { BsSortAlphaDown } from 'react-icons/bs';
import ListComponent from './ListComponent';
import LocationComponent from './LocationComponent';
import SortList from './SortList';
import Modal from '../Modal';
import PriceReview from './PriceReview';
import AddFilterContainer from './addFilterContainer';
import SessionMethods from './SessionMethods';
import useInstructorsFilters from '@/app/hooks/useInstructorsFilters';
interface Skill {
	skill: string;
}

function Filters({ availableSkils }: { availableSkils: Skill[] }) {
	const { search, handleKeyDown, handleSearchFilter, setSearch } =
		useSearchByName();
	const { filters, isFilterActive, modalVisible, setFilters, setModalVisible } =
		useInstructorsFilters();

	return (
		<div className='w-full sm400:w-3/4 md800:max-w-[700px] px-2 mx-auto py-5 flex flex-col gap-2'>
			<button ></button>
			<SearchInput
				onClick={handleSearchFilter}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onKeyDown={handleKeyDown}
			/>
			<div className='flex flex-col sm400:flex-row flex-wrap w-full sm400:w-auto gap-2 text-sm'>
				<SearchButton
					icon={<CiFilter />}
					isActive={isFilterActive.skills}
					onClick={() => setModalVisible('skills')}
				>
					Przedmioty
				</SearchButton>
				<SearchButton
					icon={<CiFilter />}
					isActive={isFilterActive.sessionMethods}
					onClick={() => setModalVisible('sessionMethods')}
				>
					Metodyka
				</SearchButton>
				<SearchButton
					icon={<CiFilter />}
					isActive={isFilterActive.price_review}
					onClick={() => setModalVisible('price_review')}
				>
					Opinia/Cena
				</SearchButton>
				<ListComponent icon={<CiFilter />} title={'Miasto'}>
					<LocationComponent
						setFilters={setFilters}
						location={filters.tutoring_location}
					/>
				</ListComponent>
				<ListComponent title={'Sortuj'} icon={<BsSortAlphaDown />}>
					<SortList filters={filters} setFilters={setFilters} />
				</ListComponent>
			</div>
			{modalVisible && (
				<Modal>
					{modalVisible === 'skills' && (
						<AddFilterContainer
							setModalVisible={setModalVisible}
							filters={filters}
							setFilters={setFilters}
							availableSkils={availableSkils}
						/>
					)}
					{modalVisible === 'sessionMethods' && (
						<SessionMethods
							setModalVisible={setModalVisible}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
					{modalVisible === 'price_review' && (
						<PriceReview
							setModalVisible={setModalVisible}
							filters={filters}
							setFilters={setFilters}
						/>
					)}
				</Modal>
			)}
		</div>
	);
}

export default Filters;
