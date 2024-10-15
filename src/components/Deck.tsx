/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import { useStore } from '../store/Store';

interface DeckProps {
	deck: DeckType;
}

const Deck: React.FC<DeckProps> = ({ deck }: DeckProps) => {
	const { cards } = useStore();
	const [deckCards, setDeckCards] = useState<CardType[]>([]);

	useEffect(() => {
		const deckCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deck.uid);

		setDeckCards(deckCards);
	}, [cards, deck]);

	return (
		<div className={'deck'}>
			<Link to={deckCards.length ? `/study/${deck.uid}` : deck.uid} aria-label={deck.name} title={deck.name}>
				<div className={'deck-inner bg-pattern-2-3-teal dark:bg-pattern-2-3-teal-2'}>
					<p className={'deck-body'}>
						<span className={'paragraph text-lg font-bold bg-neutral-50 dark:bg-slate-900'}>
							{deck.name} <span className={'text-sm opacity-50'}>({deckCards.length})</span>
						</span>
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Deck;
