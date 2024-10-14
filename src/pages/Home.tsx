/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import girl from '../assets/images/girl.png';

const Home: React.FC = () => {
	const highlights: string[] = [
		`<strong>Active recall</strong>: Test yourself to strengthen memory.`,
		`<strong>Optimal timing</strong>: Review at the right time to prevent forgetting.`,
		`<strong>Amplified by Gemini</strong>: AI can automate creating a new questions, and reduce errors.`
	];

	return (
		<section className={'overflow-hidden p-4'}>
			<div className={'flex flex-col-reverse md:flex-row items-center justify-between'}>
				<div className={'flex flex-1 flex-col gap-4'}>
					<div className={'flex flex-col md:flex-row items-center mt-4 md:mt-0'}>
						<span
							className={`heading heading-teal !rounded-3xl md:!rounded-l-full md:!rounded-r-none py-2 px-4 md:pl-4 md:pr-2`}
						>
							Unlock Your Potential
						</span>
						<span
							className={`heading heading-red !rounded-3xl md:!rounded-r-full md:!rounded-l-none !rounded-t-none text-xl md:text-2xl px-4 py-2 md:pr-4 md:pl-2`}
						>
							Never Forget Again
						</span>
					</div>
					{/* prettier-ignore */}
					<p className={'paragraph p-4'}>
						Tired of forgetting important information? Discover the power of <a className={'inline underline'} href={'https://en.wikipedia.org/wiki/Spaced_repetition'} target={'_blank'} rel={'noopener noreferrer'}>spaced&nbsp;repetition</a> and learn how to remember anything, fast and easy.
					</p>
					<ul className={'flex flex-col gap-4 px-4'}>
						{highlights.map((highlight: string, index: number) => (
							<li className={'flex items-start gap-4'} key={index}>
								<span className={`btn btn-dark btn-icon text-lg aspect-square w-8 h-8`}>{index + 1}</span>
								<span className={'paragraph mt-1'} dangerouslySetInnerHTML={{ __html: highlight }}></span>
							</li>
						))}
					</ul>
					<div className={'flex flex-col gap-4 self-start md:text-left p-4'}>
						<span className={'heading px-0'}>Want to know more?</span>
						<div className={'flex items-center gap-4'}>
							<Link className={'btn btn-dark px-4'} to={'/decks'} aria-label={'Decks'} title={'Decks'}>
								Browse
							</Link>
							<Link className={'btn btn-teal px-4'} to={'/about'} aria-label={'About'} title={'About'}>
								How to Use
							</Link>
						</div>
					</div>
				</div>
				<div className={'block'}>
					<img src={girl} alt={'Memorease'} className={'w-96 h-96 object-cover animate-fly'} width={384} height={384} />
				</div>
			</div>
		</section>
	);
};

export default Home;
