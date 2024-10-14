/** @format */

import { customAlphabet } from 'nanoid';
import { useForm } from 'react-hook-form';
import { CallBackProps } from 'react-joyride';
import { Card } from '../models/Card';

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12);
export const formatMilliseconds = (milliseconds: number): string => {
	const seconds: number = milliseconds / 1000;
	const minutes: number = Math.floor(seconds / 60);
	const remainingSeconds: number = seconds % 60;

	if (minutes > 0) {
		return `${minutes}.${remainingSeconds.toFixed(2)}`;
	} else {
		return `${remainingSeconds.toFixed(2)}`;
	}
};
export const joyRideCallback = (data: CallBackProps, key: string): void => {
	const isClosed: boolean = data.action === 'close' && data.origin === 'button_close';
	const isSkipped: boolean = data.action === 'skip';

	if (isClosed || isSkipped) {
		localStorage.setItem(key, '1');
	}
};
export const registerForm = () => {
	// eslint-disable-next-line react-hooks/rules-of-hooks
	const { register, formState, reset, watch, handleSubmit } = useForm();

	return { register, formState, reset, watch, handleSubmit };
};
export const parseCSV = (text: string): Partial<Card>[] => {
	const lines: string[] = text.split('\n');
	const cards: Partial<Card>[] = [];

	for (let i = 0; i < lines.length; i += 1) {
		const [question, answer]: string[] = lines[i].split(';');

		cards.push({ question, answer });
	}

	return cards;
};
