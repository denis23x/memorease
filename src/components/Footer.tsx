/** @format */

import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

const Footer: React.FC = () => {
	const [year, setYear] = useState<number>(2024);

	useEffect(() => {
		setYear(dayjs().year());
	}, []);

	return (
		<footer className={'text-center p-4'}>
			<span className={'paragraph opacity-50'}>© {year} Memorease</span>
		</footer>
	);
};

export default Footer;
