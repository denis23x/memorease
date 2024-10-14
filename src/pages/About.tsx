/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JOYRIDE_CARDS, JOYRIDE_DECKS, JOYRIDE_STUDY } from '../keys/Joyride';
import { Deck } from '../models/Deck';
import { useStore } from '../store/Store';
import { Card } from '../models/Card';

const About: React.FC = () => {
	const navigate = useNavigate();
	const { decks, cards } = useStore();

	const handleGuidTour = (tour: string) => {
		const card: Card = cards[0];
		const deck: Deck | undefined = decks.find((deck: Deck) => deck.uid === card.deckUid);

		if (deck) {
			const guideTourMap: Record<string, any> = {
				decks: {
					key: JOYRIDE_DECKS,
					path: '/decks'
				},
				cards: {
					key: JOYRIDE_CARDS,
					path: `/decks/${deck.uid}`
				},
				study: {
					key: JOYRIDE_STUDY,
					path: `/study/${deck.uid}`
				}
			};
			const guideTour: Record<string, string> = guideTourMap[tour];

			localStorage.removeItem(guideTour.key);
			navigate(guideTour.path);
		}
	};

	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col items-start justify-start gap-4'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-3'} to={'/'} aria-label={'Home'} title={'Home'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
							</svg>
						</Link>
						<span
							className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							About
						</span>
					</div>
				</header>
				<div className={'flex flex-col items-start justify-start gap-4'}>
					{/* prettier-ignore */}
					<p className={'text-lg text-sky-950'}>
						While searching for a tool to train my memory, I discovered a lack of user-friendly, free options.
						Frustrated by the limitations of existing tools, I decided to take matters into my own hands and create
						<strong className={'font-bold'}> Memorease </strong> (also <strong
						className={'font-bold'}>MemorEase</strong>).
					</p>
					<p className={'text-lg text-sky-950'}>
						This app is one of my pet projects and client-side only app. It's designed to be free, simple, effective,
						and accessible to everyone. Whether you're a student, professional, or simply looking to sharpen your mind,
						I hope <strong className={'font-bold'}>Memorease</strong> becomes a valuable asset on your journey.
					</p>
					<span
						className={`text-2xl font-bold bg-red-400 text-neutral-50 rounded-full whitespace-nowrap truncate py-2 px-4`}
					>
						How to Study
					</span>
					<ul className={'flex flex-col items-start justify-start gap-4 list-disc text-lg text-sky-950'}>
						<li className={'list-inside flex items-center gap-4'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
							</svg>
							<span className={'bg-neutral-50'}>
								<strong className={'font-bold'}>Choose Your Deck:</strong> Pick a deck that suits your interests or
								difficulty level.
							</span>
						</li>
						<li className={'list-inside flex items-center gap-4'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
							</svg>
							<span className={'bg-neutral-50'}>
								<strong className={'font-bold'}>Start the Game</strong>: Once you've selected a deck, the game begins.
							</span>
						</li>
						<li className={'list-inside flex items-center gap-4'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
							</svg>
							<span className={'bg-neutral-50'}>
								<strong className={'font-bold'}>Answer the Question</strong>: A card with a question will appear in the
								center of the screen. Think carefully about your answer.
							</span>
						</li>
						<li className={'list-inside flex items-center gap-4'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
							</svg>
							<span className={'bg-neutral-50'}>
								<strong className={'font-bold'}>Flip the Card</strong>: When you're ready, click on the card to reveal
								the correct answer.
							</span>
						</li>
						<li className={'list-inside flex items-center gap-4'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1" />
							</svg>
							<span className={'bg-neutral-50'}>
								<strong className={'font-bold'}>Check Your Answer</strong>: Decide if your answer was right or wrong,
								and click the corresponding button to move on to the next question.
							</span>
						</li>
					</ul>
					<span className={'text-lg text-sky-950 font-bold'}>
						That's it! Test your knowledge, have fun, and see how well you do.
					</span>
					<p className={'text-lg text-sky-950'}>
						Using Spaced Repetition for Effective Learning Spaced repetition is a powerful technique that helps you
						retain information over the long term. By reviewing information at strategic intervals, you reinforce your
						memory and reduce the likelihood of forgetting.
					</p>
					<strong className={'text-lg text-sky-950 font-bold'}>
						For example, you might review it again in 1 day, then 3 days, then 7 days, and so on.
					</strong>
					{cards.length ? (
						<div className={'flex flex-wrap items-start justify-start gap-4'}>
							<span className={'me-btn me-btn-dark pointer-events-none p-3'} aria-label={'Tour'} title={'Tour'}>
								<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
									<path d="M2 6a6 6 0 1 1 10.174 4.31c-.203.196-.359.4-.453.619l-.762 1.769A.5.5 0 0 1 10.5 13h-5a.5.5 0 0 1-.46-.302l-.761-1.77a2 2 0 0 0-.453-.618A5.98 5.98 0 0 1 2 6m3 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1l-.224.447a1 1 0 0 1-.894.553H6.618a1 1 0 0 1-.894-.553L5.5 15a.5.5 0 0 1-.5-.5" />
								</svg>
							</span>
							<button
								className={'me-btn me-btn-dark text-2xl px-4'}
								type={'button'}
								aria-label={'Go to Decks'}
								title={'Go to Decks'}
								onClick={() => handleGuidTour('decks')}
							>
								Manage Decks
							</button>
							<button
								className={'me-btn me-btn-dark text-2xl px-4'}
								type={'button'}
								aria-label={'Go to Cards'}
								title={'Go to Cards'}
								onClick={() => handleGuidTour('cards')}
							>
								Manage Cards
							</button>
							<button
								className={'me-btn me-btn-dark text-2xl px-4'}
								type={'button'}
								aria-label={'Go to Study'}
								title={'Go to Study'}
								onClick={() => handleGuidTour('study')}
							>
								Study
							</button>
						</div>
					) : (
						<></>
					)}
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<span className={'me-btn me-btn-dark pointer-events-none p-3'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M9.828.722a.5.5 0 0 1 .354.146l4.95 4.95a.5.5 0 0 1 0 .707c-.48.48-1.072.588-1.503.588-.177 0-.335-.018-.46-.039l-3.134 3.134a6 6 0 0 1 .16 1.013c.046.702-.032 1.687-.72 2.375a.5.5 0 0 1-.707 0l-2.829-2.828-3.182 3.182c-.195.195-1.219.902-1.414.707s.512-1.22.707-1.414l3.182-3.182-2.828-2.829a.5.5 0 0 1 0-.707c.688-.688 1.673-.767 2.375-.72a6 6 0 0 1 1.013.16l3.134-3.133a3 3 0 0 1-.04-.461c0-.43.108-1.022.589-1.503a.5.5 0 0 1 .353-.146" />
							</svg>
						</span>
						<span
							className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							Special Thanks
						</span>
					</div>
					<ul className={'flex flex-col gap-4'}>
						<li className={'text-lg text-sky-950'}>
							<a
								className={'underline font-bold'}
								href={'https://vercel.com'}
								target={'_blank'}
								rel={'noreferrer noopener'}
							>
								https://vercel.com
							</a>
							<span className={'block'}>Your complete platform for the web</span>
						</li>
						<li className={'text-lg text-sky-950'}>
							<a
								className={'underline font-bold'}
								href={'https://gemini.google.com'}
								target={'_blank'}
								rel={'noreferrer noopener'}
							>
								https://gemini.google.com
							</a>
							<span className={'block'}>Supercharge your creativity and productivity</span>
						</li>
						<li className={'text-lg text-sky-950'}>
							<a
								className={'underline font-bold'}
								href={'https://patternpad.com'}
								target={'_blank'}
								rel={'noreferrer noopener'}
							>
								https://patternpad.com
							</a>
							<span className={'block'}>Design beautiful patterns from endless variations</span>
						</li>
						<li className={'text-lg text-sky-950'}>
							<a
								className={'underline font-bold'}
								href={'https://range-input-css.netlify.app'}
								target={'_blank'}
								rel={'noreferrer noopener'}
							>
								https://range-input-css.netlify.app
							</a>
							<span className={'block'}>
								Generate CSS to style range inputs that look consistent across all browsers
							</span>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default About;
