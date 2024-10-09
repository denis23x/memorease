/** @format */

import { openDB, IDBPDatabase, StoreKey } from 'idb';
import type { Card } from '../models/Card';
import type { Deck } from '../models/Deck';
import type { Score } from '../models/Score';

const dbPromise: Promise<IDBPDatabase<IDBPDatabase>> = openDB<IDBPDatabase>('memoreaseDB', 1, {
	upgrade(db: IDBPDatabase<IDBPDatabase>) {
		db.createObjectStore('decks', { keyPath: 'uid' });
		db.createObjectStore('cards', { keyPath: 'uid' });
		db.createObjectStore('score', { keyPath: 'uid' });
	}
});

export const getDecks = async (): Promise<Deck[]> => (await dbPromise).getAll('decks');
export const addDeck = async (deck: Deck): Promise<StoreKey<Deck, string>> => (await dbPromise).put('decks', deck);
export const deleteDeck = async (uid: string): Promise<void> => (await dbPromise).delete('decks', uid);

// prettier-ignore
export const getCards = async (deckUid: string): Promise<Card[]> => (await dbPromise).getAll('cards').then((cards: Card[]) => cards.filter((card: Card) => card.deckUid === deckUid));
export const addCard = async (card: Card): Promise<StoreKey<Card, string>> => (await dbPromise).put('cards', card);
export const deleteCard = async (uid: string): Promise<void> => (await dbPromise).delete('cards', uid);

export const getScores = async (): Promise<Score[]> => (await dbPromise).getAll('score');
export const addScore = async (score: Score): Promise<StoreKey<Score, string>> => (await dbPromise).put('score', score);
export const deleteScore = async (uid: string): Promise<void> => (await dbPromise).delete('score', uid);
