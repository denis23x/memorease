/** @format */

import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import background from '../assets/images/background-2.png';

type Card = {
	uid: string;
	question: string;
	answer: string;
};

type ScoreRecord = {
	question: string;
	score: 'good' | 'bad';
};

const cardsData: Card[] = [
	{
		uid: '1',
		question: 'What is the capital of France?',
		answer: 'Paris'
	},
	{
		uid: '2',
		question: 'What is 2 + 2?',
		answer: '4'
	},
	{
		uid: '3',
		question: 'What is the largest planet?',
		answer: 'Jupiter'
	}
];

const Example: React.FC = () => {
	const [cards, setCards] = useState<Card[]>([]);
	const [activeCardIndex, setActiveCardIndex] = useState(0);
	const [showAnswer, setShowAnswer] = useState(false);
	const [scoreRecords, setScoreRecords] = useState<ScoreRecord[]>([
		// {
		// 	question: 'What is the capital of France?',
		// 	score: 'good'
		// },
		// {
		// 	question: 'What is 2 + 2?',
		// 	score: 'good'
		// },
		// {
		// 	question: 'What is the largest planet?',
		// 	score: 'good'
		// }
	]);

	useEffect(() => {
		// Shuffle cards initially
		shuffleCards();
	}, []);

	const shuffleCards = () => {
		const shuffledCards = [...cardsData].sort(() => Math.random() - 0.5);
		setCards(shuffledCards);
		setActiveCardIndex(0);
		setShowAnswer(false);
		setScoreRecords([]);
	};

	const handleReveal = () => {
		setShowAnswer(true);
	};

	const handleScore = (score: 'good' | 'bad') => {
		const currentCard = cards[activeCardIndex];
		setShowAnswer(false);

		// Update the score records
		setScoreRecords(prevRecords => [...prevRecords, { question: currentCard.question, score }]);

		// Remove the current card and move to the next
		const remainingCards = cards.filter((_, index) => index !== activeCardIndex);
		if (remainingCards.length > 0) {
			setCards(remainingCards);
			setActiveCardIndex(0);
		} else {
			//! Callback
			setCards([]); // End the round
		}
	};

	const handleReset = () => {
		shuffleCards(); // Reset the game fully
	};

	if (cards.length === 0 && scoreRecords.length > 0) {
		return (
			<section className="p-4">
				<Confetti recycle={false} />
				<div className="flex flex-col gap-8 items-center justify-center max-w-screen-lg">
					<h1 className="text-2xl font-bold bg-sky-950 text-neutral-50 rounded-full text-nowrap py-2 p-4">Score</h1>
					<table className="table-auto outline outline-neutral-200 rounded-2xl overflow-hidden">
						<thead className="bg-neutral-200">
							<tr>
								<th className="text-left text-base text-sky-950 p-4">Question</th>
								<th className="text-left text-base text-sky-950 p-4">Answer</th>
							</tr>
						</thead>
						<tbody className="bg-neutral-50">
							{scoreRecords.map((record, index) => (
								<tr key={index}>
									<td className="text-left text-base text-sky-950 py-2 px-4">{record.question}</td>
									<td className="text-left text-base text-sky-950 py-2 px-4">
										<button
											type="button"
											className={`btn ${record.score === 'bad' ? 'btn-red' : 'btn-teal'}`}
											aria-label="Score"
										>
											{record.score}
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

	if (cards.length === 0) {
		return (
			<div>
				<p>No more cards. Well done!</p>
				<button type="button" className="btn btn-red" aria-label="Reset Game" onClick={handleReset}>
					Reset
				</button>
			</div>
		);
	}

	const activeCard = cards[activeCardIndex];

	return (
		<section className="p-4">
			<div className="flex flex-col gap-12 items-center justify-center max-w-screen-lg">
				<h1 className="text-3xl font-bold">Example Quiz</h1>
				<ul className="flex items-center justify-center relative aspect-[2/3] w-60">
					<li className="flex card"></li>
					{cards.map((card: Record<string, string>, index: number) => (
						<li className={`flex card ${index === activeCardIndex ? 'visible' : 'invisible'}`} key={card.uid}>
							<div
								className={`flex flex-col justify-center items-center h-full w-full border border-neutral-200 rounded-lg p-4`}
								style={{ backgroundImage: `url(${background})` }}
							>
								{showAnswer ? (
									<span className="text-lg text-sky-950">{activeCard.answer}</span>
								) : (
									<span className="text-lg text-sky-950">{activeCard.question}</span>
								)}
							</div>
						</li>
					))}
					<li className="flex card"></li>
				</ul>
				{!showAnswer ? (
					<button type="button" className="btn btn-dark" aria-label="Reveal" onClick={handleReveal}>
						Reveal
					</button>
				) : (
					<div className="flex items-center justify-center gap-4">
						<button type="button" className="btn btn-teal" aria-label="Good" onClick={() => handleScore('good')}>
							Good
						</button>
						<button type="button" className="btn btn-red" aria-label="Bad" onClick={() => handleScore('bad')}>
							Bad
						</button>
					</div>
				)}
			</div>
		</section>
	);
};

export default Example;
