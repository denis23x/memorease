/** @format */

import { IDBPDatabase } from 'idb';
import type { Card } from '../models/Card';
import type { Deck } from '../models/Deck';
import { dbPromise } from './Db';
import dayjs from 'dayjs';

export const dbPromiseSeed: Promise<string> = new Promise((resolve, reject) => {
	dbPromise.then(async (db: IDBPDatabase<IDBPDatabase>) => {
		if (!localStorage.getItem('seed')) {
			const seedAi = await import('../assets/seed/seed-ai.json');
			const seedAstronomy = await import('../assets/seed/seed-astronomy.json');
			const seedAnimals = await import('../assets/seed/seed-animals.json');
			const seedBiology = await import('../assets/seed/seed-biology.json');
			const seedBooks = await import('../assets/seed/seed-books.json');
			const seedCrypto = await import('../assets/seed/seed-crypto.json');
			const seedGeography = await import('../assets/seed/seed-geography.json');
			const seedHistory = await import('../assets/seed/seed-history.json');
			const seedInventions = await import('../assets/seed/seed-inventions.json');
			const seedMythology = await import('../assets/seed/seed-mythology.json');
			const seedPhysics = await import('../assets/seed/seed-physics.json');
			const seedScience = await import('../assets/seed/seed-science.json');
			const seedSport = await import('../assets/seed/seed-sport.json');

			const decks: Omit<Deck, 'timestamp'>[] = [
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
					uid: 'seed-science',
					name: 'Science'
				},
				{
					uid: 'seed-sport',
					name: 'Sport'
				}
			];
			const cards: Omit<Card, 'timestamp'>[] = [
				seedAi.default,
				seedAstronomy.default,
				seedAnimals.default,
				seedBiology.default,
				seedBooks.default,
				seedCrypto.default,
				seedGeography.default,
				seedHistory.default,
				seedInventions.default,
				seedMythology.default,
				seedPhysics.default,
				seedScience.default,
				seedSport.default
			].flat();

			const decksPromise: Promise<IDBValidKey>[] = decks
				.map((deck: Omit<Deck, 'timestamp'>) => ({ ...deck, timestamp: dayjs().unix() }))
				.map(async (deck: Deck) => db.put('decks', deck));

			const cardsPromise: Promise<IDBValidKey>[] = cards
				.map((card: Omit<Card, 'timestamp'>) => ({ ...card, timestamp: dayjs().unix() }))
				.map(async (card: Card) => db.put('cards', card));

			await Promise.all(decksPromise);
			await Promise.all(cardsPromise);

			localStorage.setItem('seed', '1');

			resolve('Seed was loaded');
		} else {
			resolve('Seed is already existed');
		}
	});
});
