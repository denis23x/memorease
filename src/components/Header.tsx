/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import github from '../assets/logos/github.png';
import kofi from '../assets/logos/ko-fi.png';
import Icon from './Icon';

const Header: React.FC = () => {
	return (
		<header className={'flex items-center justify-between w-full p-4'}>
			<nav className={'col-span-1 flex items-center justify-start gap-4'}>
				<Link className={'btn btn-teal btn-icon size-12'} to={'/decks'} aria-label={'Decks'} title={'Decks'}>
					<Icon name={'stack'} width={24} height={24}></Icon>
				</Link>
				<span className={'text-2xl font-bold text-sky-950 hidden md:block'}>Memorease</span>
				<span className={'text-2xl font-bold text-sky-950 block md:hidden'}>ME</span>
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
							<img src={kofi} alt={'Ko-fi'} className={'size-12'} width={48} height={48} />
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
							<img src={github} alt={'Github'} className={'size-12'} width={48} height={48} />
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
