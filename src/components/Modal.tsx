/** @format */

import React, { ReactNode } from 'react';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal: React.FC<ModalProps> = (props: ModalProps) => {
	if (!props.isOpen) {
		return null;
	}

	return (
		<div className={'flex items-center justify-center fixed inset-0 size-full bg-sky-950/50'} onClick={props.onClose}>
			<div
				className={'relative bg-neutral-50 rounded-3xl max-w-screen-sm w-full p-4'}
				onClick={e => e.stopPropagation()}
			>
				<div className={'flex'}>{props.children}</div>
			</div>
		</div>
	);
};

export default Modal;
