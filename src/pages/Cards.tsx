/** @format */

import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import type { Card as CardType } from '../models/Card';
import Back from '../components/Back';
import Card from '../components/Card';
import Modal from '../components/Modal';
import { nanoid } from '../services/Helper';

const Cards: React.FC = () => {
	const { deckUid } = useParams<{ deckUid: string }>();
	const { decks, cards, deleteDeck, createCard, deleteCard } = useStore();

	const childRef = useRef<{ handleBack: () => void }>(null);

	const [deck, setDeck] = useState<DeckType | null>(null);
	const [deckCards, setDeckCards] = useState<CardType[]>([]);

	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const [question, setQuestion] = useState<string>('');
	const [answer, setAnswer] = useState<string>('');

	useEffect(() => {
		const deck: DeckType | undefined = decks.find((deck: DeckType) => deck.uid === deckUid);
		const deckCards: CardType[] = cards.filter((card: CardType) => card.deckUid === deckUid);

		if (deck) {
			setDeck(deck);
			setDeckCards(deckCards);
		}
	}, [deckUid, decks, cards]);

	const handleDeleteDeck = () => {
		if (deckUid) {
			deleteDeck(deckUid).then(() => console.debug('Deck deleted'));

			if (childRef.current) {
				childRef.current.handleBack();
			}
		}
	};

	const handleCreateCard = () => {
		if (!deckUid) return;

		const card: CardType = {
			uid: nanoid(),
			deckUid,
			question,
			answer
		};

		createCard(card).then(() => console.debug('Card created'));
		setDeckCards((prev: CardType[]) => [...prev, card]);
		setQuestion('');
		setAnswer('');
	};

	const handleUpdateCard = (cardUid: string) => {
		const card: CardType | undefined = deckCards.find((card: CardType) => {
			return card.uid === cardUid;
		});

		if (card) {
			setQuestion(card.question);
			setAnswer(card.answer);
			openModal();
		}
	};

	const handleDeleteCard = (cardUid: string) => {
		deleteCard(cardUid).then(() => console.debug('Card deleted'));
	};

	return (
		<section className={'p-4'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<Back ref={childRef}></Back>
					<h1 className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap truncate py-2 px-4'}>
						{deck?.name}
					</h1>
					<button className={'me-btn me-btn-dark p-3'} type={'button'} onClick={handleDeleteDeck}>
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
							<path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
						</svg>
					</button>
					<Link className={'me-btn me-btn-dark p-2'} to={`/study/${deck?.uid}`}>
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
							<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
						</svg>
					</Link>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 w-full'}>
					<li className={`col-span-1`}>
						<div
							className={`flex flex-col items-center justify-center gap-4 size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl p-1`}
						>
							<button className={'me-btn me-btn-dark px-4'} type={'button'} onClick={openModal}>
								Create
							</button>
							<button className={'me-btn me-btn-light px-4'} type={'button'}>
								Import
							</button>
						</div>
					</li>
					{deckCards.map((card: CardType) => (
						<li className={'col-span-1'} key={card.uid}>
							<Card
								card={card}
								handleUpdateCard={e => handleUpdateCard(e)}
								handleDeleteCard={e => handleDeleteCard(e)}
							></Card>
						</li>
					))}
				</ul>
				<Modal isOpen={isModalOpen} onClose={closeModal}>
					<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
						<div className={'flex items-center justify-start gap-4'}>
							<button className={'me-btn me-btn-dark p-1'} type={'button'} onClick={closeModal}>
								<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
									<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
								</svg>
							</button>
							<h1 className={'text-2xl font-bold bg-red-400 text-neutral-50 rounded-full text-nowrap py-2 px-4'}>
								New Card
							</h1>
						</div>
						<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
							<input
								className={'me-input w-full !border-0'}
								value={question}
								onChange={e => setQuestion(e.target.value)}
								placeholder="Question"
							/>
							<input
								className={'me-input w-full !border-0'}
								value={answer}
								onChange={e => setAnswer(e.target.value)}
								placeholder="Answer"
							/>
							<button className={'me-btn me-btn-dark py-2 p-4 w-full'} type={'button'} onClick={handleCreateCard}>
								Create
							</button>
						</div>
					</div>
				</Modal>
			</div>
		</section>
	);
};

export default Cards;
