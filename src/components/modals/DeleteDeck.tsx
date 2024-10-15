/** @format */

import React, { useState } from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { useStore } from '../../store/Store';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../Icon';

const DeleteDeck: React.FC = () => {
	const navigate = useNavigate();
	const { deleteDeck } = useStore();
	const { deckUid } = useParams<{ deckUid: string }>();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const handleDeleteDeck = () => {
		if (deckUid) {
			deleteDeck(deckUid).then(() => toast.info('Deck has been deleted'));
			navigate('/decks');
		}
	};

	return (
		<>
			<button
				id={'joyride-deck-delete'}
				className={'btn btn-dark btn-icon size-12'}
				type={'button'}
				onClick={() => setIsOpen(true)}
				aria-label={'Delete Deck'}
				title={'Delete Deck'}
			>
				<Icon name={'trash-fill'} width={24} height={24}></Icon>
			</button>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div className={'flex flex-col gap-4'}>
					<header className={'flex items-center justify-between gap-4'}>
						<span className={'heading heading-red'}>Delete Deck</span>
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
					<div className={'flex gap-4'}>
						<p className={'paragraph'}>
							Deleting this Deck will also delete all cards associated with it. Are you sure you want to continue?
						</p>
						<button
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Delete Deck'}
							title={'Delete Deck'}
							onClick={handleDeleteDeck}
						>
							<Icon name={'trash-fill'} width={24} height={24}></Icon>
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
};

export default DeleteDeck;
