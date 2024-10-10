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
			className={'flex items-end md:items-center justify-center fixed inset-0 size-full bg-sky-950/50'}
			onClick={onClose}
		>
			<div
				className={'relative bg-neutral-50 rounded-t-3xl md:rounded-3xl max-w-lg w-full p-4'}
				onClick={e => e.stopPropagation()}
			>
				<div className={'flex'}>{children}</div>
			</div>
		</div>
	);
};

export default Modal;
