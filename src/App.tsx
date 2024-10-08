/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './pages/About';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import background from './assets/images/background.png';

import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';

const App: React.FC = () => {
	return (
		<div
			className="grid grid-rows-layout place-items-center min-h-dvh min-w-dvw bg-repeat bg-center bg-opacity-50"
			style={{ backgroundImage: `url(${background})` }}
		>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
			</Routes>
			<Footer />
		</div>
	);
};

export default App;
