/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import github from '../assets/logos/github.png';
import kofi from '../assets/logos/ko-fi.png';
import memorease from '../assets/logos/memorease.png';

const Header: React.FC = () => {
	return (
		<header className={'flex items-center justify-between w-full p-4'}>
			<nav className={'col-span-1 flex items-center justify-start gap-4'}>
				<Link
					className={'flex items-center justify-center bg-teal-200 text-sky-950 rounded-full size-12'}
					to={'/decks'}
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
						<path d="m14.12 10.163 1.715.858c.22.11.22.424 0 .534L8.267 15.34a.6.6 0 0 1-.534 0L.165 11.555a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0l5.317-2.66zM7.733.063a.6.6 0 0 1 .534 0l7.568 3.784a.3.3 0 0 1 0 .535L8.267 8.165a.6.6 0 0 1-.534 0L.165 4.382a.299.299 0 0 1 0-.535z" />
						<path d="m14.12 6.576 1.715.858c.22.11.22.424 0 .534l-7.568 3.784a.6.6 0 0 1-.534 0L.165 7.968a.299.299 0 0 1 0-.534l1.716-.858 5.317 2.659c.505.252 1.1.252 1.604 0z" />
					</svg>
				</Link>
				<span className={'text-2xl font-bold text-sky-950 hidden sm:block'}>Memorease</span>
				<span className={'text-2xl font-bold text-sky-950 block sm:hidden'}>ME</span>
			</nav>
			<nav className={'col-span-1 flex justify-end'}>
				<ul className={'flex items-center justify-end gap-4'}>
					<li className={'block'}>
						<a
							href={'https://ko-fi.com/denis23x'}
							target={'_blank'}
							rel={'nofollow noreferrer'}
							aria-label={'Ko-fi'}
							title={'Ko-fi'}
						>
							<img src={kofi} alt={'Ko-fi'} className={'size-12'} />
						</a>
					</li>
					<li className={'block'}>
						<a
							href={'https://github.com/denis23x/memorease/tree/main'}
							target={'_blank'}
							rel={'nofollow noreferrer'}
							aria-label={'Github'}
							title={'Github'}
						>
							<img src={github} alt={'Github'} className={'size-12'} />
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
