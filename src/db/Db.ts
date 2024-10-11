/** @format */
import { openDB, IDBPDatabase, StoreKey } from 'idb';
import type { Card } from '../models/Card';
import type { Deck } from '../models/Deck';
import seedAi from '../assets/seed/seed-ai.json';
import seedAstronomy from '../assets/seed/seed-astronomy.json';
import seedAnimals from '../assets/seed/seed-animals.json';
import seedBiology from '../assets/seed/seed-biology.json';
import seedBooks from '../assets/seed/seed-books.json';
import seedCrypto from '../assets/seed/seed-crypto.json';
import seedGeography from '../assets/seed/seed-geography.json';
import seedHistory from '../assets/seed/seed-history.json';
import seedInventions from '../assets/seed/seed-inventions.json';
import seedMythology from '../assets/seed/seed-mythology.json';
import seedPhysics from '../assets/seed/seed-physics.json';
import seedQuotes from '../assets/seed/seed-quotes.json';
import seedScience from '../assets/seed/seed-science.json';
import seedSport from '../assets/seed/seed-sport.json';

const dbPromise: Promise<IDBPDatabase<IDBPDatabase>> = openDB<IDBPDatabase>('memoreaseDB', 1, {
	upgrade(db: IDBPDatabase<IDBPDatabase>) {
		db.createObjectStore('decks', { keyPath: 'uid' });
		db.createObjectStore('cards', { keyPath: 'uid' });
	}
});

dbPromise.then(async (db: IDBPDatabase<IDBPDatabase>) => {
	const decks: Deck[] = [
		{
			uid: 'seed-ai',
			name: 'AI'
		},
		{
			uid: 'seed-astronomy',
			name: 'Astronomy'
		},
		{
			uid: 'seed-animals',
			name: 'Animals'
		},
		{
			uid: 'seed-biology',
			name: 'Biology'
		},
		{
			uid: 'seed-books',
			name: 'Books'
		},
		{
			uid: 'seed-crypto',
			name: 'Crypto'
		},
		{
			uid: 'seed-geography',
			name: 'Geography'
		},
		{
			uid: 'seed-history',
			name: 'History'
		},
		{
			uid: 'seed-inventions',
			name: 'Inventions'
		},
		{
			uid: 'seed-mythology',
			name: 'Mythology'
		},
		{
			uid: 'seed-physics',
			name: 'Physics'
		},
		{
			uid: 'seed-quotes',
			name: 'Quotes'
		},
		{
			uid: 'seed-science',
			name: 'Science'
		},
		{
			uid: 'seed-sport',
			name: 'Sport'
		}
	];
	const cards: Card[] = [
		seedAi,
		seedAstronomy,
		seedAnimals,
		seedBiology,
		seedBooks,
		seedCrypto,
		seedGeography,
		seedHistory,
		seedInventions,
		seedMythology,
		seedPhysics,
		seedQuotes,
		seedScience,
		seedSport
	].flat();

	await Promise.all(decks.map(async (deck: Deck) => db.put('decks', deck)));
	await Promise.all(cards.map(async (card: Card) => db.put('cards', card)));
});

export const dbCreateDeck = async (deck: Deck): Promise<StoreKey<Deck, string>> => (await dbPromise).put('decks', deck);
export const dbDeleteDeck = async (uid: string): Promise<void> => (await dbPromise).delete('decks', uid);
export const dbGetAllDecks = async (): Promise<Deck[]> => (await dbPromise).getAll('decks');

export const dbCreateCard = async (card: Card): Promise<StoreKey<Card, string>> => (await dbPromise).put('cards', card);
export const dbDeleteCard = async (uid: string): Promise<void> => (await dbPromise).delete('cards', uid);
export const dbGetAllCards = async (): Promise<Card[]> => (await dbPromise).getAll('cards');
