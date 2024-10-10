/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Cards from './pages/Cards';
import Decks from './pages/Decks';
import Example from './pages/Example';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/images/bg.png';

import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';

const App: React.FC = () => {
	return (
		<div
			className={'grid grid-rows-layout min-h-dvh min-w-dvw bg-repeat bg-center bg-opacity-50 overflow-hidden'}
			style={{ backgroundImage: `url(${bg})` }}
		>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/decks" element={<Decks />} />
				<Route path="/decks/:deckUid" element={<Cards />} />
				<Route path="/example" element={<Example />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
