/** @format */

import { customAlphabet } from 'nanoid';
import { CallBackProps } from 'react-joyride';
import { Card } from '../models/Card';

export const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', 12);
export const formatMilliseconds = (ms: number): string => {
	const milliseconds: number = ms % 1000;
	const totalSeconds: number = Math.floor(ms / 1000);
	const seconds: number = totalSeconds % 60;
	const minutes: number = Math.floor(totalSeconds / 60);

	if (minutes > 0) {
		const s: string = seconds.toFixed(0).padStart(2, '0');
		const ms: string = Math.floor(milliseconds / 10)
			.toString()
			.padStart(2, '0');

		return `${minutes}:${s}.${ms}`;
	} else {
		return (seconds + milliseconds / 1000).toFixed(2).toString();
	}
};
export const joyRideCallback = (data: CallBackProps, key: string): void => {
	const isClosed: boolean = data.action === 'close' && data.origin === 'button_close';
	const isSkipped: boolean = data.action === 'skip';

	if (isClosed || isSkipped) {
		localStorage.setItem(key, '1');
	}
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
