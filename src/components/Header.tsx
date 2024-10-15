/** @format */

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from './Icon';

const Header: React.FC = () => {
	const [darkMode, setDarkMode] = useState<boolean>(!localStorage.getItem('dark'));

	useEffect(() => {
		if (darkMode) {
			document.documentElement.classList.remove('dark');
			localStorage.removeItem('dark');
		} else {
			document.documentElement.classList.add('dark');
			localStorage.setItem('dark', '1');
		}
	}, [darkMode]);

	return (
		<header className={'flex items-center justify-between w-full p-4'}>
			<nav className={'col-span-1 flex items-center justify-start gap-4'}>
				<Link className={'btn btn-teal btn-icon size-12'} to={'/decks'} aria-label={'Decks'} title={'Decks'}>
					<Icon name={'stack'} width={24} height={24}></Icon>
				</Link>
				<span className={'text-2xl font-bold text-sky-950 hidden md:block'}>Memorease</span>
			</nav>
			<nav className={'col-span-1 flex justify-end'}>
				<ul className={'flex items-center justify-end gap-4'}>
					<li className={'block'}>
						{darkMode ? (
							<button
								className={'btn btn-dark btn-icon size-12'}
								type={'button'}
								aria-label={'Light Mode'}
								title={'Light Mode'}
								onClick={() => setDarkMode(false)}
							>
								<Icon name={'brightness-high-fill'} width={24} height={24}></Icon>
							</button>
						) : (
							<button
								className={'btn btn-dark btn-icon size-12'}
								type={'button'}
								aria-label={'Dark Mode'}
								title={'Dark Mode'}
								onClick={() => setDarkMode(true)}
							>
								<Icon name={'moon-fill'} width={24} height={24}></Icon>
							</button>
						)}
					</li>
					<li className={'block'}>
						<a
							href={'https://ko-fi.com/denis23x'}
							target={'_blank'}
							rel={'nofollow noreferrer'}
							aria-label={'Ko-fi'}
							title={'Ko-fi'}
						>
							<img src={'/assets/logos/ko-fi.png'} alt={'Ko-fi'} className={'size-12'} width={48} height={48} />
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
							<img src={'/assets/logos/github.png'} alt={'Github'} className={'size-12'} width={48} height={48} />
						</a>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
