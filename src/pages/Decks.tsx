/** @format */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import Back from '../components/Back';
import Deck from '../components/Deck';
import Modal from '../components/Modal';
import { nanoid } from '../services/Helper';

const Decks: React.FC = () => {
	const { decks, createDeck } = useStore();

	const [deckName, setDeckName] = useState<string>('');

	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);

	useEffect(() => {
		setFilteredDecks(decks);
	}, [decks]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const handleSearch = (value: string) => {
		const filteredDecks: DeckType[] = decks.filter((deck: DeckType) => {
			return deck.name.toLowerCase().includes(value.toLowerCase());
		});

		setFilteredDecks(filteredDecks);
	};

	const handleCreateDeck = () => {
		const deck: DeckType = {
			uid: nanoid(),
			name: deckName
		};

		createDeck(deck).then(() => console.debug('Deck created'));
		setDeckName('');
	};

	return (
		<section className={'p-4'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4'}>
						<Back></Back>
						<h1 className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap py-2 px-4'}>
							Select a Deck
						</h1>
					</div>
					<input
						className={'me-input w-full !border-0'}
						onChange={e => handleSearch(e.target.value)}
						placeholder={'Search..'}
					/>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4 w-full'}>
					<li className={`col-span-1`}>
						<div
							className={`flex flex-col items-center justify-center gap-4 size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl shadow-deck p-1`}
						>
							<button className={'me-btn me-btn-dark px-4'} type={'button'} onClick={openModal}>
								Create
							</button>
							<button className={'me-btn me-btn-light px-4'} type={'button'}>
								Import
							</button>
						</div>
					</li>
					{filteredDecks.map((deck: DeckType) => (
						<li className={'col-span-1'} key={deck.uid}>
							<Deck deck={deck}></Deck>
						</li>
					))}
				</ul>
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
						<div className={'flex items-center justify-start gap-4'}>
							<button className={'me-btn me-btn-dark p-1'} type={'button'} onClick={closeModal}>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
								</svg>
							</button>
							<h1 className={'text-2xl font-bold bg-red-400 text-neutral-50 rounded-full text-nowrap py-2 px-4'}>
								New Deck
							</h1>
						</div>
						<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
							<input
								className={'me-input w-full !border-0'}
								value={deckName}
								onChange={e => setDeckName(e.target.value)}
								placeholder="Name"
							/>
							<button className={'me-btn me-btn-dark py-2 p-4 w-full'} type={'button'} onClick={handleCreateDeck}>
								Create
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Decks;
