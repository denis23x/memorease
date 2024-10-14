/** @format */

import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';

export const apiKey: string = process.env.REACT_APP_GEMINI_API_KEY as string;
export const genAI: GoogleGenerativeAI = new GoogleGenerativeAI(apiKey);
export const model: GenerativeModel = genAI.getGenerativeModel({
	model: 'gemini-1.5-flash'
});
export const generationConfig = {
	temperature: 1,
	topP: 0.95,
	topK: 64,
	maxOutputTokens: 8192,
	responseMimeType: 'text/plain'
};
