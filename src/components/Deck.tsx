/** @format */

import React, { useEffect, useState } from 'react';
import bgTeal from '../assets/images/bg-teal.png';
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
		<div className={`deck`}>
			<Link to={`/study/${deck.uid}`}>
				<div className={`deck-inner`} style={{ backgroundImage: `url(${bgTeal})` }}>
					<p className={'deck-body'}>
						<span className={'text-base font-bold bg-neutral-50 text-sky-950'}>
							{deck.name} <span className={'text-sm text-sky-950/50'}>({deckCards.length})</span>
						</span>
					</p>
				</div>
			</Link>
		</div>
	);
};

export default Deck;
