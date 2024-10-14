/** @format */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import Deck from '../components/Deck';
import { joyRideCallback, nanoid, parseCSV, registerForm } from '../services/Helper';
import Modal from '../components/Modal';
import bgNeutral from '../assets/images/bg-neutral.png';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import Joyride, { Step } from 'react-joyride';
import Tooltip from '../components/Tooltip';
import { JOYRIDE_DECKS } from '../keys/Joyride';
import type { ChatSession, GenerateContentResult } from '@google/generative-ai';
import { generationConfig, model } from '../services/Gemini';

const steps: Step[] = [
	{
		disableBeacon: true,
		target: '#joyride-deck-search',
		title: 'Search',
		content: 'Search for decks by topic. Type a word or phrase related to the topic.'
	},
	{
		target: '#joyride-deck-ai',
		title: 'Ask AI',
		content: 'Simply enter a topic, and AI will do the rest. Start building your deck now.'
	},
	{
		target: '#joyride-deck-create',
		title: 'Create',
		content: 'Create your own deck. Add any questions, and make learning fun!'
	},
	{
		target: '#joyride-deck',
		title: 'Study',
		content: 'Begin a quiz session and see how well you know the content.'
	}
];

const Decks: React.FC = () => {
	const navigate = useNavigate();
	const { decks, createDeck, createCard } = useStore();
	const createAIForm = registerForm();
	const createDeckForm = registerForm();
	const [createAIModal, setCreateAIModal] = useState<boolean>(false);
	const [createDeckModal, setCreateDeckModal] = useState<boolean>(false);
	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);
	const [joyride, setJoyride] = useState<boolean>(false);

	useEffect(() => {
		setFilteredDecks(decks.sort((a: DeckType, b: DeckType) => b.timestamp - a.timestamp));
		setJoyride(!localStorage.getItem(JOYRIDE_DECKS));
	}, [decks]);

	useEffect(() => {
		createDeckForm.reset();
		createAIForm.reset();
	}, [createDeckModal, createAIModal]);

	const handleSearch = (value: string) => {
		setFilteredDecks(decks.filter((deck: DeckType) => deck.name.toLowerCase().includes(value.toLowerCase())));
	};

	const handleAI = (data: any) => {
		const chatSession: ChatSession = model.startChat({
			generationConfig,
			history: []
		});
		const chatMessage: string[] = [
			`generate a ${data.count} questions about '${data.name}'`,
			'question should be no longer than 40 characters',
			'answer should be no longer than 60 characters, add emojis in answer',
			'generate output as CSV format (comma-separated value)',
			'use a semicolon character (;) as the delimiter',
			'example:',
			'question;answer',
			"Who are you?;I'm AI",
			'What is your name?;Gemini'
		];

		chatSession
			.sendMessage(chatMessage)
			.then((result: GenerateContentResult) => {
				const csv: string = result.response.text();
				const deck: DeckType = { uid: nanoid(), timestamp: dayjs().unix(), name: data.name };
				const cards: Partial<CardType>[] = parseCSV(csv);

				// prettier-ignore
				createDeck(deck).then(async (deck: DeckType) => {
					const cardsPromise: Promise<CardType>[] = cards
						.filter((card: Partial<CardType>) => card.answer !== '' && card.question !== '')
						.filter((card: Partial<CardType>) => card.answer?.toLowerCase() !== 'answer' && card.question?.toLowerCase() !== 'question')
						.map((card: Partial<CardType>) => ({ uid: nanoid(), timestamp: dayjs().unix(), deckUid: deck.uid, ...card } as CardType))
						.map(async (card: CardType) => createCard(card));

					await Promise.all(cardsPromise)
						.then(() => navigate(deck.uid))
						.then(() => toast.info('Deck has been created'));
				});
			})
			.catch(() => {
				createAIForm.reset();
				toast.info('Please try again later');
			});
	};

	const handleCreateDeck = (data: any) => {
		const deck: DeckType = { uid: nanoid(), timestamp: dayjs().unix(), name: data.name };

		createDeck(deck)
			.then((deck: DeckType) => navigate(deck.uid))
			.then(() => toast.info('Deck has been created'));
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<Joyride
				run={joyride}
				continuous
				showSkipButton
				steps={steps}
				tooltipComponent={Tooltip}
				callback={e => joyRideCallback(e, JOYRIDE_DECKS)}
			/>
			<div className={'flex flex-col items-start justify-start gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-3'} to={'/'} aria-label={'Home'} title={'Home'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
							</svg>
						</Link>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap py-2 px-4'}>
							Select a Deck
						</span>
					</div>
					<input
						id={'joyride-deck-search'}
						className={'me-input me-input-default w-full'}
						onChange={e => handleSearch(e.target.value)}
						aria-label={'Search'}
						title={'Search'}
						placeholder={'Search'}
					/>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full'}>
					<li className={`col-span-1 rounded-3xl shadow-xl`}>
						<div className={`deck`}>
							<div className={`deck-inner`} style={{ backgroundImage: `url(${bgNeutral})` }}>
								<button
									id={'joyride-deck-ai'}
									className={'me-btn me-btn-dark p-3'}
									type={'button'}
									aria-label={'Create with AI'}
									title={'Create with AI'}
									onClick={() => setCreateAIModal(true)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M6.5 6a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z" />
										<path d="M5.5.5a.5.5 0 0 0-1 0V2A2.5 2.5 0 0 0 2 4.5H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2v1H.5a.5.5 0 0 0 0 1H2A2.5 2.5 0 0 0 4.5 14v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14h1v1.5a.5.5 0 0 0 1 0V14a2.5 2.5 0 0 0 2.5-2.5h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14v-1h1.5a.5.5 0 0 0 0-1H14A2.5 2.5 0 0 0 11.5 2V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1V.5a.5.5 0 0 0-1 0V2h-1zm1 4.5h3A1.5 1.5 0 0 1 11 6.5v3A1.5 1.5 0 0 1 9.5 11h-3A1.5 1.5 0 0 1 5 9.5v-3A1.5 1.5 0 0 1 6.5 5" />
									</svg>
								</button>
							</div>
						</div>
					</li>
					<li className={`col-span-1 rounded-3xl shadow-xl`}>
						<div className={`deck`}>
							<div className={`deck-inner`} style={{ backgroundImage: `url(${bgNeutral})` }}>
								<button
									id={'joyride-deck-create'}
									className={'me-btn me-btn-dark p-1'}
									type={'button'}
									aria-label={'Create Deck'}
									title={'Create Deck'}
									onClick={() => setCreateDeckModal(true)}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="40"
										height="40"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
									</svg>
								</button>
							</div>
						</div>
					</li>
					{filteredDecks.map((deck: DeckType, index: number) => (
						<li
							id={index === 0 ? 'joyride-deck' : deck.uid}
							className={'col-span-1 rounded-3xl shadow-xl'}
							key={deck.uid}
						>
							<Deck deck={deck}></Deck>
						</li>
					))}
				</ul>
			</div>
			<Modal isOpen={createAIModal} onClose={() => setCreateAIModal(false)}>
				<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
					<header className={'flex items-center justify-between gap-4 w-full'}>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap py-2 px-4'}>
							Ask AI
						</span>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
							onClick={() => setCreateAIModal(false)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
						</button>
					</header>
					<p className={'text-lg text-sky-950'}>Enter a topic and quantity to get AI-generated questions.</p>
					<form
						className={`flex flex-col items-start justify-start gap-4 w-full`}
						onSubmit={createAIForm.handleSubmit(handleAI)}
					>
						<div className={'flex items-center justify-start gap-4 w-full'}>
							<input
								className={`me-input ${createAIForm.formState.errors.name ? 'me-input-error' : 'me-input-default'} w-full`}
								placeholder={'Space, WW2, Spider-Man ..etc'}
								disabled={createAIForm.formState.isSubmitSuccessful}
								{...createAIForm.register('name', { required: true, minLength: 3 })}
							/>
							<button
								className={'me-btn me-btn-dark p-1'}
								type={'submit'}
								aria-label={'Create Deck with AI'}
								title={'Create Deck with AI'}
								disabled={createAIForm.formState.isSubmitSuccessful}
							>
								{createAIForm.formState.isSubmitSuccessful ? (
									<svg
										className="animate-spin size-10 p-2 text-neutral-50"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
									>
										<circle
											className="opacity-25"
											cx="12"
											cy="12"
											r="10"
											stroke="currentColor"
											strokeWidth="4"
										></circle>
										<path
											className="opacity-75"
											fill="currentColor"
											d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
										></path>
									</svg>
								) : (
									<svg
										xmlns="http://www.w3.org/2000/svg"
										width="40"
										height="40"
										fill="currentColor"
										viewBox="0 0 16 16"
									>
										<path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
									</svg>
								)}
							</button>
						</div>
						<div className={'flex items-center justify-start gap-4 w-full'}>
							<input
								type={'range'}
								step={1}
								min={10}
								max={30}
								disabled={createAIForm.formState.isSubmitSuccessful}
								{...createAIForm.register('count', { required: true, value: 10 })}
							/>
							<span
								className={`flex items-center justify-center bg-sky-950 text-xl font-bold text-neutral-50 rounded-full size-12 aspect-square ${createAIForm.formState.isSubmitSuccessful ? 'opacity-25 cursor-not-allowed' : ''}`}
								aria-label={'Count of Questions'}
								title={'Count of Questions'}
							>
								{createAIForm.watch('count')}
							</span>
						</div>
					</form>
				</div>
			</Modal>
			<Modal isOpen={createDeckModal} onClose={() => setCreateDeckModal(false)}>
				<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
					<header className={'flex items-center justify-between gap-4 w-full'}>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap py-2 px-4'}>
							New Deck
						</span>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
							onClick={() => setCreateDeckModal(false)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
						</button>
					</header>
					<form
						className={'flex items-start justify-start gap-4 w-full'}
						onSubmit={createDeckForm.handleSubmit(handleCreateDeck)}
					>
						<input
							className={`me-input ${createDeckForm.formState.errors.name ? 'me-input-error' : 'me-input-default'} w-full`}
							placeholder={'Name'}
							{...createDeckForm.register('name', { required: true })}
						/>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'submit'}
							aria-label={'Create Deck'}
							title={'Create Deck'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
							</svg>
						</button>
					</form>
				</div>
			</Modal>
		</section>
	);
};

export default Decks;
