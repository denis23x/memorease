/** @format */

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Footer: React.FC = () => {
	const [year, setYear] = useState<number>(2024);

	useEffect(() => {
		setYear(dayjs().year());
	}, []);

	return (
		<footer className={'p-4'}>
			<span className={'text-sky-950/50'}>© {year} MemorEase</span>
		</footer>
	);
};

export default Footer;
