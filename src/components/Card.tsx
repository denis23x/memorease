/** @format */

import React, { useState } from 'react';
import bgRed from '../assets/images/bg-red.png';
import bgNeutral from '../assets/images/bg-neutral.png';
import type { Card as CardType } from '../models/Card';
import { useStore } from '../store/Store';
import { toast } from 'react-toastify';

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
		<div className={`animate-flip ${flip ? 'active' : ''}`} onClick={() => setFlip(!flip)}>
			<div className={`animate-flip-inner`}>
				<div className={`animate-flip-front`}>
					<div className={'card'}>
						<div className={'card-inner'} style={{ backgroundImage: `url(${bgRed})` }}>
							<p className={'card-body'}>
								<span className={'text-base font-bold bg-neutral-50 text-sky-950'}>{card.question}</span>
							</p>
						</div>
					</div>
				</div>
				<div className={`animate-flip-back`}>
					<div className={'card'}>
						<div className={'card-inner'} style={{ backgroundImage: `url(${bgNeutral})` }}>
							<p className={'card-body'}>
								<span className={'font-normal bg-neutral-50 text-sky-950'}>{card.answer}</span>
							</p>
							<div className={'card-delete'}>
								<button
									className={'size-12 flex items-center justify-center p-2'}
									type={'button'}
									onClick={handleDeleteCard}
									aria-label={'Delete Card'}
									title={'Delete Card'}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Card;
