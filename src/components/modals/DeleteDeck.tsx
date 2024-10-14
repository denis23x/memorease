/** @format */

import React from 'react';
import Modal from '../Modal';
import { toast } from 'react-toastify';
import { useStore } from '../../store/Store';
import { useNavigate, useParams } from 'react-router-dom';
import Icon from '../Icon';

interface DeleteDeckProps {
	deleteDeckModal: boolean;
	setDeleteDeckModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteDeck: React.FC<DeleteDeckProps> = ({ deleteDeckModal, setDeleteDeckModal }: DeleteDeckProps) => {
	const navigate = useNavigate();
	const { deleteDeck } = useStore();
	const { deckUid } = useParams<{ deckUid: string }>();

	const handleDeleteDeck = () => {
		if (deckUid) {
			deleteDeck(deckUid).then(() => toast.info('Deck has been deleted'));
			navigate('/decks');
		}
	};

	return (
		<Modal isOpen={deleteDeckModal} onClose={() => setDeleteDeckModal(false)}>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex items-center justify-between gap-4'}>
					<span className={'heading heading-red'}>Delete Deck</span>
					<button
						className={'btn btn-dark btn-icon size-12'}
						type={'button'}
						aria-label={'Close'}
						title={'Close'}
						onClick={() => setDeleteDeckModal(false)}
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
	);
};

export default DeleteDeck;
