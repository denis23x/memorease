/** @format */

import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import type { Deck as DeckType } from '../../models/Deck';
import { nanoid, parseCSV } from '../../services/Helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/Store';
import dayjs from 'dayjs';
import type { ChatSession, GenerateContentResult } from '@google/generative-ai';
import { generationConfig, model } from '../../services/Gemini';
import type { Card as CardType } from '../../models/Card';
import Icon from '../Icon';

const CreateWithAI: React.FC = () => {
	const navigate = useNavigate();
	const { createDeck, createCard } = useStore();
	const { register, formState, reset, watch, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		reset();
	}, [isOpen, reset]);

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
			.catch(() => toast.info('Please try again later'))
			.finally(() => reset());
	};

	return (
		<>
			<div className={'deck'}>
				<div className={'deck-inner bg-pattern-2-3-neutral dark:bg-pattern-2-3-slate'}>
					<button
						id={'joyride-deck-ai'}
						className={'btn btn-dark btn-icon size-12 z-10'}
						type={'button'}
						aria-label={'Create with AI'}
						title={'Create with AI'}
						onClick={() => setIsOpen(true)}
					>
						<Icon name={'cpu-fill'} width={24} height={24}></Icon>
					</button>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div className={'flex flex-col gap-4'}>
					<header className={'flex items-center justify-between gap-4'}>
						<span className={'heading heading-teal'}>Ask AI</span>
						<button
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
							onClick={() => setIsOpen(false)}
						>
							<Icon name={'x'} width={40} height={40}></Icon>
						</button>
					</header>
					<p className={'paragraph'}>Enter a topic and quantity to get AI-generated questions.</p>
					<form className={`flex flex-col gap-4`} onSubmit={handleSubmit(handleAI)}>
						<div className={'flex items-center gap-4'}>
							<input
								className={`input ${formState.errors.name ? 'input-error' : 'input-default'} flex-1`}
								placeholder={'Space, WW2, Spider-Man ..etc'}
								disabled={formState.isSubmitSuccessful}
								{...register('name', { required: true, minLength: 3 })}
							/>
							<button
								className={'btn btn-dark btn-icon size-12'}
								type={'submit'}
								aria-label={'Create Deck with AI'}
								title={'Create Deck with AI'}
								disabled={formState.isSubmitSuccessful}
							>
								{formState.isSubmitSuccessful ? (
									<div className={'animate-spin'}>
										<Icon name={'asterisk'} width={24} height={24}></Icon>
									</div>
								) : (
									<Icon name={'arrow-right-short'} width={40} height={40}></Icon>
								)}
							</button>
						</div>
						<div className={'flex items-center gap-4'}>
							<input
								type={'range'}
								step={1}
								min={10}
								max={30}
								disabled={formState.isSubmitSuccessful}
								{...register('count', { required: true, value: 10 })}
							/>
							<span
								className={`btn btn-dark btn-icon size-12 text-xl pointer-events-none ${formState.isSubmitSuccessful ? 'opacity-25' : ''}`}
								aria-label={'Count of Questions'}
								title={'Count of Questions'}
							>
								{watch('count')}
							</span>
						</div>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CreateWithAI;
