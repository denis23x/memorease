/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import Card from '../components/Card';
import { joyRideCallback } from '../services/Helper';
import { useNavigate } from 'react-router-dom';
import Joyride, { Step } from 'react-joyride';
import { JOYRIDE_CARDS } from '../keys/Joyride';
import Tooltip from '../components/Tooltip';
import Icon from '../components/Icon';
import CreateCard from '../components/modals/CreateCard';
import DeleteDeck from '../components/modals/DeleteDeck';

const steps: Step[] = [
	{
		disableBeacon: true,
		target: '#joyride-deck-delete',
		title: 'Delete',
		content: 'Remove this deck permanently from your library.'
	},
	{
		target: '#joyride-deck-study',
		title: 'Study',
		content: 'Begin a quiz session and see how well you know the content.'
	},
	{
		target: '#joyride-card-create',
		title: 'Create',
		content: 'Create your own card. Add a question and answer to your deck.'
	},
	{
		target: '#joyride-card',
		title: 'Card',
		content: 'Click to flip card. Reveal the answer and test your memory.'
	}
];

const Cards: React.FC = () => {
	const navigate = useNavigate();
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards } = useStore();
	const [deck, setDeck] = useState<DeckType | null>(null);
	const [deckCards, setDeckCards] = useState<CardType[]>([]);
	const [joyride, setJoyride] = useState<boolean>(false);

	useEffect(() => {
		if (deckUid) {
			if (decks.length && cards.length) {
				const deck: DeckType | undefined = decks.find((deck: DeckType) => deck.uid === deckUid);
				const deckCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);

				if (deck) {
					setDeck(deck);
					setDeckCards(deckCards.sort((a: CardType, b: CardType) => b.timestamp - a.timestamp));
					setJoyride(!localStorage.getItem(JOYRIDE_CARDS));
				} else {
					navigate('/404');
				}
			}
		}
	}, [deckUid, decks, cards, navigate]);

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<Joyride
				styles={{ options: { arrowColor: 'currentColor' } }}
				run={joyride}
				continuous
				showSkipButton
				steps={steps}
				tooltipComponent={Tooltip}
				callback={e => joyRideCallback(e, JOYRIDE_CARDS)}
			/>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<Link className={'btn btn-dark btn-icon size-12'} to={'/decks'} aria-label={'Decks'} title={'Decks'}>
							<Icon name={'arrow-left-short'} width={40} height={40}></Icon>
						</Link>
						<span className={'heading heading-teal'}>{deck?.name}</span>
					</div>
					<div className={'flex items-center gap-4'}>
						<DeleteDeck></DeleteDeck>
						{deckCards.length ? (
							<Link
								id={'joyride-deck-study'}
								className={'btn btn-dark btn-icon size-12'}
								to={`/study/${deck?.uid}`}
								aria-label={deck?.name}
								title={deck?.name}
							>
								<Icon name={'play-fill'} width={32} height={32}></Icon>
							</Link>
						) : (
							<></>
						)}
					</div>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4'}>
					<li className={'col-span-1'}>
						<CreateCard></CreateCard>
					</li>
					{deckCards.map((card: CardType, index: number) => (
						<li id={index === 0 ? 'joyride-card' : card.uid} className={'col-span-1'} key={card.uid}>
							<Card card={card}></Card>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Cards;
