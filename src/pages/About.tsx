import React from 'react';
import { Helmet } from 'react-helmet-async';

const About: React.FC = () => {
	return (
		<section className="p-4">
			<Helmet>
				<title>About - MemorEase</title>
				<meta name="title" content="About - MemorEase"/>
				<meta
					name="description"
					content="Tired of forgetting important information? Discover the power of spaced repetition and learn how to remember
						anything, fast and easy."
				/>
			</Helmet>
			<h1 className="text-3xl font-bold">About MemorEase</h1>
		</section>
	);
}

export default About;
