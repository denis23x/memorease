/** @format */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import Deck from '../components/Deck';
import { nanoid } from '../services/Helper';
import Modal from '../components/Modal';
import bgNeutral from '../assets/images/bg-neutral.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';

const Decks: React.FC = () => {
	// prettier-ignore
	const { register, handleSubmit, reset, formState } = useForm();
	const { decks, createDeck } = useStore();
	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);
	const [createDeckModal, setCreateDeckModal] = useState<boolean>(false);

	useEffect(() => {
		setFilteredDecks(decks.sort((a: DeckType, b: DeckType) => b.timestamp - a.timestamp));
	}, [decks]);

	useEffect(() => {
		reset();
	}, [createDeckModal, reset]);

	const handleSearch = (value: string) => {
		setFilteredDecks(decks.filter((deck: DeckType) => deck.name.toLowerCase().includes(value.toLowerCase())));
	};

	const handleCreateDeck = (data: any) => {
		const deck: DeckType = { uid: nanoid(), timestamp: dayjs().unix(), ...data };

		createDeck(deck).then(() => toast.info('Deck has been created'));
		setCreateDeckModal(false);
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
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
					{filteredDecks.map((deck: DeckType) => (
						<li className={'col-span-1 rounded-3xl shadow-xl'} key={deck.uid}>
							<Deck deck={deck}></Deck>
						</li>
					))}
				</ul>
			</div>
			<Modal isOpen={createDeckModal} onClose={() => setCreateDeckModal(false)}>
				<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-between gap-4 w-full'}>
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
					</div>
					<form className={'flex items-start justify-start gap-4 w-full'} onSubmit={handleSubmit(handleCreateDeck)}>
						<input
							className={`me-input ${formState.errors.name ? 'me-input-error' : 'me-input-default'} w-full`}
							placeholder={'Name'}
							{...register('name', { required: true })}
						/>
						<button className={'me-btn me-btn-dark p-1'} type={'submit'} aria-label={'Create'} title={'Create'}>
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
