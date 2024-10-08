/** @format */

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { nanoid } from '../services/Helper';
import { useNavigate } from 'react-router-dom';
import bgNeutral from '../assets/images/bg-neutral.png';

const Cards: React.FC = () => {
	const navigate = useNavigate();
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards, deleteDeck, createCard } = useStore();
	const [deleteDeckModal, setDeleteDeckModal] = useState<boolean>(false);
	const [createCardModal, setCreateCardModal] = useState<boolean>(false);
	const [deck, setDeck] = useState<DeckType | null>(null);
	const [deckCards, setDeckCards] = useState<CardType[]>([]);
	const [cardQuestion, setCardQuestion] = useState<string>('');
	const [cardAnswer, setCardAnswer] = useState<string>('');

	useEffect(() => {
		const deck: DeckType | undefined = decks.find((deck: DeckType) => deck.uid === deckUid);
		const deckCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);

		if (deck) {
			setDeck(deck);
			setDeckCards(deckCards);
		}
	}, [deckUid, decks, cards]);

	const handleDeleteDeck = () => {
		if (!deckUid) {
			return;
		}

		deleteDeck(deckUid).then(() => console.debug('Deck deleted'));
		navigate('/decks');
	};

	const handleCreateCard = () => {
		if (!deckUid) {
			return;
		}

		const card: CardType = {
			uid: nanoid(),
			deckUid,
			question: cardQuestion,
			answer: cardAnswer
		};

		createCard(card).then(() => console.debug('Card created'));
		setDeckCards((prev: CardType[]) => [...prev, card]);
		setCardQuestion('');
		setCardAnswer('');
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-1'} to={'/decks'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</Link>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap truncate py-2 px-4'}>
							{deck?.name}
						</span>
					</div>
					<div className={'flex items-center justify-start gap-4'}>
						<button
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
						<Link className={'me-btn me-btn-dark p-2'} to={`/study/${deck?.uid}`}>
							<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
								<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
							</svg>
						</Link>
					</div>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full'}>
					<li className={`col-span-1 rounded-xl shadow-xl`}>
						<div
							className={`flex flex-col items-center justify-center gap-4 size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl transition-transform hover:mouse:scale-105 hover:mouse:-translate-y-1.5 p-1`}
						>
							<div
								className={`flex items-center justify-center size-full relative bg-cover border border-neutral-200 rounded-lg`}
								style={{ backgroundImage: `url(${bgNeutral})` }}
							>
								<button
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
					{deckCards.map((card: CardType) => (
						<li className={'col-span-1 rounded-xl shadow-xl'} key={card.uid}>
							<Card card={card}></Card>
						</li>
					))}
				</ul>
				<Modal isOpen={deleteDeckModal} onClose={() => setDeleteDeckModal(false)}>
					<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
						<div className={'flex items-center justify-between gap-4 w-full'}>
							<span className={'text-2xl font-bold bg-red-400 text-neutral-50 rounded-full text-nowrap py-2 px-4'}>
								Delete
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
					<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
						<div className={'flex items-center justify-between gap-4 w-full'}>
							<span className={'text-2xl font-bold bg-red-400 text-neutral-50 rounded-full text-nowrap py-2 px-4'}>
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
									className={'me-input w-full !border-0'}
									value={cardQuestion}
									onChange={e => setCardQuestion(e.target.value)}
									onKeyDown={e => e.key === 'Enter' && handleCreateCard()}
									placeholder="Question"
								/>
								<button
									className={'me-btn me-btn-dark p-1'}
									type={'button'}
									aria-label={'Create'}
									title={'Create'}
									onClick={handleCreateCard}
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
							<input
								className={'me-input w-full !border-0'}
								value={cardAnswer}
								onChange={e => setCardAnswer(e.target.value)}
								onKeyDown={e => e.key === 'Enter' && handleCreateCard()}
								placeholder="Answer"
							/>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Cards;
