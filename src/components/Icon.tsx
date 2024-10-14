/** @format */

import React from 'react';

interface IconProps {
	name: string;
	width: number;
	height: number;
}

const Icon: React.FC<IconProps> = ({ name, width, height }: IconProps) => {
	return (
		<svg className={'fill-current'} width={width} height={height} viewBox={'0 0 16 16'}>
			<use href={`#${name}`} />
		</svg>
	);
};

export default Icon;
