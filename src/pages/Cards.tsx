/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { joyRideCallback, nanoid } from '../services/Helper';
import { useNavigate } from 'react-router-dom';
import bgNeutral from '../assets/images/bg-neutral.png';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import Joyride, { Step } from 'react-joyride';
import { JOYRIDE_CARDS } from '../keys/Joyride';
import Tooltip from '../components/Tooltip';

const steps: Step[] = [
	{
		disableBeacon: true,
		target: '#joyride-deck-delete',
		title: 'Delete',
		content: 'Delete deck. Remove this deck permanently from your library.'
	},
	{
		target: '#joyride-deck-study',
		title: 'Study',
		content: 'Start studying. Begin a quiz session and see how well you know the content.'
	},
	{
		target: '#joyride-card-create',
		title: 'Create',
		content: 'Create your own card. Add a question and answer to your deck.'
	},
	{
		target: '#joyride-card',
		title: 'Card',
		content: 'Click to flip card. Reveal the answer and test your memory.'
	}
];

const Cards: React.FC = () => {
	// prettier-ignore
	const { register, handleSubmit, reset, formState } = useForm();
	const navigate = useNavigate();
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards, deleteDeck, createCard } = useStore();
	const [deleteDeckModal, setDeleteDeckModal] = useState<boolean>(false);
	const [createCardModal, setCreateCardModal] = useState<boolean>(false);
	const [deck, setDeck] = useState<DeckType | null>(null);
	const [deckCards, setDeckCards] = useState<CardType[]>([]);
	const [joyride] = useState<boolean>(!!localStorage.getItem(JOYRIDE_CARDS));

	useEffect(() => {
		if (deckUid) {
			if (decks.length && cards.length) {
				const deck: DeckType | undefined = decks.find((deck: DeckType) => deck.uid === deckUid);
				const deckCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);

				if (deck) {
					setDeck(deck);
					setDeckCards(deckCards.sort((a: CardType, b: CardType) => b.timestamp - a.timestamp));
				} else {
					navigate('/404');
				}
			}
		}
	}, [deckUid, decks, cards, navigate]);

	useEffect(() => {
		reset();
	}, [createCardModal, reset]);

	const handleDeleteDeck = () => {
		if (!deckUid) {
			return;
		}

		deleteDeck(deckUid).then(() => toast.info('Deck has been deleted'));
		navigate('/decks');
	};

	const handleCreateCard = (data: any) => {
		if (!deckUid) {
			return;
		}

		const card: CardType = { uid: nanoid(), timestamp: dayjs().unix(), deckUid, ...data };

		createCard(card).then(() => toast.info('Card has been created'));
		setDeckCards((prev: CardType[]) => [...prev, card]);
		setCreateCardModal(false);
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			{!joyride ? (
				<Joyride
					continuous
					showSkipButton
					steps={steps}
					tooltipComponent={Tooltip}
					callback={e => joyRideCallback(e, JOYRIDE_CARDS)}
				/>
			) : (
				<></>
			)}
			<div className={'flex flex-col items-start justify-start gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-1'} to={'/decks'} aria-label={'Decks'} title={'Decks'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</Link>
						<span
							className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							{deck?.name}
						</span>
					</div>
					<div className={'flex items-center justify-start gap-4'}>
						<button
							id={'joyride-deck-delete'}
							className={'me-btn me-btn-dark p-3'}
							type={'button'}
							onClick={() => setDeleteDeckModal(true)}
							aria-label={'Delete Deck'}
							title={'Delete Deck'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
							</svg>
						</button>
						{deckCards.length ? (
							<Link
								id={'joyride-deck-study'}
								className={'me-btn me-btn-dark p-2'}
								to={`/study/${deck?.uid}`}
								aria-label={deck?.name}
								title={deck?.name}
							>
								<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
									<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
								</svg>
							</Link>
						) : (
							<></>
						)}
					</div>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 w-full'}>
					<li className={'col-span-1'}>
						<div className={'card'}>
							<div className={'card-inner'} style={{ backgroundImage: `url(${bgNeutral})` }}>
								<button
									id={'joyride-card-create'}
									className={'me-btn me-btn-dark p-1'}
									type={'button'}
									aria-label={'Create Card'}
									title={'Create Card'}
									onClick={() => setCreateCardModal(true)}
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
					{deckCards.map((card: CardType, index: number) => (
						<li id={index === 0 ? 'joyride-card' : card.uid} className={'col-span-1'} key={card.uid}>
							<Card card={card}></Card>
						</li>
					))}
				</ul>
			</div>
			<Modal isOpen={deleteDeckModal} onClose={() => setDeleteDeckModal(false)}>
				<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-between gap-4 w-full'}>
						<span className={'text-2xl font-bold bg-red-400 text-neutral-50 rounded-full whitespace-nowrap py-2 px-4'}>
							Delete Deck
						</span>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
							onClick={() => setDeleteDeckModal(false)}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
						</button>
					</div>
					<div className={'flex items-start justify-start gap-4 w-full'}>
						<p className={'text-lg text-sky-950'}>
							Deleting this Deck will also delete all cards associated with it. Are you sure you want to continue?
						</p>
						<button
							className={'me-btn me-btn-dark p-3'}
							type={'button'}
							aria-label={'Delete Deck'}
							title={'Delete Deck'}
							onClick={handleDeleteDeck}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
							</svg>
						</button>
					</div>
				</div>
			</Modal>
			<Modal isOpen={createCardModal} onClose={() => setCreateCardModal(false)}>
				<form
					className={'flex flex-col items-start justify-start gap-4 w-full'}
					onSubmit={handleSubmit(handleCreateCard)}
				>
					<div className={'flex items-center justify-between gap-4 w-full'}>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap py-2 px-4'}>
							New Card
						</span>
						<button
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							onClick={() => setCreateCardModal(false)}
							aria-label={'Close'}
							title={'Close'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
						</button>
					</div>
					<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
						<div className={'flex items-start justify-start gap-4 w-full'}>
							<input
								className={`me-input ${formState.errors.question ? 'me-input-error' : 'me-input-default'} w-full`}
								placeholder={'Question'}
								{...register('question', { required: true })}
							/>
							<button className={'me-btn me-btn-dark p-1'} type={'submit'} aria-label={'Create'} title={'Create'}>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
									<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
								</svg>
							</button>
						</div>
						<input
							className={`me-input ${formState.errors.answer ? 'me-input-error' : 'me-input-default'} w-full`}
							placeholder={'Answer'}
							{...register('answer', { required: true })}
						/>
					</div>
				</form>
			</Modal>
		</section>
	);
};

export default Cards;
