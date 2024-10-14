/** @format */

import React from 'react';
import { TooltipRenderProps } from 'react-joyride';
import Icon from './Icon';

const Tooltip: React.FC<TooltipRenderProps> = ({
	backProps,
	continuous,
	index,
	isLastStep,
	primaryProps,
	skipProps,
	step,
	tooltipProps,
	size,
	closeProps
}: TooltipRenderProps) => {
	return (
		<div {...tooltipProps} className={'bg-neutral-50 rounded-xl flex flex-col gap-4 max-w-[calc(24rem-2rem)] p-4'}>
			<div className={`flex items-center justify-between`}>
				<span className={'heading heading-teal'}>{step.title}</span>
				<span className={'heading heading-teal'}>
					{index + 1}/{size}
				</span>
			</div>
			<p className={'paragraph'}>{step.content}</p>
			<div className={`flex items-center ${!isLastStep ? 'justify-between' : 'justify-end'}`}>
				{!isLastStep && (
					<button
						{...skipProps}
						className={'btn btn-dark btn-icon size-12'}
						type={'button'}
						aria-label={'Skip'}
						title={'Skip'}
					>
						<Icon name={'x'} width={40} height={40}></Icon>
					</button>
				)}
				<div className={'flex items-center gap-4'}>
					{index > 0 && (
						<button
							{...backProps}
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Back'}
							title={'Back'}
						>
							<Icon name={'arrow-left-short'} width={40} height={40}></Icon>
						</button>
					)}
					{!isLastStep && continuous ? (
						<button
							{...primaryProps}
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Next'}
							title={'Next'}
						>
							<Icon name={'arrow-right-short'} width={40} height={40}></Icon>
						</button>
					) : (
						<button
							{...closeProps}
							className={'btn btn-dark btn-icon size-12'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
						>
							<Icon name={'x'} width={40} height={40}></Icon>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tooltip;
