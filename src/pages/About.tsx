/** @format */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { JOYRIDE_CARDS, JOYRIDE_DECKS, JOYRIDE_STUDY } from '../keys/Joyride';
import type { Deck } from '../models/Deck';
import type { Card } from '../models/Card';
import { useStore } from '../store/Store';
import Icon from '../components/Icon';

interface SpecialTanks {
	id: number;
	link: string;
	text: string;
}

const About: React.FC = () => {
	const navigate = useNavigate();
	const { decks, cards } = useStore();
	const howToStudy: string[] = [
		`<strong>Choose Your Deck:</strong> Pick a deck that suits your interests or difficulty level.`,
		`<strong>Start the Game</strong>: Once you've selected a deck, the game begins.`,
		`<strong>Answer the Question</strong>: A card with a question will appear in the center of the screen. Think carefully about your answer.`,
		`<strong>Flip the Card</strong>: When you're ready, click on the card to reveal the correct answer.`,
		`<strong>Check Your Answer</strong>: Decide if your answer was right or wrong, and click the corresponding button to move on to the next question.`
	];
	const specialThanks: SpecialTanks[] = [
		{
			id: 1,
			link: 'https://vercel.com',
			text: 'Your complete platform for the web'
		},
		{
			id: 2,
			link: 'https://gemini.google.com',
			text: 'Supercharge your creativity and productivity'
		},
		{
			id: 3,
			link: 'https://patternpad.com',
			text: 'Design beautiful patterns from endless variations'
		},
		{
			id: 4,
			link: 'https://range-input-css.netlify.app',
			text: 'Generate CSS to style range inputs that look consistent across all browsers'
		}
	];

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
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<Link className={'btn btn-dark btn-icon size-12'} to={'/'} aria-label={'Home'} title={'Home'}>
							<Icon name={'house-fill'} width={24} height={24}></Icon>
						</Link>
						<span className={'heading heading-teal'}>About</span>
					</div>
				</header>
				<div className={'flex flex-col items-start gap-4'}>
					{/* prettier-ignore */}
					<p className={'paragraph'}>
						While searching for a tool to train my memory, I discovered a lack of user-friendly, free options.
						Frustrated by the limitations of existing tools, I decided to take matters into my own hands and create
						<strong> Memorease </strong> (also <strong>MemorEase</strong> or <strong>ME</strong>).
					</p>
					<p className={'paragraph'}>
						This app is one of my pet projects and client-side only app. It's designed to be free, simple, effective,
						and accessible to everyone. Whether you're a student, professional, or simply looking to sharpen your mind,
						I hope <strong>Memorease</strong> becomes a valuable asset on your journey.
					</p>
					<span className={'heading heading-red'}>How to Study</span>
					<ul className={'flex flex-col gap-4 list-disc'}>
						{howToStudy.map((howTo: string, index: number) => (
							<li className={'list-inside flex items-start gap-4'} key={index}>
								<figure className={'size-4 aspect-square paragraph py-1.5'}>
									<Icon name={'asterisk'} width={16} height={16}></Icon>
								</figure>
								<span className={'paragraph'} dangerouslySetInnerHTML={{ __html: howTo }}></span>
							</li>
						))}
					</ul>
					<p className={'paragraph'}>
						<strong>That's it! Test your knowledge, have fun, and see how well you do.</strong>
					</p>
					<p className={'paragraph'}>
						Using Spaced Repetition for Effective Learning Spaced repetition is a powerful technique that helps you
						retain information over the long term. By reviewing information at strategic intervals, you reinforce your
						memory and reduce the likelihood of forgetting.
					</p>
					<p className={'paragraph'}>
						<strong>For example, you might review it again in 1 day, then 3 days, then 7 days, and so on.</strong>
					</p>
					{cards.length ? (
						<div className={'flex flex-wrap gap-4'}>
							<span className={'btn btn-dark btn-icon size-12 pointer-events-none'} aria-label={'Tour'} title={'Tour'}>
								<Icon name={'lightbulb-fill'} width={24} height={24}></Icon>
							</span>
							<button
								className={'btn btn-dark text-2xl px-4'}
								type={'button'}
								aria-label={'Go to Decks'}
								title={'Go to Decks'}
								onClick={() => handleGuidTour('decks')}
							>
								Manage Decks
							</button>
							<button
								className={'btn btn-dark text-2xl px-4'}
								type={'button'}
								aria-label={'Go to Cards'}
								title={'Go to Cards'}
								onClick={() => handleGuidTour('cards')}
							>
								Manage Cards
							</button>
							<button
								className={'btn btn-dark text-2xl px-4'}
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
					<div className={'flex items-center  gap-4'}>
						<span
							className={'btn btn-dark btn-icon size-12 pointer-events-none'}
							aria-label={'Thanks'}
							title={'Thanks'}
						>
							<Icon name={'pin-angle-fill'} width={24} height={24}></Icon>
						</span>
						<span className={'heading heading-teal'}>Special Thanks</span>
					</div>
					<ul className={'flex flex-col gap-4'}>
						{specialThanks.map((thanks: SpecialTanks) => (
							<li className={'paragraph'} key={thanks.id}>
								<a className={'underline'} href={thanks.link} target={'_blank'} rel={'noreferrer noopener'}>
									<strong>{thanks.link}</strong>
								</a>
								<span className={'block'}>{thanks.text}</span>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default About;
