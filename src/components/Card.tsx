/** @format */

import React from 'react';
import bgCard from '../assets/images/bg-card.png';
import type { Card as CardType } from '../models/Card';

interface CardProps {
	card: CardType;
	handleUpdateCard: (cardUid: string) => void;
	handleDeleteCard: (cardUid: string) => void;
}

const Card: React.FC<CardProps> = (props: CardProps) => {
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
						onClick={() => props.handleUpdateCard(props.card.uid)}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
						</svg>
					</button>
				</div>
				<div className={'text-center text-ellipsis overflow-hidden'}>
					<span className={'font-bold bg-neutral-50 text-sky-950 p-1'}>{props.card.question}</span>
				</div>
				<div
					className={`absolute left-1/2 -translate-x-1/2 transition-all bg-sky-950 text-neutral-50 rounded-t-xl group-hover:bottom-0 -bottom-12`}
				>
					<button
						className={'size-12 flex items-center justify-center p-2'}
						type={'button'}
						onClick={() => props.handleDeleteCard(props.card.uid)}
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
