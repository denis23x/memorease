/** @format */

import React, { useEffect, useState } from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import type { Deck as DeckType } from '../../models/Deck';
import { nanoid } from '../../services/Helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/Store';
import dayjs from 'dayjs';
import Icon from '../Icon';

const CreateDeck: React.FC = () => {
	const navigate = useNavigate();
	const { createDeck } = useStore();
	const { register, formState, reset, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		reset();
	}, [isOpen, reset]);

	const handleCreateDeck = (data: any) => {
		const deck: DeckType = { uid: nanoid(), timestamp: dayjs().unix(), name: data.name };

		createDeck(deck)
			.then((deck: DeckType) => navigate(deck.uid))
			.then(() => toast.info('Deck has been created'));
	};

	return (
		<>
			<div className={`deck`}>
				<div className={`deck-inner`}>
					<img
						className={'block dark:hidden absolute size-full inset-0'}
						src={'/assets/images/pattern-2-3-neutral.png'}
						loading={'eager'}
						alt={'Create Deck'}
					/>
					<img
						className={'hidden dark:block absolute size-full inset-0'}
						src={'/assets/images/pattern-2-3-slate.png'}
						loading={'eager'}
						alt={'Create Deck'}
					/>
					<button
						id={'joyride-deck-create'}
						className={'btn btn-dark btn-icon size-12 z-10'}
						type={'button'}
						aria-label={'Create Deck'}
						title={'Create Deck'}
						onClick={() => setIsOpen(true)}
					>
						<Icon name={'plus'} width={40} height={40}></Icon>
					</button>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div className={'flex flex-col gap-4'}>
					<header className={'flex items-center justify-between gap-4'}>
						<span className={'heading heading-teal'}>New Deck</span>
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
					<form className={'flex gap-4'} onSubmit={handleSubmit(handleCreateDeck)}>
						<input
							className={`input ${formState.errors.name ? 'input-error' : 'input-default'} flex-1`}
							placeholder={'Name'}
							{...register('name', { required: true })}
						/>
						<button
							className={'btn btn-dark btn-icon size-12'}
							type={'submit'}
							aria-label={'Create Deck'}
							title={'Create Deck'}
						>
							<Icon name={'plus'} width={40} height={40}></Icon>
						</button>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CreateDeck;
