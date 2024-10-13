/** @format */

import { customAlphabet } from 'nanoid';

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
