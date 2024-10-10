/** @format */

import React from 'react';
import bgCard from '../assets/images/bg-card.png';
import type { Card as CardType } from '../models/Card';
import { useStore } from '../store/Store';

interface CardProps {
	card: CardType;
}

const Card: React.FC<CardProps> = ({ card }: CardProps) => {
	const { deleteCard } = useStore();

	const handleRevealCard = () => {};

	const handleDeleteCard = () => {
		deleteCard(card.uid).then(() => console.debug('Card deleted'));
	};

	return (
		<div
			className={`size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl transition-transform hover:scale-110 p-1 group`}
		>
			<div
				className={`flex items-center justify-center size-full relative bg-cover border border-neutral-200 rounded-lg overflow-hidden`}
				style={{ backgroundImage: `url(${bgCard})` }}
			>
				<div
					className={`absolute left-1/2 -translate-x-1/2 transition-all bg-sky-950 text-neutral-50 rounded-b-xl group-hover:top-0 -top-12`}
				>
					<button
						className={'size-12 flex items-center justify-center p-2'}
						type={'button'}
						onClick={handleRevealCard}
						aria-label={'Reveal Card'}
						title={'Reveal Card'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5m14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5" />
						</svg>
					</button>
				</div>
				<div className={'text-center text-ellipsis overflow-hidden'}>
					<p className={'font-bold bg-neutral-50 text-sky-950 p-1'}>{card.question}</p>
				</div>
				<div
					className={`absolute left-1/2 -translate-x-1/2 transition-all bg-sky-950 text-neutral-50 rounded-t-xl group-hover:bottom-0 -bottom-12`}
				>
					<button
						className={'size-12 flex items-center justify-center p-2'}
						type={'button'}
						onClick={handleDeleteCard}
						aria-label={'Delete Card'}
						title={'Delete Card'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
						</svg>
					</button>
				</div>
			</div>
		</div>
	);
};

export default Card;
