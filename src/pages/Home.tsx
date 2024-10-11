/** @format */

import React from 'react';
import { Link } from 'react-router-dom';
import girl from '../assets/images/girl.png';

const Home: React.FC = () => {
	const highlights: string[] = [
		`<strong>Active recall</strong>: Test yourself to strengthen memory.`,
		`<strong>Optimal timing</strong>: Review at the right time to prevent forgetting.`,
		`<strong>Adaptability</strong>: Adjust review schedule based on your learning.`
	];

	return (
		<section className="overflow-hidden p-4">
			<div className="flex flex-col-reverse md:flex-row items-center justify-between">
				<div className="flex flex-1 flex-col gap-4">
					<div className="flex flex-col md:flex-row items-center mt-4 md:mt-0">
						<span className="text-2xl font-bold bg-teal-200 text-sky-950 rounded-full md:rounded-l-full md:rounded-r-none whitespace-nowrap py-2 px-4 md:pl-6 md:pr-2">
							Unlock Your Potential
						</span>
						<h2 className="text-lg md:text-2xl font-bold bg-red-400 text-neutral-50 rounded-b-3xl md:rounded-r-full whitespace-nowrap px-4 py-2 md:pr-6 md:pl-2">
							Never Forget Again
						</h2>
					</div>
					<p className="text-lg text-sky-950 p-4">
						Tired of forgetting important information? Discover the power of
						<a
							className="inline underline px-1"
							href="https://en.wikipedia.org/wiki/Spaced_repetition"
							target="_blank"
							rel="noopener noreferrer"
						>
							spaced&nbsp;repetition
						</a>
						and learn how to remember anything, fast and easy.
					</p>
					<ul className="flex flex-col gap-4 px-4">
						{highlights.map((highlight: string, index: number) => (
							<li className="flex items-center justify-start gap-4" key={index}>
								<span className="text-lg font-bold flex items-center justify-center bg-sky-950 text-neutral-50 rounded-full aspect-square w-8 h-8">
									{index + 1}
								</span>
								<span className="text-base text-sky-950" dangerouslySetInnerHTML={{ __html: highlight }}></span>
							</li>
						))}
					</ul>
					<div className="flex flex-col gap-4 self-center text-center md:self-start md:text-left p-4">
						<span className="text-2xl font-bold text-sky-950">Want to know more?</span>
						<div className="flex items-center gap-4">
							<Link className="me-btn me-btn-dark px-4" to="/decks" aria-label="Decks">
								Browse
							</Link>
						</div>
					</div>
				</div>
				<div className="block">
					<img src={girl} alt="Memorease" className="w-96 h-96 object-cover animate-fly" />
				</div>
			</div>
		</section>
	);
};

export default Home;
