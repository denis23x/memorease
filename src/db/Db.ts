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

dbPromise.then(x => {
	x.put('decks', { uid: 'test', name: 'AI' }).then(() => {});

	const asd = [
		{
			uid: 'q1',
			deckUid: 'test',
			question: 'What is artificial intelligence?',
			answer:
				'Artificial intelligence (AI) is a branch of computer science that deals with creating intelligent agents, which are systems that can reason, learn, and act autonomously.'
		},
		{
			uid: 'q2',
			deckUid: 'test',
			question: 'What are the different types of AI?',
			answer: 'There are three main types of AI: narrow AI, general AI, and superintelligence.'
		},
		{
			uid: 'q3',
			deckUid: 'test',
			question: 'What are some examples of AI in use today?',
			answer:
				'Some examples of AI in use today include virtual assistants, self-driving cars, and recommendation systems.'
		},
		{
			uid: 'q4',
			deckUid: 'test',
			question: 'What are the potential benefits of AI?',
			answer:
				'The potential benefits of AI include increased efficiency, improved decision-making, and new opportunities for innovation.'
		},
		{
			uid: 'q5',
			deckUid: 'test',
			question: 'What are the potential risks of AI?',
			answer:
				'The potential risks of AI include job displacement, privacy concerns, and the possibility of AI being used for malicious purposes.'
		},
		{
			uid: 'q6',
			deckUid: 'test',
			question: 'How can we ensure that AI is developed and used ethically?',
			answer:
				'We can ensure that AI is developed and used ethically by developing and following ethical guidelines and regulations.'
		},
		{
			uid: 'q7',
			deckUid: 'test',
			question: 'What is machine learning?',
			answer: 'Machine learning is a subset of AI that involves training computers to learn from data.'
		},
		{
			uid: 'q8',
			deckUid: 'test',
			question: 'What are some common machine learning algorithms?',
			answer:
				'Some common machine learning algorithms include linear regression, logistic regression, decision trees, and neural networks.'
		},
		{
			uid: 'q9',
			deckUid: 'test',
			question: 'What is deep learning?',
			answer:
				'Deep learning is a subset of machine learning that involves training artificial neural networks with multiple layers.'
		},
		{
			uid: 'q10',
			deckUid: 'test',
			question: 'What is the future of AI?',
			answer: 'The future of AI is bright, with the potential to revolutionize many aspects of our lives.'
		}
	];

	// prettier-ignore
	Promise.all([...asd.map(async (card: Card) => x.put('cards', card))]).then(() => {})
});

export const dbCreateDeck = async (deck: Deck): Promise<StoreKey<Deck, string>> => (await dbPromise).put('decks', deck);
export const dbDeleteDeck = async (uid: string): Promise<void> => (await dbPromise).delete('decks', uid);
export const dbGetAllDecks = async (): Promise<Deck[]> => (await dbPromise).getAll('decks');

export const dbCreateCard = async (card: Card): Promise<StoreKey<Card, string>> => (await dbPromise).put('cards', card);
export const dbDeleteCard = async (uid: string): Promise<void> => (await dbPromise).delete('cards', uid);
export const dbGetAllCards = async (): Promise<Card[]> => (await dbPromise).getAll('cards');
