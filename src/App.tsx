/** @format */

import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import About from './pages/About';
import Cards from './pages/Cards';
import Decks from './pages/Decks';
import NotFound from './pages/NotFound';
import Score from './pages/Score';
import Study from './pages/Study';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import { Bounce, ToastContainer } from 'react-toastify';
import '@fontsource/nunito/400.css';
import '@fontsource/nunito/700.css';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [pathname]);

	return (
		<div className={'bg-no-repeat bg-cover bg-pattern-12-9-neutral dark:bg-pattern-12-9-slate'}>
			<div className={'grid grid-rows-layout min-h-dvh min-w-dvw overflow-hidden'}>
				<Header />
				<div className={'w-full max-w-screen-lg mx-auto'}>
					<Routes>
						<Route path={'/'} element={<Home />} />
						<Route path={'/decks'} element={<Decks />} />
						<Route path={'/decks/:deckUid'} element={<Cards />} />
						<Route path={'/study/:deckUid'} element={<Study />} />
						<Route path={'/score'} element={<Score />} />
						<Route path={'/about'} element={<About />} />
						<Route path={'*'} element={<NotFound />} />
					</Routes>
				</div>

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
