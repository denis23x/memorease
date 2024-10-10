/** @format */

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { useStore } from '../store/Store';
import { useParams } from 'react-router-dom';
import type { Card as CardType } from '../models/Card';
import type { Deck as DeckType } from '../models/Deck';
import type { Score } from '../models/Score';
import { nanoid } from '../services/Helper';
import bgDeck from '../assets/images/bg-deck.png';
import bgCard from '../assets/images/bg-card.png';
import bgCardStudy from '../assets/images/bg-card-study.png';
import Back from '../components/Back';

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
	}, [deckUid, cards]);

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

	if (studyCards.length === 0 && scoreRecords.length > 0) {
		return (
			<section className="p-4">
				<Confetti recycle={false} />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-lg">
					<span className="text-2xl font-bold bg-sky-950 text-neutral-50 rounded-full text-nowrap py-2 p-4">Score</span>
					<table className="table-auto outline outline-neutral-200 rounded-2xl overflow-hidden">
						<thead className="bg-neutral-200">
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
			<div>
				<p>No more cards. Well done!</p>
				<button type="button" className="btn btn-red" aria-label="Reset Game" onClick={handleReset}>
					Reset
				</button>
			</div>
		);
	}

	const activeCard = studyCards[activeCardIndex];

	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Back></Back>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap py-2 px-4'}>
							{studyDeck?.name}
						</span>
					</div>
				</header>
				<ul className="flex items-center justify-center relative aspect-[2/3] w-60">
					<li className="flex card bg-cover" style={{ backgroundImage: `url(${bgDeck})` }}></li>
					{studyCards.map((card: CardType, index: number) => (
						<li
							className={`flex card bg-cover ${index === activeCardIndex ? 'visible' : 'invisible'}`}
							key={card.uid}
							style={{ backgroundImage: `url(${bgCardStudy})` }}
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
					<li className="flex card bg-cover" style={{ backgroundImage: `url(${bgCard})` }}></li>
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
