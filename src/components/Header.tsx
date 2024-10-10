/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import github from '../assets/logos/github.png';
import kofi from '../assets/logos/ko-fi.png';
import memorease from '../assets/logos/memorease.png';

const Header: React.FC = () => {
	return (
		<header className="grid grid-cols-2 w-full p-4">
			<nav className="col-span-1 flex justify-start">
				<Link className="flex items-center justify-start gap-4" to="/" aria-label="MemorEase">
					<img src={memorease} alt="memorease" className="w-10 h-10" />
					<h3 className="text-2xl font-bold text-sky-950">MemorEase</h3>
				</Link>
			</nav>
			<nav className="col-span-1 flex justify-end">
				<ul className="flex items-center justify-end gap-4">
					<li className="block">
						<Link to="/" aria-label="Ko-fi">
							<img src={kofi} alt="Ko-fi" className="w-10 h-10" />
						</Link>
					</li>
					<li className="block">
						<Link to="/" aria-label="Github">
							<img src={github} alt="Github" className="w-10 h-10" />
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
