/** @format */

import React from 'react';
import { TooltipRenderProps } from 'react-joyride';

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
		<div
			{...tooltipProps}
			className={'bg-neutral-50 rounded-xl flex flex-col items-start justify-center gap-4 max-w-[calc(24rem-2rem)] p-4'}
		>
			<div className={`flex items-center justify-between w-full`}>
				{step.title && (
					<span
						className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap truncate py-2 px-4`}
					>
						{step.title}
					</span>
				)}
				<span className={`text-2xl font-bold bg-teal-200 text-sky-950 rounded-full whitespace-nowrap py-2 px-4`}>
					{index + 1}/{size}
				</span>
			</div>
			{step.content && <p className={'text-lg text-sky-950'}>{step.content}</p>}
			<div className={`flex items-center ${!isLastStep ? 'justify-between' : 'justify-end'} w-full`}>
				{!isLastStep && (
					<button
						{...skipProps}
						className={'me-btn me-btn-dark p-1'}
						type={'button'}
						aria-label={'Skip'}
						title={'Skip'}
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
							<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
						</svg>
					</button>
				)}
				<div className={'flex items-center justify-end gap-4'}>
					{index > 0 && (
						<button
							{...backProps}
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Back'}
							title={'Back'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5" />
							</svg>
						</button>
					)}
					{!isLastStep && continuous ? (
						<button
							{...primaryProps}
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Next'}
							title={'Next'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
							</svg>
						</button>
					) : (
						<button
							{...closeProps}
							className={'me-btn me-btn-dark p-1'}
							type={'button'}
							aria-label={'Close'}
							title={'Close'}
						>
							<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
								<path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
							</svg>
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Tooltip;
