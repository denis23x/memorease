/** @format */

import React, { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }: ModalProps) => {
	if (!isOpen) {
		return null;
	}

	return (
		<div
			className={'flex items-end md:items-center justify-center fixed inset-0 size-full bg-black/50 z-50'}
			onClick={onClose}
		>
			<div
				className={'relative bg-neutral-50 dark:bg-slate-900 rounded-t-3xl md:rounded-3xl max-w-lg w-full p-4'}
				onClick={e => e.stopPropagation()}
			>
				{children}
			</div>
		</div>
	);
};

export default Modal;
