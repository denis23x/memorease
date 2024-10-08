/** @format */

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { dbCreateDeck, dbDeleteDeck, dbGetAllDecks, dbCreateCard, dbDeleteCard, dbGetAllCards } from '../db/Db';
import type { Card } from '../models/Card';
import type { Deck } from '../models/Deck';
import type { Score } from '../models/Score';

interface StoreContextProps {
	decks: Deck[];
	cards: Card[];
	scores: Score[];
	createDeck: (deck: Deck) => Promise<void>;
	deleteDeck: (deckUid: string) => Promise<void>;
	createCard: (card: Card) => Promise<void>;
	deleteCard: (cardUid: string) => Promise<void>;
	createScore: (score: Score) => void;
	deleteScore: (scoreUid: string) => void;
}

// prettier-ignore
const StoreContext: React.Context<StoreContextProps | undefined> = createContext<StoreContextProps | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
	const [decks, setDecks] = useState<Deck[]>([]);
	const [cards, setCards] = useState<Card[]>([]);
	const [scores, setScores] = useState<Score[]>([]);

	useEffect(() => {
		async function loadData() {
			const decksFromDb: Deck[] = await dbGetAllDecks();
			const cardsFromDb: Card[] = await dbGetAllCards();

			setDecks(decksFromDb);
			setCards(cardsFromDb);
		}

		loadData().then(() => console.debug('Database is connected'));
	}, []);

	const createDeck = async (deck: Deck) => {
		await dbCreateDeck(deck);
		setDecks((prev: Deck[]) => [...prev, deck]);
	};

	const deleteDeck = async (deckUid: string) => {
		// prettier-ignore
		await Promise.all([...cards.filter((card: Card) => card.deckUid === deckUid).map(async (card: Card) => deleteCard(card.uid))]);
		await dbDeleteDeck(deckUid);

		setCards((prev: Card[]) => prev.filter((card: Card) => card.deckUid !== deckUid));
		setDecks((prev: Deck[]) => prev.filter((deck: Deck) => deck.uid !== deckUid));
	};

	const createCard = async (card: Card) => {
		await dbCreateCard(card);
		setCards((prev: Card[]) => [...prev, card]);
	};

	const deleteCard = async (cardUid: string) => {
		await dbDeleteCard(cardUid);
		setCards((prev: Card[]) => prev.filter((card: Card) => card.uid !== cardUid));
	};

	const createScore = (score: Score) => {
		setScores((prev: Score[]) => [...prev, score]);
	};

	const deleteScore = (scoreUid: string) => {
		setScores((prev: Score[]) => prev.filter((score: Score) => score.uid !== scoreUid));
	};

	return (
		<StoreContext.Provider
			value={{
				decks,
				cards,
				scores,
				createDeck,
				deleteDeck,
				createCard,
				deleteCard,
				createScore,
				deleteScore
			}}
		>
			{children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	const context: StoreContextProps | undefined = useContext(StoreContext);

	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}

	return context;
};
