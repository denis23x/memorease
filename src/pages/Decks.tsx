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

const Decks: React.FC = () => {
	// prettier-ignore
	const { register, handleSubmit, reset, formState } = useForm();
	const { decks, createDeck } = useStore();
	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);
	const [createDeckModal, setCreateDeckModal] = useState<boolean>(false);

	useEffect(() => {
		setFilteredDecks(decks);
	}, [decks]);

	useEffect(() => {
		reset();
	}, [createDeckModal]);

	const handleSearch = (value: string) => {
		const filteredDecks: DeckType[] = decks.filter((deck: DeckType) => {
			return deck.name.toLowerCase().includes(value.toLowerCase());
		});

		setFilteredDecks(filteredDecks);
	};

	const handleCreateDeck = (data: any) => {
		const deck: DeckType = { uid: nanoid(), ...data };

		createDeck(deck).then(() => toast.info('Deck has been created'));
		setCreateDeckModal(false);
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<div className={'flex flex-col items-start justify-start max-w-screen-lg gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-1'} to={'/'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</Link>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap py-2 px-4'}>
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
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-y-6 gap-x-4 w-full'}>
					<li className={`col-span-1 rounded-xl shadow-xl`}>
						<div
							className={`flex flex-col items-center justify-center gap-4 size-full aspect-[2/3] bg-neutral-50 border border-neutral-200 overflow-hidden rounded-xl shadow-deck transition-transform hover:mouse:scale-110 hover:mouse:-translate-y-3 p-1`}
						>
							<div
								className={`flex items-center justify-center size-full relative bg-cover border border-neutral-200 rounded-lg`}
								style={{ backgroundImage: `url(${bgNeutral})` }}
							>
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
						<li className={'col-span-1 rounded-xl shadow-xl'} key={deck.uid}>
							<Deck deck={deck}></Deck>
						</li>
					))}
				</ul>
			</div>
			<Modal isOpen={createDeckModal} onClose={() => setCreateDeckModal(false)}>
				<div className={'flex flex-col items-start justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-between gap-4 w-full'}>
						<span className={'text-2xl font-bold bg-teal-200 text-sky-950 rounded-full text-nowrap py-2 px-4'}>
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
							placeholder="Name"
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
