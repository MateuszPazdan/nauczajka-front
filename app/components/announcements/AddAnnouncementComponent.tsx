'use client';

import { useState } from 'react';
import Modal from '../Modal';
import AddAnnouncementForm from '../forms/AddAnnouncementForm';

function AddAnnouncementComponent() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<button
				className={`rounded-md w-full text-center hover:bg-mainHover bg-main text-white p-2 transition-colors duration-300`}
				onClick={() => setIsModalOpen(true)}
			>
				Dodaj ogłoszenie
			</button>
			{isModalOpen && (
				<Modal>
					<AddAnnouncementForm setIsModalOpen={setIsModalOpen} />
				</Modal>
			)}
		</>
	);
}

export default AddAnnouncementComponent;
