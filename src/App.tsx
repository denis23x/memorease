/** @format */

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Cards from './pages/Cards';
import Decks from './pages/Decks';
import NotFound from './pages/NotFound';
import Study from './pages/Study';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import bg from './assets/images/bg.png';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { Bounce, ToastContainer } from 'react-toastify';

const App: React.FC = () => {
	return (
		<div className={'block'}>
			<div
				className={'grid grid-rows-layout min-h-dvh min-w-dvw bg-repeat bg-center bg-opacity-50 overflow-hidden'}
				style={{ backgroundImage: `url(${bg})` }}
			>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/decks" element={<Decks />} />
					<Route path="/decks/:deckUid" element={<Cards />} />
					<Route path="/study/:deckUid" element={<Study />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
				<Footer />
			</div>
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
