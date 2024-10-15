/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../components/Icon';

const NotFound: React.FC = () => {
	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col gap-4'}>
				<header className={'flex flex-col md:flex-row md:items-center gap-4'}>
					<div className={'flex items-center gap-4'}>
						<Link className={'btn btn-dark btn-icon size-12'} to={'/'} aria-label={'Home'} title={'Home'}>
							<Icon name={'arrow-left-short'} width={40} height={40}></Icon>
						</Link>
						<span className={'heading heading-red'}>Not Found</span>
					</div>
				</header>
				<div className={'flex items-center justify-center'}>
					<Link to={'/'} aria-label={'Home'} title={'Home'}>
						<img
							src={'/assets/images/cat.png'}
							alt={'Cat'}
							className={'w-96 h-96 object-cover dark:opacity-80'}
							width={384}
							height={384}
						/>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default NotFound;
