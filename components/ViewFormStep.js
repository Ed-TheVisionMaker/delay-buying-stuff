import SmileyRating from './SmileyRating';
import { useFormContext } from 'react-hook-form';

import React, { useEffect } from 'react';

const StepProgressBar = ({ totalSteps }) => {
	const { getValues } = useFormContext();
	const currentStep = getValues('step');
	const progressBarWidth = Math.floor((currentStep / totalSteps) * 100);
	return (
		<div className='w-full h-2 flex justify-start border border-black rounded-xl'>
			<div
				className={`rounded-xl bg-primary`}
				style={{ width: progressBarWidth + '%' }}
			></div>
		</div>
	);
};

const StepButton = ({ stepFunction }) => {
	const svgConfig = {
		moveRight: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={12}
				height={12}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className=''
			>
				<path d='M18 8l4 4-4 4M2 12h20' />
			</svg>
		),
		moveLeft: (
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width={12}
				height={12}
				viewBox='0 0 24 24'
				fill='none'
				stroke='currentColor'
				strokeWidth={2}
				strokeLinecap='round'
				strokeLinejoin='round'
				className=''
			>
				<path d='M6 8l-4 4 4 4M2 12h20' />
			</svg>
		)
	};
	const nextStep = stepFunction.name === 'nextStep';

	return (
		<div className='flex'>
			<button
				type='submit'
				className={` bottom-0 ${nextStep ? 'right-0' : 'left-0'}`}
				onClick={() => stepFunction()}
			>
				{nextStep ? (
					<p className='flex items-center text-xs'>
						Next<span className='ml'>{svgConfig.moveRight}</span>
					</p>
				) : (
					<p className='flex items-center text-xs'>
						{svgConfig.moveLeft}
						<span className='ml'>Back</span>
					</p>
				)}
			</button>
		</div>
	);
};

const SubmitButton = ({ nextStep, smileyRatingUsed }) => {
	return (
		<div className='w-full'>
			<button
				type='submit'
				className='w-full btn btn-primary mb-6'
				onClick={() => nextStep()}
			>
				{smileyRatingUsed ? 'Continue' : 'Submit'}
			</button>
		</div>
	);
};

const ViewFormStep = () => {
	const {
		getValues,
		setValue,
		register,
		formState: { errors, isSubmitting }
	} = useFormContext();

	const currentStep = getValues('step');

	const nextStep = () => {
		if (currentStep < stepsConfig.length) {
			setValue('step', currentStep + 1);
		}
	};

	const prevStep = () => {
		if (currentStep > 1) {
			setValue('step', currentStep - 1);
		}
	};

	useEffect(() => {
		const step = getValues('step');
	}, []);

	const stepsConfig = [
		{
			questionElement: (
				<div className='w-full flex flex-col items-center justify-center'>
					<p className='mb-6 text-4xl'>What do you want to buy&#63;</p>
					<input
						{...register('item')}
						type='text'
						placeholder='Type your answer here...'
						className='w-full mb-6 px-4 py-2 rounded border-2'
					/>
					{/* maybe make a ternary here see Fred linked in */}
					{errors.item && <p className='text-red-500'>{errors.item.message}</p>}
				</div>
			),
			stateProperty: 'item',
			smileyRatingUsed: false
		},

		{
			questionElement: (
				<p className='mb-6 text-4xl'>How is your life without this item&#63;</p>
			),
			stateProperty: 'withoutItem',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					In{' '}
					<span className='bg-neutral text-neutral-content'>6 months time</span>{' '}
					how will this item change your life&#63;
				</p>
			),
			stateProperty: 'lifeChange',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					How will it really change your life&#63;
				</p>
			),
			stateProperty: 'reallyChangeLife',
			smileyRatingUsed: true
		},
		{
			questionElement: (
				<div className='w-full flex flex-col'>
					<h3 className='mb-6 text-4xl'>
						What is the last thing you regretted buying&#63;
					</h3>
					<input
						{...register('regretBuying')}
						type='text'
						placeholder='Type your last regret here...'
						className='w-full px-4 py-2 rounded border-2'
					/>
				</div>
			),
			stateProperty: 'regretBuying',
			smileyRatingUsed: false
		},
		{
			questionElement: (
				<p className='mb-6 text-4xl'>
					If you <span className='bg-neutral text-neutral-content'>never</span>{' '}
					owned this item, what would happen to your life&#63;
				</p>
			),
			stateProperty: 'neverOwned',
			smileyRatingUsed: true
		}
	];

	const totalSteps = stepsConfig.length;

	// const buttonAlignment = (currentStep) => {
	// 	if (currentStep === 1) {
	// 		return 'justify-end';
	// 	} else if (currentStep === totalSteps) {
	// 		return 'justify-start';
	// 	} else {
	// 		return 'justify-between';
	// 	}
	// };

	return (
		<>
			{
				<div className='h-full w-3/5 bg-skyBlue/45 px-8 pt-12 shadow-md shadow-skyBlue/50 rounded-xl text-center'>
					<div
						key={stepsConfig[currentStep - 1].stateProperty}
						className='h-full w-full flex flex-col justify-between text-xl'
					>
						{stepsConfig[currentStep - 1].questionElement}
						{stepsConfig[currentStep - 1].smileyRatingUsed === true ? (
							<SmileyRating
								nextStep={nextStep}
								name={stepsConfig[currentStep - 1].stateProperty}
							/>
						) : null}
						<SubmitButton
							nextStep={nextStep}
							smileyRatingUsed={stepsConfig[currentStep - 1].smileyRatingUsed}
						/>
						<div className='w-full'>
							<StepProgressBar totalSteps={totalSteps} />
							<div className={`w-full flex justify-start mb-4`}>
								{currentStep > 1 ? (
									<StepButton stepFunction={prevStep} />
								) : null}
								{/* {currentStep < stepsConfig.length ? (
									<StepButton stepFunction={nextStep} />
								) : null} */}
							</div>
						</div>
						{/* <pre>{JSON.stringify(getValues(), null, 2)}</pre> */}
					</div>
				</div>
			}
		</>
	);
};

export default ViewFormStep;
