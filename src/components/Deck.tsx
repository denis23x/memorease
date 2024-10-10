/** @format */

import React, { useEffect, useState } from 'react';
import bgDeck from '../assets/images/bg-deck.png';
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
			className={`size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl shadow-deck transition-transform hover:scale-110 hover:-translate-y-3 p-1 group`}
		>
			<div
				className={`flex items-center justify-center size-full relative bg-cover border border-neutral-200 rounded-lg overflow-hidden`}
				style={{ backgroundImage: `url(${bgDeck})` }}
			>
				<div
					className={`absolute left-1/2 -translate-x-1/2 transition-all bg-sky-950 text-neutral-50 rounded-b-xl group-hover:top-0 -top-12`}
				>
					<Link className={'size-12 flex items-center justify-center p-2'} to={deck.uid}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
						</svg>
					</Link>
				</div>
				<Link className={'text-center text-ellipsis overflow-hidden'} to={`/study/${deck.uid}`}>
					<p className={'bg-neutral-50 font-bold p-1'}>
						{deck.name} <span className={'bg-font-regular text-sky-950/50'}>({deckCards.length})</span>
					</p>
				</Link>
				<div
					className={`absolute left-1/2 -translate-x-1/2 transition-all bg-sky-950 text-neutral-50 rounded-t-xl group-hover:bottom-0 -bottom-12`}
				>
					<button
						className={'size-12 flex items-center justify-center p-2'}
						type={'button'}
						aria-label={'Scores'}
						title={'Scores'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Deck;
