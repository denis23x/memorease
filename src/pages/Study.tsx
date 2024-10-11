/** @format */

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useStore } from '../store/Store';
import { Link, useParams } from 'react-router-dom';
import type { Card as CardType } from '../models/Card';
import type { Deck as DeckType } from '../models/Deck';
import type { Score } from '../models/Score';
import { nanoid } from '../services/Helper';
import bgRed from '../assets/images/bg-red.png';
import bgTeal from '../assets/images/bg-teal.png';
import bgNeutral from '../assets/images/bg-neutral.png';

const Study: React.FC = () => {
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards } = useStore();

	const [studyDeck, setStudyDeck] = useState<DeckType | null>(null);
	const [studyCards, setStudyCards] = useState<CardType[]>([]);

	const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
	const [showAnswer, setShowAnswer] = useState<boolean>(false);
	const [scoreRecords, setScoreRecords] = useState<Score[]>([]);

	useEffect(() => {
		if (deckUid) {
			const studyDeck: DeckType | null = decks.find((deck: DeckType) => deck.uid === deckUid) || null;
			setStudyDeck(studyDeck);

			const studyCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);
			shuffleCards(studyCards);
		}
	}, [deckUid, decks, cards]);

	const shuffleCards = (studyCards: CardType[]) => {
		const shuffledCards = [...studyCards].sort(() => Math.random() - 0.5);

		setStudyCards(shuffledCards);

		setActiveCardIndex(0);
		setShowAnswer(false);
		setScoreRecords([]);
	};

	const handleReveal = () => {
		setShowAnswer(true);
	};

	const handleScore = (answer: string) => {
		const currentCard = studyCards[activeCardIndex];
		setShowAnswer(false);

		// Update the score records
		setScoreRecords((prevRecords: Score[]) => [
			...prevRecords,
			{
				uid: nanoid(),
				question: currentCard.question,
				answer
			}
		]);

		// Remove the current card and move to the next
		const remainingCards = studyCards.filter((_, index) => index !== activeCardIndex);
		if (remainingCards.length > 0) {
			setStudyCards(remainingCards);
			setActiveCardIndex(0);
		} else {
			setStudyCards([]); // End the round
		}
	};

	const handleReset = () => {
		// shuffleCards(); // Reset the game fully
	};

	const handleBack = () => {
		window.history.back();
	};

	if (studyCards.length === 0 && scoreRecords.length > 0) {
		return (
			<section className="p-4">
				<Confetti recycle={false} />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-lg">
					<span className="text-2xl font-bold bg-sky-950 text-neutral-50 rounded-full text-nowrap py-2 p-4">Score</span>
					<table className="table-auto outline outline-neutral-200 rounded-2xl overflow-hidden">
						<thead className="bg-neutral-100">
							<tr>
								<th className="text-left text-base text-sky-950 p-4">Question</th>
								<th className="text-left text-base text-sky-950 p-4">Answer</th>
							</tr>
						</thead>
						<tbody className="bg-neutral-50">
							{scoreRecords.map((score: Score, index) => (
								<tr key={index}>
									<td className="text-left text-base text-sky-950 py-2 px-4">{score.question}</td>
									<td className="text-left text-base text-sky-950 py-2 px-4">
										<button
											type="button"
											className={`btn ${score.answer === 'bad' ? 'btn-red' : 'btn-teal'}`}
											aria-label="Score"
										>
											{score.answer}
										</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
					<button type="button" className="btn btn-red" aria-label="Reset Game" onClick={handleReset}>
						Reset
					</button>
				</div>
			</section>
		);
	}

	if (studyCards.length === 0) {
		return (
			<section className={'overflow-hidden p-4'}>
				<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-8'}>
					<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
						<div className={'flex items-center justify-start gap-4 max-w-full'}>
							<button
								className={'me-btn me-btn-dark p-1'}
								type={'button'}
								aria-label={'Back'}
								title={'Back'}
								onClick={handleBack}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
									<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
								</svg>
							</button>
							<span
								className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap truncate py-2 px-4`}
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
					<p className={'text-lg text-sky-950'}>
						This deck is currently empty. Please add some cards to start studying
					</p>
				</div>
			</section>
		);
	}

	const activeCard = studyCards[activeCardIndex];

	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Back'}
							title={'Back'}
							onClick={handleBack}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</button>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap truncate py-2 px-4'}>
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
				<ul className="flex items-center justify-center relative aspect-[2/3] w-60">
					<li className="flex card bg-cover" style={{ backgroundImage: `url(${bgRed})` }}></li>
					{studyCards.map((card: CardType, index: number) => (
						<li
							className={`flex card bg-cover ${index === activeCardIndex ? 'visible' : 'invisible'}`}
							key={card.uid}
							style={{ backgroundImage: `url(${bgNeutral})` }}
						>
							<div
								className={`flex flex-col justify-center items-center h-full w-full border border-neutral-200 rounded-lg p-4`}
								// style={{ backgroundImage: `url(${background})` }}
							>
								{showAnswer ? (
									<span className="text-lg text-sky-950">{activeCard.answer}</span>
								) : (
									<span className="text-lg text-sky-950">{activeCard.question}</span>
								)}
							</div>
						</li>
					))}
					<li className="flex card bg-cover" style={{ backgroundImage: `url(${bgTeal})` }}></li>
				</ul>
				{!showAnswer ? (
					<button type="button" className="me-btn me-btn-dark" aria-label="Reveal" onClick={handleReveal}>
						Reveal
					</button>
				) : (
					<div className="flex items-center justify-center gap-4">
						<button type="button" className="me-btn me-btn-dark" aria-label="Good" onClick={() => handleScore('good')}>
							Good
						</button>
						<button type="button" className="me-btn me-btn-dark" aria-label="Bad" onClick={() => handleScore('bad')}>
							Bad
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Study;
