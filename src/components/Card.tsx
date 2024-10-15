/** @format */

import React, { useState } from 'react';
import type { Card as CardType } from '../models/Card';
import { useStore } from '../store/Store';
import { toast } from 'react-toastify';
import Icon from './Icon';

interface CardProps {
	card: CardType;
}

const Card: React.FC<CardProps> = ({ card }: CardProps) => {
	const { deleteCard } = useStore();
	const [flip, setFlip] = useState<boolean>(false);

	const handleDeleteCard = () => {
		deleteCard(card.uid).then(() => toast.info('Card has been deleted'));
	};

	return (
		<div className={`animate-flip aspect-[2/3] ${flip ? 'active' : ''}`} onClick={() => setFlip(!flip)}>
			<div className={`animate-flip-inner`}>
				<div className={`animate-flip-front`}>
					<div className={'card cursor-pointer'}>
						<div className={'card-inner bg-pattern-2-3-red'}>
							<p className={'card-body'}>
								<span className={'text-base font-bold bg-neutral-50 text-sky-950'}>{card.question}</span>
							</p>
						</div>
					</div>
				</div>
				<div className={`animate-flip-back`}>
					<div className={'card'}>
						<div className={'card-inner bg-pattern-2-3-neutral'}>
							<p className={'card-body'}>
								<span className={'font-normal bg-neutral-50 text-sky-950'}>{card.answer}</span>
							</p>
							<button
								className={`btn btn-dark btn-icon size-12 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all opacity-10 hover:opacity-100`}
								type={'button'}
								aria-label={'Delete Card'}
								title={'Delete Card'}
								onClick={handleDeleteCard}
							>
								<Icon name={'trash-fill'} width={24} height={24}></Icon>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
