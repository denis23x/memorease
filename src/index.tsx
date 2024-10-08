/** @format */

import React from 'react';
import ReactDOM, { Root } from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import './styles/styles.css';

const root: Root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
	<React.StrictMode>
		<HelmetProvider>
			<Router>
				<App />
			</Router>
		</HelmetProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
