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
		<div
			className={`size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 rounded-xl shadow-deck transition-transform hover:mouse:scale-110 hover:mouse:-translate-y-3 p-1`}
		>
			<Link to={`/study/${deck.uid}`}>
				<div
					className={`flex items-center justify-center size-full relative bg-cover border border-neutral-200 rounded-lg`}
					style={{ backgroundImage: `url(${bgTeal})` }}
				>
					<div className={'text-center text-ellipsis overflow-hidden'}>
						<p className={'bg-neutral-50 font-bold p-1'}>
							{deck.name} <span className={'bg-font-regular text-sky-950/50'}>({deckCards.length})</span>
						</p>
					</div>
				</div>
			</Link>
		</div>
	);
};

export default Deck;
