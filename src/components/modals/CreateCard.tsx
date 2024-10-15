/** @format */

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import Modal from '../Modal';
import type { Card as CardType } from '../../models/Card';
import { nanoid } from '../../services/Helper';
import { toast } from 'react-toastify';
import { useStore } from '../../store/Store';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Icon from '../Icon';

const CreateCard: React.FC = () => {
	const { createCard } = useStore();
	const { deckUid } = useParams<{ deckUid: string }>();
	const { register, formState, reset, handleSubmit } = useForm();
	const [isOpen, setIsOpen] = useState<boolean>(false);

	useEffect(() => {
		reset();
	}, [isOpen, reset]);

	const handleCreateCard = (data: any) => {
		if (deckUid) {
			const card: CardType = { uid: nanoid(), timestamp: dayjs().unix(), deckUid, ...data };

			createCard(card)
				.then(() => setIsOpen(false))
				.then(() => toast.info('Card has been created'));
		}
	};

	return (
		<>
			<div className={'card'}>
				<div className={'card-inner bg-pattern-2-3-neutral dark:bg-pattern-2-3-slate'}>
					<button
						id={'joyride-card-create'}
						className={'btn btn-dark btn-icon size-12 z-10'}
						type={'button'}
						aria-label={'Create Card'}
						title={'Create Card'}
						onClick={() => setIsOpen(true)}
					>
						<Icon name={'plus'} width={40} height={40}></Icon>
					</button>
				</div>
			</div>
			<Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
				<div className={'flex flex-col gap-4'}>
					<header className={'flex items-center justify-between gap-4'}>
						<span className={'heading heading-teal'}>New Card</span>
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
					<form className={'flex flex-col gap-4'} onSubmit={handleSubmit(handleCreateCard)}>
						<div className={'flex gap-4'}>
							<input
								className={`input ${formState.errors.question ? 'input-error' : 'input-default'} flex-1`}
								placeholder={'Question'}
								{...register('question', { required: true })}
							/>
							<button
								className={'btn btn-dark btn-icon size-12'}
								type={'submit'}
								aria-label={'Create Deck'}
								title={'Create Deck'}
							>
								<Icon name={'plus'} width={40} height={40}></Icon>
							</button>
						</div>
						<input
							className={`input ${formState.errors.answer ? 'input-error' : 'input-default'} flex-1`}
							placeholder={'Answer'}
							{...register('answer', { required: true })}
						/>
					</form>
				</div>
			</Modal>
		</>
	);
};

export default CreateCard;
