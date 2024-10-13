/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useStore } from '../store/Store';
import { Score as ScoreType } from '../models/Score';

const Score: React.FC = () => {
	const { scores } = useStore();
	const navigate = useNavigate();
	const [correct, setCorrect] = useState<number>(0);
	const [success, setSuccess] = useState<boolean>(false);

	useEffect(() => {
		if (!scores.length) {
			navigate('/decks');
		}

		handleScore();
	}, [scores, navigate]);

	const handleScore = () => {
		let trueCount: number = 0;
		let falseCount: number = 0;

		for (const score of scores) {
			if (score.score) {
				trueCount++;
			} else {
				falseCount++;
			}
		}

		setCorrect(trueCount);
		setSuccess(trueCount > falseCount && trueCount - falseCount > Math.abs(Math.round(scores.length / 3)));
	};

	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col items-start justify-start gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<button
							className={'me-btn me-btn-dark p-2.5'}
							type={'button'}
							aria-label={'Repeat'}
							title={'Repeat'}
							onClick={() => window.history.back()}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" viewBox="0 0 16 16">
								<path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
								<path d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
							</svg>
						</button>
						<span
							className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							Score
						</span>
						{correct !== 0 ? (
							<span
								className={`text-2xl font-bold rounded-full whitespace-nowrap py-2 px-4 ${success ? 'bg-teal-200 text-sky-950' : 'bg-red-400 text-neutral-50'}`}
							>
								{correct}/{scores.length}
							</span>
						) : (
							<></>
						)}
					</div>
				</header>
				<div className={'flex'}>
					{success ? (
						<div className={'block'}>
							<div className={'fixed inset-0 pointer-events-none'}>
								<Confetti recycle={false} />
							</div>
							<p className={'text-lg text-sky-950'}>
								Great job! You're doing fantastic. Keep up the good work and continue learning. Your knowledge is
								impressive!
							</p>
						</div>
					) : (
						<p className={'text-lg text-sky-950'}>
							Don't worry, learning takes time! Keep practicing and reviewing your answers. The more you learn, the
							easier it will get. Let's aim for more correct answers next time!
						</p>
					)}
				</div>
				<div className={'flex items-start justify-start w-full'}>
					<table
						className={`table-auto border-collapse outline outline-1 outline-neutral-200 rounded-xl overflow-hidden w-full`}
					>
						<tbody className={'bg-neutral-50'}>
							{scores.map((score: ScoreType, index: number) => (
								<tr className={'last:border-0 border-b border-neutral-200 odd:bg-neutral-100'} key={index}>
									<td className={'text-left py-2 px-4'}>
										<div className={'flex flex-col gap-1'}>
											<span className={'text-base text-sky-950'}>
												<span className={'font-bold'}>Q</span>: {score.question}
											</span>
											<span className={'text-base text-sky-950'}>
												<span className={'font-bold'}>A</span>: {score.answer}
											</span>
										</div>
									</td>
									<td className={'align-middle py-2 px-4'}>
										<div className={'flex items-center justify-end'}>
											{score.score ? (
												<button
													type={'button'}
													className={'me-btn me-btn-teal pointer-events-none p-2 scale-75'}
													aria-label={'Correct'}
													title={'Correct'}
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
											) : (
												<button
													type={'button'}
													className={'me-btn me-btn-red pointer-events-none p-1 scale-75'}
													aria-label={'Wrong'}
													title={'Wrong'}
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
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</section>
	);
};

export default Score;
