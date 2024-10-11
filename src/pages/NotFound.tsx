/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import cat from '../assets/images/cat.png';

const NotFound: React.FC = () => {
	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col items-start justify-start gap-4 md:gap-8'}>
				<header className={'flex flex-col md:flex-row items-start md:items-center justify-start gap-4 w-full'}>
					<div className={'flex items-center justify-start gap-4 max-w-full'}>
						<Link className={'me-btn me-btn-dark p-1'} to={'/decks'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</Link>
						<span
							className={`text-2xl font-bold bg-red-400 text-neutral-50 rounded-full whitespace-nowrap truncate py-2 px-4`}
						>
							Not Found
						</span>
					</div>
				</header>
				<div className={'flex items-center justify-center w-full'}>
					<Link to={'/'}>
						<img src={cat} alt="Cat" className="w-96 h-96 object-cover" />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
