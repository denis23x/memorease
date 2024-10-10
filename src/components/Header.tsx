/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import github from '../assets/logos/github.png';
import kofi from '../assets/logos/ko-fi.png';
import memorease from '../assets/logos/memorease.png';

const Header: React.FC = () => {
	return (
		<header className={'grid grid-cols-2 w-full p-4'}>
			<nav className={'col-span-1 flex justify-start'}>
				<Link className={'flex items-center justify-start gap-4'} to={'/'} aria-label={'Memorease'} title={'MemorEase'}>
					<img src={memorease} alt={'memorease'} className={'size-12'} />
					<span className={'text-2xl font-bold text-sky-950'}>Memorease</span>
				</Link>
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
