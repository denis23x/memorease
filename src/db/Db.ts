/** @format */
import { openDB, IDBPDatabase, StoreKey } from 'idb';
import type { Card } from '../models/Card';
import type { Deck } from '../models/Deck';

const dbPromise: Promise<IDBPDatabase<IDBPDatabase>> = openDB<IDBPDatabase>('memoreaseDB', 1, {
	upgrade(db: IDBPDatabase<IDBPDatabase>) {
		db.createObjectStore('decks', { keyPath: 'uid' });
		db.createObjectStore('cards', { keyPath: 'uid' });
	}
});

export const dbCreateDeck = async (deck: Deck): Promise<StoreKey<Deck, string>> => (await dbPromise).put('decks', deck);
export const dbDeleteDeck = async (uid: string): Promise<void> => (await dbPromise).delete('decks', uid);
export const dbGetAllDecks = async (): Promise<Deck[]> => (await dbPromise).getAll('decks');

export const dbCreateCard = async (card: Card): Promise<StoreKey<Card, string>> => (await dbPromise).put('cards', card);
export const dbDeleteCard = async (uid: string): Promise<void> => (await dbPromise).delete('cards', uid);
export const dbGetAllCards = async (): Promise<Card[]> => (await dbPromise).getAll('cards');
