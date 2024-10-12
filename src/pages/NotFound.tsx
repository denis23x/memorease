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
						<Link className={'me-btn me-btn-dark p-3'} to={'/'} aria-label={'Home'} title={'Home'}>
							<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
								<path d="M6.5 14.5v-3.505c0-.245.25-.495.5-.495h2c.25 0 .5.25.5.5v3.5a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4a.5.5 0 0 0 .5-.5" />
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
					<Link to={'/'} aria-label={'Home'} title={'Home'}>
						<img src={cat} alt={'Cat'} className={'w-96 h-96 object-cover'} width={384} height={384} />
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
