/** @format */

import React, { useEffect } from 'react';
import Modal from '../Modal';
import { useForm } from 'react-hook-form';
import type { Deck as DeckType } from '../../models/Deck';
import { nanoid } from '../../services/Helper';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/Store';
import dayjs from 'dayjs';
import Icon from '../Icon';

interface CreateDeckProps {
	createDeckModal: boolean;
	setCreateDeckModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CreateDeck: React.FC<CreateDeckProps> = ({ createDeckModal, setCreateDeckModal }: CreateDeckProps) => {
	const navigate = useNavigate();
	const { createDeck } = useStore();
	const { register, formState, reset, handleSubmit } = useForm();

	useEffect(() => {
		reset();
	}, [createDeckModal, reset]);

	const handleCreateDeck = (data: any) => {
		const deck: DeckType = { uid: nanoid(), timestamp: dayjs().unix(), name: data.name };

		createDeck(deck)
			.then((deck: DeckType) => navigate(deck.uid))
			.then(() => toast.info('Deck has been created'));
	};

	return (
		<Modal isOpen={createDeckModal} onClose={() => setCreateDeckModal(false)}>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex items-center justify-between gap-4'}>
					<span className={'heading heading-teal'}>New Deck</span>
					<button
						className={'btn btn-dark btn-icon size-12'}
						type={'button'}
						aria-label={'Close'}
						title={'Close'}
						onClick={() => setCreateDeckModal(false)}
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
	);
};

export default CreateDeck;
