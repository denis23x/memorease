/** @format */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import Back from '../components/Back';
import Deck from '../components/Deck';

const Decks: React.FC = () => {
	const { decks } = useStore();

	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);

	useEffect(() => {
		setFilteredDecks(decks);
	}, [decks]);

	const handleSearch = (value: string) => {
		const filteredDecks: DeckType[] = decks.filter((deck: DeckType) => {
			return deck.name.toLowerCase().includes(value.toLowerCase());
		});

		setFilteredDecks(filteredDecks);
	};

	// const handleCreateDeck = () => {
	// 	const deck: DeckType = {
	// 		uid: nanoid(),
	// 		name: deckName
	// 	};
	//
	// 	createDeck(deck).then(() => console.debug('Deck created'));
	// 	setDeckName('');
	// };

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
							<button className={'me-btn me-btn-dark px-4'} type={'button'}>
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
			</div>
		</section>
	);
};

export default Decks;
