/** @format */

import React from 'react';

const Back: React.FC = () => {
	const handleBack = () => {
		window.history.back();
	};

	return (
		<button className={'me-btn me-btn-dark'} type={'button'} onClick={handleBack}>
			<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
				<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
			</svg>
		</button>
	);
};

export default Back;
