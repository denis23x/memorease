/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/Store';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { formatMilliseconds } from '../services/Helper';
import type { Card as CardType } from '../models/Card';
import type { Deck as DeckType } from '../models/Deck';
import bgRed from '../assets/images/bg-red.png';
import bgTeal from '../assets/images/bg-teal.png';
import bgNeutral from '../assets/images/bg-neutral.png';

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
		if (timeLeft > 0) {
			intervalRef.current = setInterval(() => {
				setTimeLeft(prev => prev - 1);
			}, 1);
		} else {
			handleFlip();
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
			<div className={'flex flex-col items-start justify-start gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Back'}
							title={'Back'}
							onClick={() => window.history.back()}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</button>
						<span
							className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							{studyDeck?.name}
						</span>
					</div>
					<div className={'flex items-center justify-start gap-4'}>
						<Link
							className={'me-btn me-btn-dark p-3'}
							to={`/decks/${studyDeck?.uid}`}
							aria-label={'Update Deck'}
							title={'Update Deck'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
							</svg>
						</Link>
					</div>
				</header>
				<div className={'flex items-start justify-center w-full'}>
					<ul className={'relative w-60 aspect-[2/3]'}>
						<li className={`study-card w-52 z-0 absolute top-4 -rotate-12 left-1/3 -translate-x-2/3`}>
							<div className={`study-card-inner`} style={{ backgroundImage: `url(${bgTeal})` }}></div>
						</li>
						{studyCards.map((card: CardType, index: number) => (
							<li className={'relative'} key={card.uid}>
								<div className={`absolute z-10 size-full ${index === activeCardIndex ? 'visible' : 'invisible'}`}>
									<div className={`animate-flip ${activeCardFlip ? 'active' : ''}`}>
										<div className={'animate-flip-inner'}>
											<div className={'animate-flip-front'}>
												<div className={`study-card w-60 cursor-pointer`} onClick={handleFlip}>
													<div className={`study-card-inner`} style={{ backgroundImage: `url(${bgNeutral})` }}>
														<button
															type={'button'}
															className={'me-btn me-btn-dark p-3 absolute left-8 top-8'}
															aria-label={'Hourglass'}
															title={'Hourglass'}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																fill="currentColor"
																viewBox="0 0 16 16"
															>
																<path d="M2 14.5a.5.5 0 0 0 .5.5h11a.5.5 0 1 0 0-1h-1v-1a4.5 4.5 0 0 0-2.557-4.06c-.29-.139-.443-.377-.443-.59v-.7c0-.213.154-.451.443-.59A4.5 4.5 0 0 0 12.5 3V2h1a.5.5 0 0 0 0-1h-11a.5.5 0 0 0 0 1h1v1a4.5 4.5 0 0 0 2.557 4.06c.29.139.443.377.443.59v.7c0 .213-.154.451-.443.59A4.5 4.5 0 0 0 3.5 13v1h-1a.5.5 0 0 0-.5.5m2.5-.5v-1a3.5 3.5 0 0 1 1.989-3.158c.533-.256 1.011-.79 1.011-1.491v-.702s.18.101.5.101.5-.1.5-.1v.7c0 .701.478 1.236 1.011 1.492A3.5 3.5 0 0 1 11.5 13v1z" />
															</svg>
														</button>
														<span
															className={`text-2xl font-bold size-12 flex items-center justify-center opacity-25 absolute right-8 top-8`}
														>
															{formatMilliseconds(timeLeft)}s
														</span>
														<div className={`study-card-body`}>
															<span className={'text-xl bg-neutral-50 text-sky-950'}>{activeCard.question}</span>
														</div>
													</div>
												</div>
											</div>
											<div className={'animate-flip-back'}>
												<div className={`study-card w-60`}>
													<div className={`study-card-inner`} style={{ backgroundImage: `url(${bgNeutral})` }}>
														<button
															type={'button'}
															className={'me-btn me-btn-dark p-3 absolute left-8 top-8'}
															aria-label={'Hourglass'}
															title={'Hourglass'}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="24"
																height="24"
																fill="currentColor"
																viewBox="0 0 16 16"
															>
																<path d="M2 1.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-1v1a4.5 4.5 0 0 1-2.557 4.06c-.29.139-.443.377-.443.59v.7c0 .213.154.451.443.59A4.5 4.5 0 0 1 12.5 13v1h1a.5.5 0 0 1 0 1h-11a.5.5 0 1 1 0-1h1v-1a4.5 4.5 0 0 1 2.557-4.06c.29-.139.443-.377.443-.59v-.7c0-.213-.154-.451-.443-.59A4.5 4.5 0 0 1 3.5 3V2h-1a.5.5 0 0 1-.5-.5m2.5.5v1a3.5 3.5 0 0 0 1.989 3.158c.533.256 1.011.791 1.011 1.491v.702s.18.149.5.149.5-.15.5-.15v-.7c0-.701.478-1.236 1.011-1.492A3.5 3.5 0 0 0 11.5 3V2z" />
															</svg>
														</button>
														<span
															className={`text-2xl font-bold size-12 flex items-center justify-center absolute right-8 top-8`}
														>
															{timeLeft > 0 ? '+' : ''}
															{formatMilliseconds(timeLeft)}s
														</span>
														<div className={`study-card-body`}>
															<span className={'text-xl bg-neutral-50 text-sky-950'}>{activeCard.answer}</span>
														</div>
														<button
															type={'button'}
															className={'me-btn me-btn-red p-1 absolute left-8 bottom-8'}
															aria-label={'Wrong'}
															title={'Wrong'}
															onClick={() => handleScore(false)}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="40"
																height="40"
																fill="currentColor"
																viewBox="0 0 16 16"
															>
																<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
															</svg>
														</button>
														<button
															type={'button'}
															className={'me-btn me-btn-teal p-2 absolute right-8 bottom-8'}
															aria-label={'Correct'}
															title={'Correct'}
															onClick={() => handleScore(true)}
														>
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width="32"
																height="32"
																fill="currentColor"
																className="bi bi-check-lg"
																viewBox="0 0 16 16"
															>
																<path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
															</svg>
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
							<div className={`study-card-inner`} style={{ backgroundImage: `url(${bgRed})` }}></div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default Study;
