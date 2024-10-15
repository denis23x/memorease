/** @format */

import React, { useEffect, useState } from 'react';
import { useStore } from '../store/Store';
import type { Deck as DeckType } from '../models/Deck';
import Deck from '../components/Deck';
import { joyRideCallback } from '../services/Helper';
import { Link } from 'react-router-dom';
import Joyride, { Step } from 'react-joyride';
import Tooltip from '../components/Tooltip';
import { JOYRIDE_DECKS } from '../keys/Joyride';
import Icon from '../components/Icon';
import CreateDeck from '../components/modals/CreateDeck';
import CreateWithAI from '../components/modals/CreateWithAI';

const steps: Step[] = [
	{
		disableBeacon: true,
		target: '#joyride-deck-search',
		title: 'Search',
		content: 'Search for decks by topic. Type a word or phrase related to the topic.'
	},
	{
		target: '#joyride-deck-ai',
		title: 'Ask AI',
		content: 'Simply enter a topic, and AI will do the rest. Start building your deck now.'
	},
	{
		target: '#joyride-deck-create',
		title: 'Create',
		content: 'Create your own deck. Add any questions, and make learning fun!'
	},
	{
		target: '#joyride-deck',
		title: 'Study',
		content: 'Begin a quiz session and see how well you know the content.'
	}
];

const Decks: React.FC = () => {
	const { decks } = useStore();
	const [filteredDecks, setFilteredDecks] = useState<DeckType[]>([]);
	const [joyride, setJoyride] = useState<boolean>(false);

	useEffect(() => {
		setFilteredDecks(decks.sort((a: DeckType, b: DeckType) => b.timestamp - a.timestamp));
		setJoyride(!localStorage.getItem(JOYRIDE_DECKS));
	}, [decks]);

	const handleSearch = (value: string) => {
		setFilteredDecks(decks.filter((deck: DeckType) => deck.name.toLowerCase().includes(value.toLowerCase())));
	};

	return (
		<section className={'overflow-hidden pt-4 px-4 pb-8'}>
			<Joyride
				styles={{
					options: {
						arrowColor: 'currentColor'
					}
				}}
				run={joyride}
				continuous
				showSkipButton
				steps={steps}
				tooltipComponent={Tooltip}
				callback={e => joyRideCallback(e, JOYRIDE_DECKS)}
			/>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<Link className={'btn btn-dark btn-icon size-12'} to={'/'} aria-label={'Home'} title={'Home'}>
							<Icon name={'house-fill'} width={24} height={24}></Icon>
						</Link>
						<span className={'heading heading-teal'}>Select a Deck</span>
					</div>
					<input
						id={'joyride-deck-search'}
						className={'input input-default flex-1'}
						onChange={e => handleSearch(e.target.value)}
						aria-label={'Search'}
						title={'Search'}
						placeholder={'Your search begins here'}
					/>
				</header>
				<ul className={'grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4'}>
					<li className={`col-span-1 rounded-3xl shadow-xl`}>
						<CreateWithAI></CreateWithAI>
					</li>
					<li className={`col-span-1 rounded-3xl shadow-xl`}>
						<CreateDeck></CreateDeck>
					</li>
					{filteredDecks.map((deck: DeckType, index: number) => (
						<li
							id={index === 0 ? 'joyride-deck' : deck.uid}
							className={'col-span-1 rounded-3xl shadow-xl'}
							key={deck.uid}
						>
							<Deck deck={deck}></Deck>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
};

export default Decks;
