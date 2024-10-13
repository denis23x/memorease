/** @format */

import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cards from './pages/Cards';
import Decks from './pages/Decks';
import NotFound from './pages/NotFound';
import Score from './pages/Score';
import Study from './pages/Study';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import Tooltip from './components/Tooltip';
import { Bounce, ToastContainer } from 'react-toastify';
import bg from './assets/images/bg.png';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Joyride, { Step } from 'react-joyride';

const stepsDecks: Step[] = [
	{
		target: '#joyride-decks-search',
		title: 'Find Your Perfect Deck',
		content: 'Search for decks by keyword or topic'
	},
	{
		target: '#joyride-decks-create',
		title: 'Create Your Own Deck',
		content: 'Start building your personalized deck of cards'
	},
	{
		target: '#joyride-decks',
		title: 'Your Deck Collection',
		content: 'Browse and manage your saved decks'
	}
];

const App: React.FC = () => {
	const [run, setRun] = useState<boolean>(true);
	const [steps, setSteps] = useState<Step[]>(stepsDecks);

	return (
		<div className={'bg-repeat'} style={{ backgroundImage: `url(${bg})` }}>
			<div className={'grid grid-rows-layout min-h-dvh min-w-dvw overflow-hidden'}>
				<Header />
				<Routes>
					<Route path={'/'} element={<Home />} />
					<Route path={'/decks'} element={<Decks />} />
					<Route path={'/decks/:deckUid'} element={<Cards />} />
					<Route path={'/study/:deckUid'} element={<Study />} />
					<Route path={'/score'} element={<Score />} />
					<Route path={'/about'} element={<About />} />
					<Route path={'*'} element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
			<Joyride continuous run={run} showProgress showSkipButton steps={steps} tooltipComponent={Tooltip} />
			<ToastContainer
				position="bottom-center"
				autoClose={1500}
				hideProgressBar={true}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				closeButton={false}
				icon={false}
				draggable
				pauseOnHover
				theme="colored"
				transition={Bounce}
			/>
		</div>
	);
};

export default App;
