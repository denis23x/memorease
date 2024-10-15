/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatMilliseconds, joyRideCallback } from '../services/Helper';
import type { Card as CardType } from '../models/Card';
import type { Deck as DeckType } from '../models/Deck';
import Joyride, { Step } from 'react-joyride';
import Tooltip from '../components/Tooltip';
import { JOYRIDE_STUDY } from '../keys/Joyride';
import Icon from '../components/Icon';

const steps: Step[] = [
	{
		disableBeacon: true,
		target: '#joyride-study-deck-edit',
		title: 'Deck',
		content: 'Customize your deck to fit your preferences.'
	},
	{
		target: '#joyride-study-card',
		title: 'Card',
		content: 'Click the card to reveal the hidden content.'
	}
];

const Study: React.FC = () => {
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards, createScore, deleteScore } = useStore();
	const navigate = useNavigate();
	const [studyDeck, setStudyDeck] = useState<DeckType | null>(null);
	const [studyCards, setStudyCards] = useState<CardType[]>([]);
	const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
	const [activeCardFlip, setActiveCardFlip] = useState<boolean>(false);
	const activeCard: CardType = studyCards[activeCardIndex];
	const defaultTime: number = 10000;
	const [timeLeft, setTimeLeft] = useState(defaultTime);
	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	const [joyride, setJoyride] = useState<boolean>(false);

	useEffect(() => {
		if (deckUid) {
			if (decks.length && cards.length) {
				const studyDeck: DeckType | null = decks.find((deck: DeckType) => deck.uid === deckUid) || null;
				const studyCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);

				if (studyDeck) {
					if (studyCards.length) {
						setStudyDeck(studyDeck);
						setStudyCards(studyCards.sort(() => Math.random() - 0.5));
						setActiveCardIndex(0);
						setActiveCardFlip(false);
						setJoyride(!localStorage.getItem(JOYRIDE_STUDY));
						deleteScore();
					} else {
						navigate(`/decks/${studyDeck.uid}`);
					}
				} else {
					navigate('/404');
				}
			}
		}
	}, [deckUid, decks, cards, navigate]);

	useEffect(() => {
		if (!activeCardFlip) {
			if (timeLeft > 0) {
				intervalRef.current = setInterval(() => {
					setTimeLeft(prev => prev - 10);
				}, 10);
			} else {
				handleFlip();
			}
		}

		return () => clearInterval(intervalRef.current!);
	}, [timeLeft]);

	const handleScore = (score: boolean) => {
		setActiveCardFlip(false);
		createScore({ ...studyCards[activeCardIndex], score });

		const remainingCards: CardType[] = studyCards.filter((_, index: number) => index !== activeCardIndex);

		if (remainingCards.length) {
			setStudyCards(remainingCards);
			setActiveCardIndex(0);
			setTimeLeft(defaultTime + timeLeft);
		} else {
			navigate('/score');
			setStudyCards([]);
		}
	};

	const handleFlip = () => {
		setActiveCardFlip(true);
		clearInterval(intervalRef.current!);
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<Joyride
				run={joyride}
				continuous
				showSkipButton
				steps={steps}
				tooltipComponent={Tooltip}
				callback={e => joyRideCallback(e, JOYRIDE_STUDY)}
			/>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<button
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Back'}
							title={'Back'}
							onClick={() => window.history.back()}
						>
							<Icon name={'arrow-left-short'} width={40} height={40}></Icon>
						</button>
						<span className={'heading heading-teal'}>{studyDeck?.name}</span>
					</div>
					<Link
						id={'joyride-study-deck-edit'}
						className={'btn btn-dark btn-icon size-12'}
						to={`/decks/${studyDeck?.uid}`}
						aria-label={'Update Deck'}
						title={'Update Deck'}
					>
						<Icon name={'gear-fill'} width={24} height={24}></Icon>
					</Link>
				</header>
				<div className={'flex items-start justify-center w-full'}>
					<ul id={'joyride-study-card'} className={'relative w-60 aspect-[2/3]'}>
						<li className={`study-card w-52 z-0 absolute top-4 -rotate-12 left-1/3 -translate-x-2/3`}>
							<div className={`study-card-inner bg-pattern-2-3-teal dark:bg-pattern-2-3-teal-2`}></div>
						</li>
						{studyCards.map((card: CardType, index: number) => (
							<li className={'relative'} key={card.uid}>
								<div className={`absolute z-10 size-full ${index === activeCardIndex ? 'visible' : 'invisible'}`}>
									<div className={`animate-flip ${activeCardFlip ? 'active' : ''}`}>
										<div className={'animate-flip-inner'}>
											<div className={'animate-flip-front'}>
												<div className={`study-card w-60 cursor-pointer`} onClick={handleFlip}>
													<div className={`study-card-inner bg-pattern-2-3-neutral dark:bg-pattern-2-3-slate`}>
														<button
															type={'button'}
															className={'btn btn-dark btn-icon size-12 pointer-events-none absolute left-8 top-8'}
															aria-label={'Hourglass'}
															title={'Hourglass'}
														>
															<Icon name={'hourglass-top'} width={24} height={24}></Icon>
														</button>
														<div className={'absolute right-8 top-8 size-12 flex items-center justify-center'}>
															<span className={`text-2xl font-bold text-sky-950/50 dark:text-neutral-300/50`}>
																{formatMilliseconds(timeLeft)}s
															</span>
														</div>
														<div className={`study-card-body`}>
															<span className={'paragraph text-xl font-bold dark:bg-slate-900'}>
																{activeCard.question}
															</span>
														</div>
													</div>
												</div>
											</div>
											<div className={'animate-flip-back'}>
												<div className={`study-card w-60`}>
													<div className={`study-card-inner bg-pattern-2-3-neutral dark:bg-pattern-2-3-slate`}>
														<button
															type={'button'}
															className={'btn btn-dark btn-icon size-12 pointer-events-none absolute left-8 top-8'}
															aria-label={'Hourglass'}
															title={'Hourglass'}
														>
															<Icon name={'hourglass-bottom'} width={24} height={24}></Icon>
														</button>
														<div className={'absolute right-8 top-8 size-12 flex items-center justify-center'}>
															<span className={`text-2xl font-bold text-sky-950 dark:text-neutral-300`}>
																{timeLeft > 0 ? '+' : ''}
																{formatMilliseconds(timeLeft)}s
															</span>
														</div>
														<div className={`study-card-body`}>
															<span className={'paragraph text-xl bg-neutral-50 dark:bg-slate-900'}>
																{activeCard.answer}
															</span>
														</div>
														<button
															type={'button'}
															className={'btn btn-red btn-icon size-12 absolute left-8 bottom-8'}
															aria-label={'Wrong'}
															title={'Wrong'}
															onClick={() => handleScore(false)}
														>
															<Icon name={'x'} width={40} height={40}></Icon>
														</button>
														<button
															type={'button'}
															className={'btn btn-teal btn-icon size-12 absolute right-8 bottom-8'}
															aria-label={'Correct'}
															title={'Correct'}
															onClick={() => handleScore(true)}
														>
															<Icon name={'check'} width={32} height={32}></Icon>
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</li>
						))}
						<li className={`study-card w-52 z-0 absolute top-4 rotate-12 left-2/3 -translate-x-1/3`}>
							<div className={`study-card-inner bg-pattern-2-3-red dark:bg-pattern-2-3-red-2`}></div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Study;
