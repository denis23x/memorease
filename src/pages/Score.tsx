/** @format */

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import { useStore } from '../store/Store';
import { Score as ScoreType } from '../models/Score';
import Icon from '../components/Icon';

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
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<button
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Repeat'}
							title={'Repeat'}
							onClick={() => window.history.back()}
						>
							<Icon name={'arrow-repeat'} width={26} height={26}></Icon>
						</button>
						<span className={'heading heading-teal'}>Score</span>
						{correct !== 0 ? (
							<span className={`heading ${success ? 'heading-teal' : 'heading-red'}`}>
								{correct}/{scores.length}
							</span>
						) : (
							<></>
						)}
					</div>
				</header>
				<div className={'flex'}>
					{success ? (
						<>
							<div className={'fixed inset-0 pointer-events-none'}>
								<Confetti recycle={false} />
							</div>
							<p className={'paragraph'}>
								Great job! You're doing fantastic. Keep up the good work and continue learning. Your knowledge is
								impressive!
							</p>
						</>
					) : (
						<p className={'paragraph'}>
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
													className={'btn btn-teal btn-icon size-12 pointer-events-none scale-75'}
													aria-label={'Correct'}
													title={'Correct'}
												>
													<Icon name={'check'} width={32} height={32}></Icon>
												</button>
											) : (
												<button
													type={'button'}
													className={'btn btn-red btn-icon size-12 pointer-events-none scale-75'}
													aria-label={'Wrong'}
													title={'Wrong'}
												>
													<Icon name={'x'} width={40} height={40}></Icon>
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
