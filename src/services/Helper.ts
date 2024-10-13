/** @format */

import { customAlphabet } from 'nanoid';
import { CallBackProps } from 'react-joyride';

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
